import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const ServicesList = () => {
    const { categoryName } = useParams();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/services/category/${categoryName}`);
                setServices(response.data);
            } catch (error) {
                setError('Failed to fetch services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [categoryName]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Services under "{categoryName}"
            </Typography>
            <List>
                {services.map((service) => (
                    <ListItem key={service.id} alignItems="flex-start">
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
        </Container>
    );
};

export default ServicesList;
