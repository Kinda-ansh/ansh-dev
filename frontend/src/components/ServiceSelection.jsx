import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Grid, Card, CardContent, } from '@mui/material';
const ServiceSelection = ({ services, onSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter((id) => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  };

  const handleSubmit = () => {
    const selected = services.filter((service) => selectedServices.includes(service.id));
    onSelect(selected);
  };

  return (
    // <div>
    //   <Typography variant="h3">Select Healthcare Services</Typography>
    //   {services.map((service) => (
    //     <FormControlLabel
    //       key={service.id}
    //       control={
    //         <Checkbox
    //           checked={selectedServices.includes(service.id)}
    //           onChange={() => handleServiceChange(service.id)}
    //         />
    //       }
    //       label={`${service.name} - ₹${service.price}`}
    //     />
    //   ))}
    //   <Button onClick={handleSubmit} variant="contained" color="primary">
    //     Add to Payment
    //   </Button>
    // </div>

<div>
      <Typography variant="h3" gutterBottom>
        Select Healthcare Services
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{service.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
                <Typography variant="h4" color="primary">
                  ${service.price}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                    />
                  }
                  label="Select"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Add to Payment
      </Button>
    </div>
  );
};

export default ServiceSelection;
