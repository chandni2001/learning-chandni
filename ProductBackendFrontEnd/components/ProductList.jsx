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
        async function fetchProducts() {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '25%', // Set a width for the column to prevent it from growing too large
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,
            sortable: true,
            width: '20%', // Set a width for the column
        },
        {
            name: 'Availability',
            selector: row => row.availability,
            sortable: true,
            width: '20%', // Set a width for the column
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
            width: '35%', // Set a width for the actions column
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
                                    overflowX: 'auto', // Ensure horizontal overflow is handled
                                },
                            },
                            headCells: {
                                style: {
                                    padding: '12px 8px', // Adjust padding to prevent excessive column width
                                },
                            },
                            cells: {
                                style: {
                                    padding: '8px', // Adjust cell padding to prevent excessive column width
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default ProductList;
