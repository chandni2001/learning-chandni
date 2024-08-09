import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../App.css";

const BasicGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Setting up the Fluid Grid system */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="grid-elements">xs=6</div>
        </Grid>
        <Grid item xs={6}>
          <div className="grid-elements">xs=6</div>
        </Grid>
        <Grid item xs={8}>
          <div className="grid-elements">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="grid-elements">xs=8</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicGrid;