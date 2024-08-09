// import logo from './logo.svg';
// import './App.css';
// import Menu from "./Menu.js";
// import Login from './login.js';
// import Footer from './Footer.js';
// import Container from './Container.js';
// import Counter from "./Counter.js";
// import Todo from "./Todo.js";
// import Hobbiestodo from "./Hobbiestodo.js";
// import AddNumber from "./AddNumber.js";
// import SinCosTan from './SinCoseTan.js';
// import StudentObj from './StudentObj.js';
// import { BrowserRouter, Routes,  Router, Route,Link } from 'react-router-dom';
// import Femalemale from './Femalemal.js';
// import Fakestore from './Fakestore.js';
// import Githubproblem from './githubproblem.js';
// import TodoDetails from './TodoDetails.js';
// import AddProducts from './ShowProducts.jsx';
// import ExampleUseEffect from './ExampleUseEffect.js';
// import Cities from './city.js';
// import CityDetails from './CityDetails.js';
// import CityNews from './CityNews.js';
// import RefHookExample from './RefHookExample.js';
// import ClassBasedCounter from './ClassBasedCounter.js';
// //import ButtonMaterial from './MatrialUi.js';

// const LOGIN_URL ="http://ascendion.com/login";


// let menudata =[{title:"Home", path:"/"},{title:"Todo",path:"/todo"},{title:"Login",path:"/login"},];
// function greet(){
//   alert("hii lets login");
// }

// function App() {
//   return (
//     <div>
//       <ButtonMaterial/>

//     </div>
//     <div>
//       <RefHookExample/><br></br>
//       <ClassBasedCounter/>
//       <BrowserRouter>
      
//         <Routes>
//           {/* <Route path="/todo/:id" element={<TodoDetails />} />
//           <Route path="/todo/:id/edit" element={<TodoDetailsEdit />} /> */}
          
//           <Route path="/cities" element={<Cities />} >
//           <Route path=":name/" element={<CityDetails />} >
//           <Route path="news" element={<CityNews />} />
//           </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
    
    // <Fakestore />
    // <AddProducts/>

      // <Router>
      //   <Routes>
      //     <Route path="/" element={<AddProducts />} />
      //      <Route path="/products/:id" element={<ProductDetails />}/>
      //   </Routes>
      // </Router> 

      // <AddProducts />
    
    // // <div className="App">
    //   <header>
    //      {/* <Menu/>
    //     <Container/>
    //     <Counter/>
    //     <Footer/>  */}
    //     {/* <Todo /> */}
    //     {/* <Hobbiestodo/> */}
    //     {/* <AddNumber/> */}
    //     {/* <SinCosTan/> */}
    //     {/* <StudentObj/> */}

    //     <div className='App'>
    //       <h1>Main Page</h1>
          // <BrowserRouter>
          
          // <Routes>
          // <Route path="/" element={<ExampleUseEffect/>}/>
          // <Route path="/todo/:id" element={<TodoDetails/>}/> 
          // <Route path="/login/:title/:tokenId" element={<Login L_URL={LOGIN_URL} greet={greet}/>}/>
          // </Routes>
          // </BrowserRouter>
    //     </div>
    //     {/* <Femalemale/> */}
 
    //     {/* <div className='App'> */}

    //     {/* <BrowserRouter>
    //       <Link to="/femalemal">Gender Show</Link>
    //       <Link to="/fakeStore">Fake Store</Link>

    //       <br></br>
    //       <br></br>
    //       <Routes>
    //       <Route path="/femalemal" element={<Femalemale/>}/>
    //       <Route path="/fakeStore" element={<Fakestore/>}/>
    //       </Routes>
    //       </BrowserRouter>
    //       </div> */}
    //     {/* <Fakestore/> */}

    //     {/* <Githubproblem/> */}



        
      // </header>
    // </div>
//   );
// };

// export default App;



// import logo from './logo.svg';
// import './App.css';
// import ShowProducts from './ShowProducts';
// import ProductDetails from './ProductDetails';
// import { BrowserRouter as Router, Route, Routes, BrowserRouter, Link } from 'react-router-dom';
// import AddProducts from './AddProducts';
// import ShowUsers from './ShowUsers';
// import AddUsers from './AddUsers';
// import Cart from './cart'
// // import Addproducts from './AddProducts';

// function App() {
//   return (
//     <div className="AppName">
     
//      <BrowserRouter>
//      {/* <Link to="/admin/category">show</Link> */}
//     <Routes>
//     {/* <Route path='/admin/category' element={<AddProducts/>}> </Route> */}
//       {/* <Route path="/show" element={<ShowProducts/>}> </Route>
//       <Route path='/products/:id' element={<ProductDetails/>}> </Route> */}
//       {/* <Route path="/admin/users" element={<AddUsers/>}> </Route>
//       <Route path="/show" element={<ShowUsers/>}> </Route> */}
//       {/* <Route path='/products/:id' element={<ProductDetails/>}> </Route> */}
//       <Route path="/" element={<Cart/>}> </Route>
    
//     </Routes>
//     </BrowserRouter>



//     </div>

//     );
//   }
  
//   export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Loginuser';
// import Logout from './Logout';
// import './Loginuser.css';
// import './Logout.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<div><a href="/logout">Logout</a></div>} /> {/* Replace with your dashboard component */}
//         <Route path="/logout" element={<Logout />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import './App.css';
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
// // import Navbar from './Navbar';
// import AdminPage from './ASC_Store/AdminPage';
// import ProductsAPI from './ASC_Store/ProductsAPI';
// import CartPage from './ASC_Store/CartPage'
// import OrderDetails from './ASC_Store/OrderDetails';
// // import Login from './Login';  
// function App() {
//   return (  
//     <>
//     <BrowserRouter>
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path='/cart' element={<CartPage />}/>
//           <Route path="/" element={<ProductsAPI />} />
//           {/* <Route path="/AdminPage" element={<AdminPage />}/> */}


// <Route path="/admin" element={<AdminPage />} >
// <Route path=":orderId" element={<OrderDetails />} />
// </Route>
//         </Routes>
//     </BrowserRouter>
//     {/* <Login/> */}
//     </>
//   );
// }
// export default App;


import React from 'react';
// import Button from '@mui/material/Button';
import MaterialUi from './MatrialUi';
import Topograph from './Topograph';
import Gridlay from './Gridlay';
import ThemedApp from './ThemedApp';





function App() {

return (
<div>
<MaterialUi/>
<Topograph/>
<Gridlay/>
<ThemedApp/>
ReactDOM.render(
<React.StrictMode>
<ThemedApp />
</React.StrictMode>,
document.getElementById('root')
);
</div>
);
}
export default App;

