
import Drawer from '../components/Drawer';
import Service from './Service';
import { Route, Switch } from 'react-router-dom';
import Invoice from "./Invoice";
import Revenue from '../components/Revenue';


function HomePage() {
  return (
    <div className="App">
      <div className="container-left">
        <Drawer />
      </div>
      <div className="container-right">
        <Route>
            <Switch>            
                <Route exact path="/home/service" component={Service} />
                <Route exact path="/home/invoice" component={Invoice} />
                <Route exact path="/home/revenue" component={Revenue} />
            </Switch>
        </Route>
       
      </div>      
    </div>
  );
}

export default HomePage;
