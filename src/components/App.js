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

function Average (props){
  let sum = [];
  let arraySum = 0;
  let avg = 0;
  let roundedAvg = 0;

  let lifeSpanSum = 0;
  let totalLifeSpanSum = 0;
  let lifeSpanAvg = 0;
  let roundedLifeSpanAvg = 0;

  const data = props.data.map((prop) => {
    return (prop.weight.metric)
  })

  const ageData= hyphenSplitter(data);
  sum = stringToNumber(ageData);
  arraySum = sumOfArray(sum)
  avg = arraySum/sum.length;
  roundedAvg = (Math.round(avg*100)/100);

  const lifeData = props.data.map((prop) => {
    return (prop.life_span);
  })

  const splitLifeData = hyphenSplitter(lifeData);
  lifeSpanSum =  stringToNumber(splitLifeData);
  totalLifeSpanSum = sumOfArray(lifeSpanSum);
  lifeSpanAvg = totalLifeSpanSum/lifeSpanSum.length;
  roundedLifeSpanAvg = (Math.round(lifeSpanAvg*100)/100);

  return (
    <p>On an average a cat can weigh about {roundedAvg} Kg and {roundedLifeSpanAvg} lives years</p>
  )
}

const Heading = function ({data}){
  let eachObject = {};
  let array = data.map((eachObject) => {
    return eachObject.origin;
  })

  array.forEach((element) => {
    return eachObject[element] = (eachObject[element] || 0) + 1
  });

const entries = Object.entries(eachObject);
  return (
    <div>
      {entries.map((element) => {
      return(
        <button id = {element[0]}> {element[0]}({element[1]}) </button>
      )
      })}
      <button>All</button>
    </div>
  )
}

const Cats = function ({cats}){
  return (
    <div>
      {cats.map((d) => {
        return (
          <>
            <img src = {d.image.url} alt = "cat" />
            <h1>{d.name}</h1>
            <h1>{d.origin}</h1>
            <p>{d.temperament}</p>
            <p>{d.life_span} years</p>
            <p>{d.weight.metric} Kg</p>
            <p>Description</p>
            <p>{d.description}</p>
          </>
        );
      })}
    </div>
  );
}

class App extends Component {
  state = {
    data:[]
  }
  componentDidMount() {
    this.asyncCall();
  }      
  asyncCall = async function() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await response.json();
    this.setState({
      data:data
    })
  }
  render() {
    return (
      <div className = "App">
        <div className = "cat-header">
          <h1 className = "title">30 DAYS OF REACT</h1>
          <a href="/">Day 20</a>
          <ul className = "list">
            <li className = "home"><a href = "/">HOME</a></li>
            <li className = "about"><a href = "/about">ABOUT</a></li>
            <li className = "dummy-data"><a href = "/dummy-data">DUMMY DATA</a></li>
          </ul>
          <img src="https://img.icons8.com/material-outlined/24/000000/cat.png" alt = "cat"/>
          <h3>Cats Paradise</h3>
          <h4>There are {this.state.data.length} are cats breeds</h4>
          {this.state.data.length !== 0 ? <Average data = {this.state.data} /> : ""}
          {this.state.data.length !== 0 ? <Heading data = {this.state.data} /> : ""}
          {this.state.data.length !== 0 ? <Cats cats = {this.state.data} /> : ""}
        </div>
        <div className = "footer">
          <p>Copyright 2020 30 Days Of React</p>
          <p>Join 30 days of React Challenge</p>
          <p>Design and Built By Aryan Sawhney</p>
        </div>
      </div>
    );
  }
}
export default App