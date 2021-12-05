import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

//UTILIZANDO REACT-ROUTER-DOM SE MOSTRARA COMO PANTALLA PRINCIPAL "HOME"

function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
