import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
const Gridlay=()=>{
    return (
        <>
        <Grid container spacing={3}>
<Grid item xs={12} sm={6}>
<Paper>Left Side</Paper>
</Grid>
<Grid item xs={12} sm={6}>
<Paper>Right Side</Paper>
</Grid>
</Grid>
        </>
    )
}
export default Gridlay;