import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TextField from
'@mui/material/TextField';

export default function Form({title}) {
return (
    <>
<div className="heading-container">

<h3>
{title} Form
</h3>
</div>
<Box
component="form"
sx={{
'& > :not(style)': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<TextField id="email" label="Enter the Email"

variant="outlined" />

<TextField id="password" label="Enter the Password"

variant="outlined" />
</Box>
<Button variant="contained">{title} in</Button>
</>
);
}