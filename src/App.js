
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';



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
