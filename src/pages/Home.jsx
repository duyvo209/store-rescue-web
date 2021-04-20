
import Drawer from '../components/Drawer';
import Service from './Service';
import { Route, Switch } from 'react-router-dom';


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
            </Switch>
        </Route>
       
      </div>      
    </div>
  );
}

export default HomePage;
