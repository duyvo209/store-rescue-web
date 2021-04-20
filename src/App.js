import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Service from './pages/Service'
import Drawer from './components/Drawer';


function App() {
  return (
    <div className="App">
    <Route>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home} />
      </Switch>
    </Route>
         
    </div>
  );
}

export default App;
