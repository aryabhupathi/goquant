"use client";
import React from "react";
import { Button, Typography, AppBar, Container, Box } from "@mui/material";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
const Header = () => {
  const isMobile = useMediaQuery("(min-width:600px)");
  return (
    <AppBar sx={{backgroundColor:'black'}}>
      <Container sx={{display:'flex', justifyContent:'space-around', alignItems:'center', p:2}}>
        <Box>{isMobile && <Typography sx={{color:'gold'}}>TRACKSTOCK</Typography>}</Box>
        <Box>
          <Button color="inherit" component={Link} href="/">
            <Typography sx={{color:'gold'}}>HOME</Typography>
          </Button>
          <Button color="inherit" component={Link} href="/about">
            <Typography sx={{color:'gold'}}>ABOUT</Typography>
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            <Typography sx={{color:'gold'}}>CONTACT</Typography>
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
export default Header;
