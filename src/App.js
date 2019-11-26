import React from "react";
import Page1 from "./pages/page1.jsx";
import Page2 from "./pages/page2.jsx";
import Page3 from "./pages/page3.jsx";
import Page4 from "./pages/page4.jsx";
import Nav from "./nav/nav1.jsx";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";

function App() {
  const navConfig = [
    {
      name: "page1",
      path: "/page1",
      id:'1',
      child: [{ name: "page4", path: "/page1/page4", id:'2' }]
    },
    {
      name: "page2",
      path: "/page2",
      id:'3',
    },
    {
      name: "page3",
      path: "/page3",
      id:'4'
    }
  ];

  const history = createHashHistory();
  // console.log(history);

  return (
    <Router history={history}>
      <div className="App">
        <Nav list={navConfig}></Nav>
        <Switch>
          <Route path="/" exact component={Page1}></Route>
          <Route path="/page1" exact component={Page1}></Route>
          <Route path="/page1/page4" component={Page4}></Route>
          <Route path="/page2" component={Page2}></Route>
          <Route path="/page3" component={Page3}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
