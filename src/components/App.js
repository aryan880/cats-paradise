import React, { Component } from 'react'
import './App.css'
 
function hyphenSplitter(data) {
  
  return data.map((d) => {
    return d.split(" - ");
  })
}

function stringToNumber(data) {

  let sum = [];
  for (let index = 0; index < data.length; index++) {
    sum.push((Number(data[index][0]) + Number(data[index][1]))/2);
  }
  return sum;
}

function sumOfArray (array){
  let arraySum = 0;
  for (let i = 0; i < array.length; i++) {
    arraySum += array[i];
  }
  return arraySum;
}

class Average extends Component {
  state = {
    data:[],
    loading:true
  }
  componentDidMount() {
    this.asyncCall();
  }   

  asyncCall = async function() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();

    this.setState({
      data:data,
      loading:false
    })
    console.log(data)
  }
  render() {
    let sum = [];
    let arraySum = 0;
    let avg = 0;
    let roundedAvg = 0;

    let lifeSpanSum = 0;
    let totalLifeSpanSum = 0;
    let lifeSpanAvg = 0;
    let roundedLifeSpanAvg = 0;

    const data = this.state.data.map((prop) => {
      return (prop.weight.metric)
    })

    const ageData= hyphenSplitter(data);
    sum = stringToNumber(ageData);
    arraySum = sumOfArray(sum)
    avg = arraySum/sum.length;
    roundedAvg = (Math.round(avg*100)/100);

    const lifeData = this.state.data.map((prop) => {
      return (prop.life_span);
    })

    const splitLifeData = hyphenSplitter(lifeData);
    lifeSpanSum =  stringToNumber(splitLifeData);
    totalLifeSpanSum = sumOfArray(lifeSpanSum);
    lifeSpanAvg = totalLifeSpanSum/lifeSpanSum.length;  
    roundedLifeSpanAvg = (Math.round(lifeSpanAvg*100)/100);
    return (
      <div>
        {this.state.loading ? <i className="fa fa-cog fa-spin" /> : 
        <>
          {this.state.data.length !== 0 ? <p className = "avgP">On an average a cat can weigh about <span>{roundedAvg}</span> Kg and <span>{roundedLifeSpanAvg}</span> lives years </p>:""}
        </>
        }
      </div>
    )
  }
}

class Heading extends Component {
  state = {
    data:[],
    loading:true
  }
  componentDidMount() {
    this.asyncCall();
  }   

  asyncCall = async function() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();

    this.setState({
      data:data,
      loading:false
    })
    console.log(data)
  }
  render() {
    let eachObject = {};
    let array = this.state.data.map((eachObject) => {
      return eachObject.origin;
    })    
    array.forEach((element) => {
      return eachObject[element] = (eachObject[element] || 0) + 1
    });
    const entries = Object.entries(eachObject);
      return (
      <div>
        {this.state.loading ? <div className = "loader"><i className="fa fa-cog fa-spin" /></div>:
        <Button entry = {entries} handleClick = {this.props.handleClick}/>
        }
      </div>
    )
  }
}

const Button = function (props){
  return(
    <div className = "button-div">
      {props.entry.map((element) => {
      return(
        <button className = "btn" id = {element[0]} onClick = {props.handleClick} > {element[0]}({element[1]}) </button>
      )
      })}
      <button className = "btn" id = "All" onClick = {props.handleClick}>All</button>
    </div>
  );
}

class Cats extends Component {
  state = {
    data:[],
  }

  componentDidMount() {
    console.log("Mounted");
    this.asyncCall();
  }
  
  asyncCall = async function() {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${this.props.data.id}`);
    const data = await response.json();
    console.log(data[0].url)
    this.setState({ 
      data:data,
    })
  }

  componentDidUpdate(prevProp){
    console.log("Component DID UPDATE");
    console.log(prevProp.data );
    console.log(this.props.data)
    if(prevProp.data !== this.props.data){
      console.log("Call Made");
      this.asyncCall()
    } 
  }

  render() {  
    console.log(this.props.data);
    console.log("CAT COMPONENT");  
    return (
      <div className = "cat-cards">
        {this.state.data.length !==0 ? 
        <img className = "cat-image" src = {this.state.data[0].url} alt = {this.props.data.name} /> : ""}
        <div className = "cat-body">
          <h1 className = "cat-title">{this.props.data.name}</h1>
          <h1>{this.props.data.origin}</h1>
          <p>{this.props.data.temperament}</p>
          <p>{this.props.data.life_span} years</p>
          <p>{this.props.data.weight.metric} Kg</p>
          <p>Description</p>
          <p>{this.props.data.description}</p>
        </div>
      </div>
    )
  }
}

class App extends Component { 
  fetchedData = []; 
  state = {
    data:[],
    loading:true
  }
  componentDidMount() {
    this.asyncCall();
  }   

  asyncCall = async function() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
    this.fetchedData = data;
    console.log(data) 
    this.setState({
      data:data,
      loading:false
    })
  }

  handleClick = (e) => {
    console.log("Clicked",e.target.id);
    if(e.target.id !== "All"){
      var newData = this.fetchedData.filter((item) => {
        return item.origin === e.target.id
      })
      console.log(newData);
      this.setState({
         data:newData,
      })
    }
    else if (e.target.id === "All"){
      this.setState({
        data:this.fetchedData
      })
    }
  }

  render() {
    if(this.state.loading === true){return (<i className="fa h fa-cog fa-spin" />)}
    return (
        <div className = "App">
          <div className = "cat-header">
            <h1 className = "title">30 DAYS OF REACT</h1>
            <a href="/" className = "day">Day 20 >></a>
            <ul className = "list">
              <li className = "home"><a href = "/">HOME</a></li>
              <li className = "about"><a href = "/about">ABOUT</a></li>
              <li className = "dummy-data"><a href = "/dummy-data">DUMMY DATA</a></li>
            </ul>
            <img src="https://img.icons8.com/material-outlined/24/000000/cat.png" alt = "cat"/>
            <h3>Cats Paradise</h3>
            <h4>There are {this.fetchedData.length} are cats breeds</h4>
            <Average />
          </div>
            <Heading handleClick = {this.handleClick} />
            {this.state.data.length !== 0 ? this.state.data.map((d) => <Cats data = {d} />): ""}
          <div className = "footer">
            <p className = "copyright">Copyright 2020 30 Days Of React</p>
            <p className = "join">Join 30 days of React Challenge</p>
            <p className = "design">Design and Built By Aryan Sawhney</p>
            <a href="#" className = "scroll" ><img src = "https://img.icons8.com/ios-filled/100/000000/long-arrow-up.png"/></a>
          </div>
        </div>
    );
  }
}
export default App