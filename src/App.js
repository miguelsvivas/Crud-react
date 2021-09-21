import './App.css';
import Listar from "./components/Listar";
import Crear from './components/Crear';
import Editar from './components/Editar';

import {Route, BrowserRouter as Router} from "react-router-dom";

import {Link } from "react-router-dom";


function App() {
  return (
    <Router>

     <nav class="navbar navbar-expand navbar-light bg-light">
         <div class="nav navbar-nav">
             <Link class="nav-item nav-link active" to={"/"}>Sistema<span class="sr-only"></span></Link>
         </div>
     </nav> 
     <br/>
     <div className="container">

    <Route exact path="/"
    component={Listar}>

    </Route>
    <Route exact path="/crear"
    component={Crear}>

    </Route>

    <Route exact path="/editar/:id"
    component={Editar}>

    </Route>

    



    </div>
    </Router>
  );
}

export default App;
