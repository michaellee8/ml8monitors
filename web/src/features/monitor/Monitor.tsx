import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { auth, db, messaging, vapidKey } from "../../firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";

export function Monitor() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [openRegSuccessSnackabar, setOpenRegSuccessSnackabar] = useState(false);
  const handleAuthButtonClick = async () => {
    if (user) {
      await signOut(auth);
    } else {
      await signInWithGoogle();
    }
  };
  const handleSubscribeNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return;
    }
    const token = await getToken(messaging, { vapidKey: vapidKey });
    await setDoc(doc(db, "users", user!.user.uid, "devices", token), {});
    setOpenRegSuccessSnackabar(true);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ml8monitors
          </Typography>
          <Button color="inherit" onClick={handleAuthButtonClick}>
            {user ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <List>
          <ListItem>
            <ListItemText
              primary="Auth status"
              secondary={user ? user.user.email : "Not logged in"}
            />
          </ListItem>
          {error ? (
            <ListItem>
              <ListItemText primary="Auth error" secondary={error.message} />
            </ListItem>
          ) : null}
          {user ? (
            <>
              <ListItemButton onClick={handleSubscribeNotification}>
                <ListItemText primary="Subscribe notification" />
              </ListItemButton>
            </>
          ) : null}
        </List>
      </Container>
      <Snackbar
        open={openRegSuccessSnackabar}
        autoHideDuration={6000}
        onClose={() => setOpenRegSuccessSnackabar(false)}
        message="Successfully registered"
      />
    </>
  );
}
