import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRegisterClick = () => {
    navigate('/register-consumer');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#14454f',
        overflowX: 'hidden',  
        overflowY: 'auto',    
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>

        
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={handleCartClick}>Cart</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
                  <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" onClick={handleCartClick}>
                  <ShoppingCartIcon />
                </IconButton>
                <Button color="inherit" onClick={onLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleRegisterClick}>
                  Register
                </Button>
                <Button color="inherit" onClick={handleLoginClick}>
                  Login
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
