import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const ProjectViewDetails = () => {
    return (
      <div>

      <Grid container>

      <Grid item xs={12} md={4} align="center">

        <Paper elevation={3} sx={{width:6/7}} >
          <h2 align="center">Project Name: UT AWS #1101</h2>
        </Paper>
        <Paper elevation={3} sx={{width:6/7}} >
          <h2 align="center">Description</h2>
          <p style = {{ padding:10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Paper>
        <Button variant="contained" color="primary">
          Home
        </Button>
      </Grid>
        <Grid item xs={12} md={8} align="center">

          <Paper elevation={3} sx={{width:13/14}} >
            <h2 align="center">Current Hardware Sets</h2>
            <List aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary="Hardware Set 1" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Hardware Set 2" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Hardware Set 3" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Hardware Set 4" />
              </ListItem>
            </List>

          </Paper>
          <Paper elevation={3} sx={{width:13/14}} >
            <h2 align="center">List of Checked Out Sets</h2>
            <List aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary="Hardware Set 1" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Hardware Set 2" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Hardware Set 3" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Hardware Set 4" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      </div>





  );
}

export default ProjectViewDetails
