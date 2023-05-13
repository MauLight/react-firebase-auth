import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            navigate("/login");
        }
        catch (error) {
            console.log(error);
            setError("Failed to log out.")
        }
    }

    return (
        <Box display="flex" justifyContent="center" mt={20}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://i.postimg.cc/SQ7KkBd9/11.jpg"
                        alt="red hand"
                    />
                    <CardContent>
                        {error && <Alert my={5} severity="error">{error}</Alert>}
                        <Typography gutterBottom variant="h5" component="div">
                            Email: {currentUser.email}
                        </Typography>
                        <Link to={"/update-profle"} >Update Profile</Link>
                    </CardContent>
                    <Button onClick={handleLogout}>Log Out</Button>
                </CardActionArea>
            </Card>
        </Box>
    )
}
