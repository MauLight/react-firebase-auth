import { FormControl, InputLabel, Input, FormHelperText, Box, IconButton, Typography, Alert } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useAuth } from '../context/AuthContext';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const { currentUser, updateEmail, updatePasword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== cpasswordRef.current.value) {
            return setError("Passwords do not match.")
        }

        const promises = [];
        setError("");
        setLoading(true);

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePasword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Failed to update.")
        }).finally(() => {
            setLoading(false)
        })
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
                Update Profile.
            </Typography>

            {error && <Alert my={5} severity="error">{error}</Alert>}
            <FormControl onSubmit={handleSubmit} sx={{ marginTop: "30px" }}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="email" variant="standard" inputRef={emailRef} required defaultValue={currentUser.email} />
                <FormHelperText id="email">Leave blank to keep original.</FormHelperText>
            </FormControl>
            <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type='password' id="password" aria-describedby="password" variant="standard" inputRef={passwordRef} />
                <FormHelperText id="email">Leave blank to keep original.</FormHelperText>
            </FormControl>
            <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel htmlFor="cpassword">Confirm password</InputLabel>
                <Input type='password' id="cpassword" aria-describedby="cpassword" variant="standard" inputRef={cpasswordRef} />
            </FormControl>
            <Box mx="auto" mt={5}>
                <IconButton disabled={loading} type='submit' aria-label="fingerprint" color="primary" sx={{ width: "60px", height: "60px" }} onClick={handleSubmit}>
                    <Fingerprint sx={{ width: "50px", height: "50px" }} />
                </IconButton>
            </Box>
            <Box mt={5}>
                <Link to='/'>Cancel.</Link>
            </Box>
        </Box>
    )
}
