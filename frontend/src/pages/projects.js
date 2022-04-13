import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


//const element [projName, setProjname] = useState('Controlled');

class CreateProjForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projName: '',
      projID: '',
      projDescrip:'',
      projects: {}
    };
    
    this.handleChangeid = this.handleChangeid.bind(this);
    this.handleChangedescrip = this.handleChangedescrip.bind(this);
    this.handleChangename = this.handleChangename.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeid(event){
    this.setState({projID: event.target.value});
  }

  handleChangedescrip(event){
    this.setState({projDescrip: event.target.value});
  }

  handleChangename(event){
    this.setState({projName: event.target.value});
  } 

  handleSubmit(event) {
    event.preventDefault();
    alert("projid:" + this.state.projID+ " projectname:" + this.state.projName);
    //need fetch and check for existing ids and then have it go to ./project/id page
    fetch("/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      credentials: "include",
      body: JSON.stringify({_id: this.state.projID, 
                            projName: this.state.projName, 
                            projDescrip: this.state.projDescrip}),
    }).then((res)=>{
      if(res.ok){
        console.log("Success: ")
      }
      else{
        console.log("Failure")
      }
      return res
    }).then(
      res => res.json()
    ).then(
      data => {
        //IF CREATED
        console.log(data)
        if(data.created){
          fetch("/get-projects").then(
            res=>res.json()
            ).then(
              data => {
                this.setState({projects: data})
              }
            )
        }
      }
    )
>>>>>>> origin/projects-joon2
  }
  
  render(){
    return (
      <div>
        <h2>Create a New Project</h2>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }, 
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField id="outlined-basic" label="Enter Project Name" variant="outlined"  onChange={this.handleChangename} value={this.state.projName} required/>
          <TextField id="outlined-basic" label="Enter Project ID" variant="outlined" onChange={this.handleChangeid} value={this.state.projID} required/>
          <TextField id="outlined-basic" label="Enter Description" variant="outlined" multiline rows={4} value={this.state.projDescrip} onChange={this.handleChangedescrip}/>
          
          <Button variant="contained" type="submit">Confirm</Button>
        </Box>
      </div>
    )
  }
  
}

class ExistingProjForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projID: ''
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({projID: event.target.value});
  } 

  handleSubmit(event) {
    event.preventDefault();
    alert("projid:" + this.state.projID);
    //include fetch instead of alert and check for incorrect ids and go to project/id page if it exists
    fetch("/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      credentials: "include",
      body: JSON.stringify({_id: this.state.projID,}),
    }).then((res)=>{
      if(res.ok){
        console.log("Success: ")
      }
      else{
        console.log("Failure")
      }
      return res
    }).then(
      res => res.json()
    ).then(
      data => {
        //IF JOINED
        if(data.joined){
          console.log("JOINED")
        }
        else{
          console.log("NOT JOINED")
        }
      }
    )
  }

  render(){
    return(
      <div>
        <h2>Join an Existing Project</h2>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField id="outlined-basic" label="Enter Project ID" variant="outlined" value={this.state.projID} onChange={this.handleChange} required/>
          <Button variant="contained" type="submit">Confirm</Button>
        </Box>
      </div>
    )
  }
}

async function createData() {
  const response = await fetch("http://127.0.0.1:5000/get-projects");
  const data = await response.json();
  //const result = data.Metadata;
  console.log(data);
  var rows = [];
  for(let i=0; i<data.length; i++){
    var entry = data[i];
    rows[i]=entry;
  }
  return rows
}

/*
function createProjTable() {

  const [rows, setRows] = useState([]);
    useEffect(() => {
        CreateData().then((data)=> {setRows(data)});

  }, []);

  return rows

}



function createData(name, id, descrip) {
  return { name, id, descrip };
}*/


function ProjectTable() {
  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createData().map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': {border:0} }}
            > 
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center" href="/{row.id}">{row.id}</TableCell>
              <TableCell align="center">{row.descrip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class UserPage extends React.Component {

  render(){
    return (
      <Container sx={{ flexGrow: 1 }} >
        <Grid container spacing={2} 
          justify="center"
          justifyContent="center"
          alignItems="flex-start">
          <Grid item xs align="center">
            <Paper elevation={3}>
              <CreateProjForm/>
            </Paper>
          </Grid>
          <Grid item xs align="center">
            <Paper elevation={3}>
              <h2>Existing Projects</h2>
              {createData().length > 0 &&
                <ProjectTable/>
              }
              {createData().length === 0 &&
                <text>No currently existing projects</text>
              }
            </Paper>
          </Grid>
          <Grid item xs align="center">
            <Paper elevation={3}>
              <ExistingProjForm/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    
    )
  }

}

export default UserPage


//for existing projects may either use text area or text field to list all possibe ids or may scrap the idea entirely
//also may need separate entities for each part of project page
//create errors for wrong project ids
//need if and logic for errors and existing projects list