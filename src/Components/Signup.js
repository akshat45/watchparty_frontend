import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Input from './Input';
import { signup } from '../Api/index'

import useStyles from './styles';

const initialState = { name: '', username: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const history = useHistory();
    const [alert, setAlert] = useState(null);
    const [showPassword, setshowPassword] = useState(false);
    const [formData, setformData] = useState(initialState);
    const [processing, setprocessing] = useState(false);

    const handleShowPassword = () => setshowPassword((e) => !e);

    const handleSubmit = (e) => {
        e.preventDefault();
        setprocessing(true);
        signup(formData)
            .then((data) => {
                if(data.err){
                    setAlert(data.err.message);
                    setformData(initialState);
                    setprocessing(false);
                }
             
                else
                {
                    console.log(data.message);
                    history.push('/',
                    {
                        pathname: '/',
                        state:{message: data.message}
                    }
                    )
                }
                })
            .catch((error) => console.log(error));
    };

    const [namelen, setnamelen] = useState(false);
    const [emaillen, setemaillen] = useState(false);
    const [userlen, setuserlen] = useState(false);
    const [passlen, setpasslen] = useState(false);
    const [confpasslen, setconfpasslen] = useState(false);


    const handleChange = (e) => {
        if(e.target.name==='username'|| e.target.name==='password')
        {
            if(e.target.value.length > 2 && e.target.value.length < 11){
            e.target.name==='username' ? setuserlen(false) : setpasslen(false);
            setformData({ ...formData, [e.target.name]: e.target.value });
            }
            else{
                e.target.name==='password' ? setpasslen(true) : setuserlen(true);
            }
        }
        else{
            setformData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
        {alert && <Alert variant="filled" severity='error'  onClose={() => setAlert(null)} > { alert } </Alert>}
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>Sign Up</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Input name='name' label='Name' type='text' handleChange={handleChange} autoFocus required />
                        <Input name='email' label='Email Address' type='email' handleChange={handleChange} required />
                        <Input name='username' label='UserName' type='text' handleChange={handleChange} required error={userlen}/>
                        <Input name='password' label='Password' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange} required error={passlen}/>
                        <Input name='confirmpassword' label='Confirm Password' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange} required />
                    </Grid>
                    <Box marginTop={3}>
                        <LoadingButton type='submit' color='primary' className={classes.submit} loading={processing} variant="contained" fullWidth disabled={userlen || passlen}>
                            Sign Up
                        </LoadingButton>
                    </Box>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button color='secondary'>
                                <Link to='/login'>
                                    Already have an account? Login
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </>
    )
};

export default Auth;