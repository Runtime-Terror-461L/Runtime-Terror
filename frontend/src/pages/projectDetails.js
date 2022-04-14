import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import MultipleSelectCheckmarks from "./checkout"
import {useLocation} from 'react-router-dom';




const ProjectViewDetails = () => {

			
    const [name, setName] = useState("");
		const [number, setNumber] = useState(0);
    const [hwset1, setHWSet1] = useState({'capacity':0, 'availability':0, 'checkedout_qty':0}); 
    const [hwset2, setHWSet2] = useState({'capacity':0, 'availability':0, 'checkedout_qty':0}); 

    const updateData = () => { // TODO: update route names based on backend
      fetch('route - api/get_hwset1')
          .then(response => response.json()) // assumes data is formatted like {"hwset1": data={"capacity": 100, "availability": 100, "checkedout_qty": 0}}
          .then(data => setHWSet1(data));
      fetch('route - api/get_hwset2')
          .then(response => response.json())
          .then(data => setHWSet2(data));
    }
    updateData();

    
    const numberChange = event => {
  		setNumber(event.target.value);
		};
    const nameChange = (name) => {
    	setName(name);
    }
    const checkOut = async () => {
  		console.log(number + " " + name)
      // TODO: checkout via POST (pass number and name)
      updateData();
		}
    const checkIn = async () => {
  		console.log(number + " " + name)
      // TODO: checkout via POST (pass number and name)
      updateData();
		}


  const location = useLocation();
  const ID = location.state.id;
  console.log("Hello This is input from other file");
  console.log(location.state.id);

    return (
      <div>
      <h1>{location.state.id}</h1>

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
        <Grid item xs={12} md={8} align="center"  style = {{ paddingBottom:10 }}>

          <Paper elevation={3} sx={{width:13/14}}>
            <h2 align="center">Current Hardware Sets</h2>
            <List aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary="Hardware Set 1" secondary={'Availability: ' + hwset1['availability'] + ', Capacity: ' + hwset1['capacity']} />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Hardware Set 2" secondary={'Availability: ' + hwset2['availability'] + ', Capacity: ' + hwset2['capacity']} />
              </ListItem>

            </List>

          </Paper>
          <Paper elevation={3} sx={{width:13/14}} >
            <h2 align="center">List of Checked Out Sets</h2>
            <List aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary="Hardware Set 1" secondary={'Checked out quantity: ' + hwset1['checkedout_qty']}/>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Hardware Set 2" secondary={'Checked out quantity: ' + hwset2['checkedout_qty']}/>
              </ListItem>

            </List>
          </Paper>
          <Paper elevation={3} sx={{width:13/14}} >
            <h2 align="center">Checkout/Return Hardware</h2>
            <MultipleSelectCheckmarks onChange={nameChange}/>
            <TextField
          id="outlined-number"
          label="Number"
          type="number"
          onChange={numberChange}
          InputLabelProps={{
            shrink: true,
          }} style = {{ marginTop:10, marginBottom:10}}
        /><br/>
            <Button variant="contained" onClick={checkOut} color="primary"  style = {{ marginBottom:10, marginRight:10 }}>
              Checkout
            </Button>
            <Button variant="contained" onClick={checkIn} color="primary"  style = {{ marginBottom:10 }}>
              Checkin
            </Button>

          </Paper>
        </Grid>
      </Grid>

      </div>





  );
}

export default ProjectViewDetails
