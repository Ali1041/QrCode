import logo from './logo.svg';
import Login from './container/login';
import Signup from './container/signup';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './container/home';
import Main from './container/main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path='/home' exact component={Home}/>
          <Route path='/main/' component={Main} />
          <Route path='/' exact component={Login} />
          <Route path='/signup/' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
