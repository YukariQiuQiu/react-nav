import React from "react";
import Page1 from "./pages/page1.jsx";
import Page2 from "./pages/page2.jsx";
import Page3 from "./pages/page3.jsx";
import Page4 from "./pages/page4.jsx";
import Page5 from "./pages/page5.jsx";
import Page6 from "./pages/page6.jsx";
import Page7 from "./pages/page7.jsx";
import Page8 from "./pages/page8.jsx";
import Page9 from "./pages/page9.jsx";
import Page10 from "./pages/page10.jsx";
import Nav from "./nav/nav1.jsx";

import Menu from './menu/menu.jsx'

import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";

const navConfig = {
  list:[
          {
            name: "page1",
            path: "/page1",
            id:'1',
            child: [{ name: "page4", path: "/page4", id:'4' },{ name: "page8", path: "/page8", id:'8' }]
          },
          {
            name: "page2",
            path: "/page2",
            id:'2',
            child: [{ name: "page5", path: "/page5", id:'5',child: [{ name: "page9", path: "/page9", id:'9' },{ name: "page10", path: "/page10", id:'10' }] },{ name: "page6", path: "/page6", id:'6' },{ name: "page7", path: "/page7", id:'7' }]
          },
          {
            name: "page3",
            path: "/page3",
            id:'3'
          }
        ],
  styles:{
    width:256,
    height: '100vh',
  }      
}

function App() {

  const history = createHashHistory();
  // console.log(history);

  return (
    <Router history={history}>
      <div className="App">
        {/* <Nav list={navConfig}></Nav> */}
        <Menu {...navConfig}></Menu>
        <Switch>
          <Route path="/" exact component={Page1}></Route>
          <Route path="/page1" exact component={Page1}></Route>
          <Route path="/page4" component={Page4}></Route>
          <Route path="/page2" component={Page2}></Route>
          <Route path="/page3" component={Page3}></Route>
          <Route path="/page5" component={Page5}></Route>
          <Route path="/page6" component={Page6}></Route>
          <Route path="/page7" component={Page7}></Route>
          <Route path="/page8" component={Page8}></Route>
          <Route path="/page9" component={Page9}></Route>
          <Route path="/page10" component={Page10}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
