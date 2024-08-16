// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { useLocalStorage } from 'usehooks-ts';
// import Login from './Login';
// import Dashboard from './Dashboard';
// import { Button } from '@mui/material';
// import './App.css'; 
// import JwtDecode from './JwtDecode';

// function App() {
//     const [jwt, setJwt] = useLocalStorage('jwt', '');
//     const navigate = useNavigate();

//     function handleLogout() {
//         setJwt('');
//         navigate('/login', { state: { logoutMessage: "You have successfully logged out!" } });
//     }

//     return (
//         <div className="app-container">
//             {jwt && (
//                 <div className="logout-container">
//                     <Button onClick={handleLogout} variant="contained" color="secondary">
//                         Logout
//                     </Button>
//                 </div>
//             )}
//             <Routes>
                
//                 {/* <Route path="/login" element={<Login />} />
//                 <Route path="/dashboard" element={<Dashboard />} /> */}
//                 <Route path="/details" element={<JwtDecode />} />
//             </Routes>
//         </div>
//     );
// }

// function AppWrapper() {
//     return (
//         <Router>
//             <App />
//         </Router>
//     );
// }

// export default AppWrapper;


//resturnats adding

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

