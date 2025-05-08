import React from "react";
import { Box, AppBar, Container, Toolbar, Typography, Button} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

    export default function Navbar() {
            
        const navigate = useNavigate();       
        
            return (
            <Box sx = {{ flexGrow: 1 }}>	
                <AppBar position="Static" color="Transparent">
                    <Container>
                        <Toolbar>
                            <Typography sx = {{ flexGrow: 1 }} variant="h6">
                                <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
                                Perm Stack
                                </Link>  
                            </Typography>

                            <Button variant='contained' color='primary' onClick={() => navigate("/taskform")}>
                                New Task
                            </Button>

                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        

    )
}
