import logo from './logo.svg';
import './App.css';
import Menu from "./Menu.js";
import Login from './login.js';
import Footer from './Footer.js';
import Container from './Container.js';
import Counter from "./Counter.js";
import Todo from "./Todo.js";
import Hobbiestodo from "./Hobbiestodo.js";
import AddNumber from "./AddNumber.js";
import SinCosTan from './SinCoseTan.js';
import StudentObj from './StudentObj.js';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Femalemale from './Femalemal.js';
import Fakestore from './Fakestore.js';

function App() {
  return (
    // <div className="App">
      <header>
         {/* <Menu/>
        <Container/>
        <Counter/>
        <Footer/>  */}
        {/* <Todo /> */}
        {/* <Hobbiestodo/> */}
        {/* <AddNumber/> */}
        {/* <SinCosTan/> */}
        {/* <StudentObj/> */}

        {/* <div className='App'>
          <h1>Main Page</h1>
          <BrowserRouter>
          <Link to="/todo">Todo</Link>
          <Link to="/login/Lets-Login/123">Login</Link>

          <br></br>
          <br></br>
          <Routes>
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/login/:title/:tokenId" element={<Login/>}/>
          </Routes>
          </BrowserRouter>
        </div> */}
        {/* <Femalemale/> */}

        <div className='App'>

        <BrowserRouter>
          <Link to="/femalemal">Gender Show</Link>
          <Link to="/fakeStore">Fake Store</Link>

          <br></br>
          <br></br>
          <Routes>
          <Route path="/femalemal" element={<Femalemale/>}/>
          <Route path="/fakeStore" element={<Fakestore/>}/>
          </Routes>
          </BrowserRouter>
          </div>
        {/* <Fakestore/> */}

        
      </header>
    // </div>
  );
}

export default App;
