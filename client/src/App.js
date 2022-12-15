import './App.css';
import medImg from './assests/meditation.png'
import { Signup } from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import UpdateForm from './components/UpdateForm'
import Home from './components/Home'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/update">
            <UpdateForm />
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;