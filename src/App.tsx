import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Tv from "./Routes/Tv";




function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path={["/search"]}>
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  
  )
      
}

export default App;