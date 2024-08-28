
//todo new api and its front end

// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import Todo from './Todo';
// import TodoDetails from './TodoDetails'
// import TodoDetailsEdit from './TodoDetailsEdit';

// function App() {
//   return (
//       <BrowserRouter>
//           <Routes>
//               <Route path="/todo" element={<Todo />} />
//               <Route path='/todo/:id' element={<TodoDetails />}/>
//               <Route path='/todo/:id/edit' element={<TodoDetailsEdit />}/>
//           </Routes>
//       </BrowserRouter>
//   );
// }

// export default App;


// product api created and its front end

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductSearch from './components/ProductSearch';
import ProductDetails from './components/ProductDetails';

// Styled AppBar with a black background
const CustomAppBar = styled(AppBar)({
  backgroundColor: '#000000', // Black color
});

// Centering the Toolbar content
const CenteredToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
});

function App() {
  return (
    <Router>
      <CustomAppBar position="static">
        <CenteredToolbar>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 2 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/product/add" sx={{ mx: 2 }}>
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/search" sx={{ mx: 2 }}>
            Products Search
          </Button>
        </CenteredToolbar>
      </CustomAppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/add" element={<ProductForm />} />
          <Route path="/product/edit/:id" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<ProductSearch />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;


