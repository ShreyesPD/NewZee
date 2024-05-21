import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.React_App_Api_Key_two
  render() {
    console.log(this.apiKey)
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" country="in" apiKey={this.apiKey} pageSize={6} category="general" />} />
          <Route exact path="/business" element={<News key="business" country="in" apiKey={this.apiKey} pageSize={6} category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" country="in" apiKey={this.apiKey} pageSize={6} category="entertainment" />} />
          <Route exact path="/general" element={<News key="general" country="in" apiKey={this.apiKey} pageSize={6} category="general" />} />
          <Route exact path="/health" element={<News key="health" country="in" apiKey={this.apiKey} pageSize={6} category="health" />} />
          <Route exact path="/science" element={<News key="science" country="in" apiKey={this.apiKey} pageSize={6} category="science" />} />
          <Route exact path="/sports" element={<News key="sports" country="in" apiKey={this.apiKey} pageSize={6} category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" country="in" apiKey={this.apiKey} pageSize={6} category="technology" />} />
        </Routes>
      </Router>

    )
  }
}
