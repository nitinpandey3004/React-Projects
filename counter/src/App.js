import logo from './logo.svg';
import './App.css';
import React from "react";

function Button(props) {
  const handleClick = () => {
    props.onClickFunction(props.increment)
  }
	return (
    <button onClick={handleClick}>
      +{props.increment}
    </button>
  )
}

function Display(props) {
  return (
    <div>{props.message}</div>
  )
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  
  render() {
    const increment = (val) => this.setState((prev) => ( {
      counter: prev.counter + val
    }));
    return (
      <div>
        <Button onClickFunction = {increment} increment = {1}/>
        <Button onClickFunction = {increment} increment = {5}/>
        <Button onClickFunction = {increment} increment = {10}/>
        <Button onClickFunction = {increment} increment = {50}/>
        <Button onClickFunction = {increment} increment = {100}/>
        <Display message = {this.state.counter}/>
      </div>
    )
  }
}

export default App;
