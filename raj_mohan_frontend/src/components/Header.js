import Logo from "../svg/SpaceX-Logo.wine.svg";
/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Box, Button, Container } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ background: "#b5ebda" }}>
      <Container
        sx={{ display: "flex", justifyContent: "space-evenly" }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block", lg: "block" },

            boxshadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            style={{ height: "70px", width: "300px", gridArea: "logo" }}
            src={Logo}
            alt="logo"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingTop: "30px",
          }}
        >
          <Button sx={{ color: "black" }}>RIDESHARE</Button>
          <Button sx={{ color: "black" }}>ROCKETS</Button>
          <Button sx={{ color: "black" }}>CAPSULES</Button>
        </Box>
      </Container>
    </Box>
  );
}
