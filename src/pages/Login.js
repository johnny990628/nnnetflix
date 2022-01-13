import React from "react";
import { signInWithGoogle } from "../firebase";
import { Box, Button } from "@mui/material";

const Login = () => {
  return (
    <Box>
      <Button variant="contained" onClick={signInWithGoogle}>
        Sign in with google
      </Button>
    </Box>
  );
};

export default Login;
