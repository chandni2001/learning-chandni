import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, Container, Box } from '@mui/material';
import DataTable from 'react-data-table-component';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

<<<<<<< HEAD
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '25%',
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price}`,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Availability',
      selector: (row) => row.availability,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Box display="flex" gap={1}>
          <IconButton component={Link} to={`/product/${row._id}`} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton component={Link} to={`/product/edit/${row._id}`} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(row._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '35%',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box width="100%">
        <Typography variant="h4" gutterBottom align="center">
          All Product List
        </Typography>
        <Box sx={{ overflow: 'hidden', bgcolor: '#fff', borderRadius: 1 }}>
          <DataTable
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            striped
            dense
            noHeader
            customStyles={{
              table: {
                style: {
                  overflowX: 'auto',
                },
              },
              headCells: {
                style: {
                  padding: '12px 8px',
                },
              },
              cells: {
                style: {
                  padding: '8px',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
=======
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '25%', 
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,
            sortable: true,
            width: '20%', 
        },
        {
            name: 'Availability',
            selector: row => row.availability,
            sortable: true,
            width: '20%', 
        },
        {
            name: 'Actions',
            cell: row => (
                <Box display="flex" gap={1}>
                    <IconButton component={Link} to={`/product/${row._id}`} color="primary">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton component={Link} to={`/product/edit/${row._id}`} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteProduct(row._id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '35%', 
        },
    ];

    return (
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Box width="100%">
                <Typography variant="h4" gutterBottom align="center">
                    All Product List
                </Typography>
                <Box sx={{ overflow: 'hidden', bgcolor: '#fff', borderRadius: 1 }}>
                    <DataTable
                        columns={columns}
                        data={products}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        dense
                        noHeader
                        customStyles={{
                            table: {
                                style: {
                                    overflowX: 'auto', 
                                },
                            },
                            headCells: {
                                style: {
                                    padding: '12px 8px', 
                                },
                            },
                            cells: {
                                style: {
                                    padding: '8px', 
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
>>>>>>> a5cfd934de70fba2d5d8f9fa9a956f5f21289cd4
}

export default ProductList;
