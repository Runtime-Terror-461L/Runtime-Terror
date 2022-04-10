import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


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
    //need fetch and check for existing ids and/or names
    fetch("/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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
        if(data.created){
          fetch("/get-projects").then(
            res=>res.json()
            ).then(
              data => {
                this.setState({projects: data})
                console.log(data)
              }
            )
        }
      }
    )
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
          <TextField id="outlined-basic" label="Project ID" variant="outlined" onChange={this.handleChangeid} value={this.state.projID} required/>
          <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4} value={this.state.projDescrip} onChange={this.handleChangedescrip}/>
          
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
    //include fetch instead of alert and check for incorrect ids
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
          <TextField id="outlined-basic" label="Project ID" variant="outlined" value={this.state.projID} onChange={this.handleChange} required/>
          <Button variant="contained" type="submit">Confirm</Button>
        </Box>
      </div>
    )
  }
}

class UserPage extends React.Component {

  render(){
    return (
      <Container sx={{ flexGrow: 1 }} >
        <Grid container spacing={1} 
          justify="center"
          justifyContent="center"
          alignItems="flex-start">
          <Grid item xs>
            <CreateProjForm/>
          </Grid>
          <Grid item xs>
            <h2>Existing Projects</h2>
            <text>No currently existing projects</text>
          </Grid>
          <Grid item xs>
            <ExistingProjForm/>
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