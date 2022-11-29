import React from "react";
import { Box } from "@mui/material";

export default function HomeBanner() {
  return (
    <Box sx={{ paddingBottom: "100px" }}>
      <img
        style={{ width: "100%" }}
        src="https://physicsworld.com/wp-content/uploads/2022/08/Atlas-V-rocket.jpg"
        alt="banner"
      />
    </Box>
  );
}
