import { FormControl, InputLabel, Input, FormHelperText, Box, Typography, Alert, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const emailRef = useRef();
    const [message, setMessage] = useState("");
    //const passwordRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            console.log(emailRef.current.value);
            await resetPassword(emailRef.current.value);
            setMessage("Instructions were sent to your inbox.")
            navigate('/');
        }
        catch (error) {
            console.log(error)
            setError("Failed to reset password.")
        }

        setLoading(false);
    }


    return (
        <Box
            mx="auto"
            width={400}
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "100px",
                borderRadius: "10px",
                color: "#0275d8"
            }}
            border={3}
            py={10}
            px={5}
            textAlign="center"
        >
            <Typography variant="h2" component="h2">
                Reset Password.
            </Typography>
            {message && <Alert my={5} severity="primary">{message}</Alert>}
            {error && <Alert my={5} severity="error">{error}</Alert>}
            <FormControl onSubmit={handleSubmit} sx={{ marginTop: "30px" }}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="email" variant="standard" inputRef={emailRef} />
                <FormHelperText id="email">We'll never share your email.</FormHelperText>
            </FormControl>
            <Box mx="auto" mt={5}>
                <Button type='submit' disabled={loading} onClick={handleSubmit} >Reset Password</Button>
            </Box>
            <Box mt={5}>
                <Link to={"/login"}>Login</Link>
            </Box>
            <Box mt={2}>
                Need an account? <Link to='/signup'>Sign up.</Link>
            </Box>
        </Box>
    )
}
