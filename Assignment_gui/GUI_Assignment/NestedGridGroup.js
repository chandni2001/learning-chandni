import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function NestedGrid() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <div className="grid-elements">Grid Element</div>
      </Grid>
      <Grid item xs={4}>
        <div className="grid-elements">Grid Element</div>
      </Grid>
      <Grid item xs={4}>
        <div className="grid-elements">Grid Element</div>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGridGroup() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <NestedGrid />
        </Grid>
        <Grid container item spacing={3}>
          <NestedGrid />
        </Grid>
        <Grid container item spacing={3}>
          <NestedGrid />
        </Grid>
      </Grid>
    </Box>
  );
}