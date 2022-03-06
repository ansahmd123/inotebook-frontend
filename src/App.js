import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/signup">
                <Signup/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
