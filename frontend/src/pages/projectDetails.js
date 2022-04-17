import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import MultipleSelectCheckmarks from "./checkout"
import {useLocation} from 'react-router-dom';




const ProjectViewDetails = () => {

    const {state} = useLocation()

    const [projectName, setProjectName] = useState("")
    const [projectDesc, setProjectDesc] = useState("")
    const [name, setName] = useState("");
		const [number, setNumber] = useState("");
    const [hwset1, setHWSet1] = useState({'capacity':0, 'availability':0, 'checkedout_qty':0}); 
    const [hwset2, setHWSet2] = useState({'capacity':0, 'availability':0, 'checkedout_qty':0}); 

    console.log("This is hwset1")
    console.log(hwset1);
    console.log("This is hwset2")
    console.log(hwset2);

    const updateData = () => { // TODO: update route names based on backend
      // fetch('route - api/get_hwset1')
      //     .then(response => response.json()) // assumes data is formatted like {"hwset1": data={"capacity": 100, "availability": 100, "checkedout_qty": 0}}
      //     .then(data => setHWSet1(data));
      // fetch('route - api/get_hwset2')
      //     .then(response => response.json())
      //     .then(data => setHWSet2(data));
      fetch("/get-project-sets", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        credentials: "include",
        body: JSON.stringify({_id: state.id})
      }).then(
        res => res.json()
      ).then(
        data => {
          console.log("This is data from get-project-sets")
          console.log(data)
          setHWSet1(data.hw1_info)
          setHWSet2(data.hw2_info)
          setProjectName(data.proj_info.name)
          setProjectDesc(data.proj_info.description)
        }
      )
    }

    useEffect(()=>{
      updateData();
    }, [])   
    
    const numberChange = event => {
  		setNumber(event.target.value);
		};
    const nameChange = (name) => {
    	setName(name);
    }
    const checkOut = async () => {
  		console.log(number + " " + name)
      if(name == ""){
        alert("Please specify a hardware set to check out");
      }
      // TODO: checkout via POST (pass number and name)
      fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        credentials: "include",
        body: JSON.stringify({
          _id: state.id,
          number: number,
          name: name
        })
      }).then(
        res => res.json()
      ).then(
        data => {
          if(data.error){
            alert(data.error_msg)
          }
        }
      )
      updateData();
		}
    const checkIn = async () => {
  		console.log(number + " " + name)
      if(name == ""){
      alert("Please specify a hardware set to check in");
      }
      fetch("/checkin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        credentials: "include",
        body: JSON.stringify({
          _id: state.id,
          number: number,
          name: name
        })
      }).then(
        res => res.json()
      ).then(
        data => {
          if(data.error){
            alert(data.error_msg)
          }
        }
      )
      updateData();
		}
    return (
      <div>

      <Grid container>

      <Grid item xs={12} md={4} align="center">

        <Paper elevation={3} sx={{width:6/7}} >
          <h2 align="center">Project Name: {projectName}, ID: {state.id}</h2>
        </Paper>
        <Paper elevation={3} sx={{width:6/7}} >
          <h2 align="center">Description</h2>
          <p style = {{ padding:10 }}>{projectDesc}</p>
        </Paper>
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
                {/* <ListItemText primary="Hardware Set 1" secondary={'Checked out quantity: ' + (hwset1["checkedout_qty"][state.id]==undefined)? 0 : hwset1["checkedout_qty"][state.id]}/> */}
                <ListItemText primary="Hardware Set 1" secondary={'Checked out quantity: ' + hwset1["checkedout_qty"]}/>
              </ListItem>
              <Divider />
              <ListItem button divider>
                {/* <ListItemText primary="Hardware Set 2" secondary={'Checked out quantity: ' + (hwset2["checkedout_qty"][state.id]==undefined)? 0 : hwset2["checkedout_qty"][state.id]}/> */}
                <ListItemText primary="Hardware Set 2" secondary={'Checked out quantity: ' + hwset2["checkedout_qty"]}/>
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