import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AutoGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div className="grid-elements">xs</div>
        </Grid>
        <Grid item xs={6}>
          <div className="grid-elements">xs=6</div>
        </Grid>
        <Grid item xs>
          <div className="grid-elements">xs</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AutoGrid;