import logo from './logo.svg';
import './App.css';
import React from "react";
import CardList from "./Components/CardList/CardList";
import Form from "./Components/Form/Form";


const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
{name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: testData
    };
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  }
  render() {
    return (
      <div>
        <div className="header">
          {this.props.title}
        </div>
        <Form onSubmit = {this.addNewProfile}/>
        <CardList testData={this.state.profiles}/>
      </div>
    );
  }
}

export default App;
