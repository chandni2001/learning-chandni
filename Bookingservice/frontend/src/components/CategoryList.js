import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Collapse, TextField } from '@mui/material';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is expanded
    const [services, setServices] = useState({});
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingServices, setLoadingServices] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Track search term

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                setCategories(response.data);
            } catch (error) {
                setError('Failed to fetch categories');
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (categoryName) => {
        // If the clicked category is already expanded, collapse it
        if (expandedCategory === categoryName) {
            setExpandedCategory(null);
            return;
        }

        setExpandedCategory(categoryName); // Set the selected category
        setLoadingServices(true);
        setError(null); // Reset any previous errors

        // Check if services are already fetched for this category
        if (services[categoryName]) {
            setLoadingServices(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/services/category/${categoryName}`);
            setServices((prevServices) => ({
                ...prevServices,
                [categoryName]: response.data, // Store services for this category
            }));
        } catch (error) {
            setError('Failed to fetch services');
        } finally {
            setLoadingServices(false);
        }
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loadingCategories) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>

            {/* Search Bar */}
            <TextField
                label="Search Categories"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
            />

            {/* Display filtered categories */}
            <List>
                {filteredCategories.map((category) => (
                    <div key={category.id}>
                        <ListItem button onClick={() => handleCategoryClick(category.name)}>
                            <ListItemText primary={category.name} />
                        </ListItem>

                        {/* Collapse services for the selected category */}
                        <Collapse in={expandedCategory === category.name} timeout="auto" unmountOnExit>
                            {loadingServices && expandedCategory === category.name ? (
                                <CircularProgress />
                            ) : (
                                <List component="div" disablePadding>
                                    {services[category.name]?.map((service) => (
                                        <ListItem key={service.id} sx={{ pl: 4 }}>
                                            <ListItemText
                                                primary={service.name}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="text.primary">
                                                            Description: {service.description}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="text.primary">
                                                            Price: ${service.price}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Collapse>
                    </div>
                ))}
            </List>

            {filteredCategories.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    No categories found.
                </Typography>
            )}
        </Container>
    );
};

export default CategoryList;
