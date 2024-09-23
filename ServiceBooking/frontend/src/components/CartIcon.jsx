
import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const cartCount = useSelector((state) => state.cart.count); 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart'); 
  };

  return (
    <IconButton
      color="inherit"
      onClick={handleClick}
      sx={{ position: 'absolute', top: 16, right: 16 }} 
    >
      <Badge badgeContent={cartCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
