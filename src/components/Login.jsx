import { FormControl, InputLabel, Input, FormHelperText, Box, IconButton, Typography, Alert } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useAuth } from '../context/AuthContext';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        }
        catch {
            setError("Failed to create an account.")
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
                Login
            </Typography>

            {error && <Alert my={5} severity="error">{error}</Alert>}
            <FormControl onSubmit={handleSubmit} sx={{ marginTop: "30px" }}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="email" variant="standard" inputRef={emailRef} />
                <FormHelperText id="email">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" aria-describedby="password" variant="standard" inputRef={passwordRef} />
            </FormControl>
            <Box mx="auto" mt={5}>
                <IconButton type='submit' aria-label="fingerprint" color="primary" sx={{ width: "60px", height: "60px" }} onClick={handleSubmit}>
                    <Fingerprint sx={{ width: "50px", height: "50px" }} />
                </IconButton>
            </Box>
            <Box mt={5}>
                Need an account? <Link to='/signup'>Sign up.</Link>
            </Box>
        </Box>
    )
}
