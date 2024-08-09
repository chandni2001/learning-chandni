import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { Camera } from "@mui/icons-material";

const styles = {
  paper: {
    height: 100,
    width: 100,
    color: "#808080",
  },

  radio: {
    backgroundColor: "#808080",
    color: "#fff",
  },
};

const MUIspacing = () => {
  const [spacing, setSpacing] = useState(0);

  const changeSpacing = (e) => {
    setSpacing(Number(e.target.value));
  };
  return (
    <div>
      <div>
        <Grid container spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Camera style={styles.paper} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Paper>
          <div>
            {spacing}
            <RadioGroup
              name="spacing"
              aria-label="spacing"
              value={spacing.toString()}
              onChange={changeSpacing}
              row
              style={styles.radio}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default MUIspacing;