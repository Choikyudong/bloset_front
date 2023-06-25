import { 
  Box
  , Typography
  , Button
  , Stack
  , TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import {
 SignIn as login
} from "../../service/account/accountService";

const SignIn = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <Stack
            spacing={1}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">
              Login
            </Typography>
          </Stack>
          <Box component={"form"} onSubmit={login} noValidate>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                id="email"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                id="password"
              />
            </Stack>
            <Typography
              color="text.secondary"
              variant="body1"
            >
              Don&apos;t have an account?
              <Link to={'/account/signup'}>
                SignUp
              </Link>
            </Typography>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
  
export default SignIn;
