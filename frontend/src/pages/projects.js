import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const UserPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={3} 
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start">
        <Grid item xs>
          <h2>Create a New Project</h2>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Enter Name" variant="outlined" />
            <TextField id="outlined-basic" label="Project ID" variant="outlined" />
            <TextField id="outlined-basic" label="Description" variant="outlined" />
          </Box>
          <Button variant="contained">Confirm</Button>
        </Grid>
        <Grid item xs={6}>
          <h2>Existing Projects</h2>
          
        </Grid>
        <Grid item xs>
          <h2>Join an Existing Project</h2>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Project ID" variant="outlined" />
            <Button variant="contained">Confirm</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    
  )
}

export default UserPage


//for existing projects may either use text area or text field to list all possibe ids or may scrap the idea entirely
//also may need separate entities for each pat of project page