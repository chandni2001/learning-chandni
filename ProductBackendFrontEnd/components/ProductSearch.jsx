
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, MenuItem, Box } from '@mui/material';
import DataTable from 'react-data-table-component';
import api from '../api';

function ProductSearch() {
    const [searchName, setSearchName] = useState('');
    const [searchPrice, setSearchPrice] = useState('');
    const [searchAvailability, setSearchAvailability] = useState('');
    const [results, setResults] = useState([]);

    const handleSearchByName = async () => {
        try {
            const response = await api.get(`/products/search/name/${searchName}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching by name:', error);
        }
    };

    const handleSearchByPrice = async () => {
        try {
            const response = await api.get(`/products/search/price/${searchPrice}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching by price:', error);
        }
    };

    const handleSearchByAvailability = async () => {
        try {
            const response = await api.get(`/products/search/availability/${searchAvailability}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching by availability:', error);
        }
    };

    
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,
            sortable: true,
        },
        {
            name: 'Availability',
            selector: row => row.availability,
            sortable: true,
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" gutterBottom>
                    Search Products
                </Typography>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search by Name"
                        fullWidth
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        onClick={handleSearchByName}
                        variant="contained"
                        sx={{
                            bgcolor: '#000',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#000',
                                opacity: 0.8,
                            },
                        }}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search by Price"
                        type="number"
                        fullWidth
                        value={searchPrice}
                        onChange={(e) => setSearchPrice(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        onClick={handleSearchByPrice}
                        variant="contained"
                        sx={{
                            bgcolor: '#000',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#000',
                                opacity: 0.8,
                            },
                        }}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search by Availability"
                        select
                        fullWidth
                        value={searchAvailability}
                        onChange={(e) => setSearchAvailability(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="not available">Not Available</MenuItem>
                    </TextField>
                    <Button
                        onClick={handleSearchByAvailability}
                        variant="contained"
                        sx={{
                            bgcolor: '#000',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#000',
                                opacity: 0.8,
                            },
                        }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Box mt={4}>
                {results.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={results}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        customStyles={{
                            table: {
                                borderRadius: '8px',
                                overflow: 'hidden',
                            },
                            headRow: {
                                style: {
                                    backgroundColor: '#f5f5f5',
                                },
                            },
                            cells: {
                                style: {
                                    padding: '16px',
                                },
                            },
                        }}
                    />
                ) : (
                    <Typography variant="body1" align="center">
                        No results found
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default ProductSearch;
