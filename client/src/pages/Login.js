import React, { useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { signingIn,signInWithGoogle } from '../Redux/userSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 


const theme = createTheme();

const Login= () => {
    const Errors = useSelector(state=> state.userreducer.LoginErrors)
    const navigate = useNavigate()
    const isAuth = localStorage.getItem('isAuth')

    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const HandleChange = (e)=>{
      setUser({...user, [e.target.name] : e.target.value})
    }
    const LoginIn = (e)=>{
      e.preventDefault()
      dispatch(signingIn(user))
     navigate('/')
    }
  
  const signInGoogle = (e)=>{
    e.preventDefault()
    dispatch(signInWithGoogle())
   navigate('/')
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" style={{ marginTop: '0', marginLeft: '200px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#00b39b' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <br />
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={HandleChange}
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
           
             
                <Grid item xs={12}>
                  <TextField
                    onChange={HandleChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={LoginIn}
                style={{ backgroundColor: '#00b39b' }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#00b39b' }}
                onClick={signInGoogle}
              >
                signInWithGoogle
              </Button>
              <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;