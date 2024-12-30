import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, TextField, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from 'react-router';
import ServiceSelection from '../components/ServiceSelection';
import TransactionHistory from './TransactionHistory';

const stripePromise = loadStripe('pk_test_51QZc2mIP2mbo7fpu8N2TV0yDj9whpMpQPYIK69i9tNkuP6d0u5c7xxMv3ajMCmHVZS1NPUSLbDwsntrXPgPxJb6A00JeaAZZKa');

const services = [
  { id: 1, name: 'General Consultation', description: 'Consultation with a general physician.', price: 500 },
  { id: 2, name: 'Dental Checkup', description: 'Comprehensive dental examination.', price: 700 },
  { id: 3, name: 'Eye Examination', description: 'Complete eye checkup and vision test.', price: 600 },
  { id: 4, name: 'Personal Consultation', description: 'Complete personal check-up, 1:1 doctor consaltancy .', price: 1200 },
  { id: 5, name: 'X-Ray', description: '3d, 2d complete X-Ray', price: 800 },
];

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // To show loading spinner
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // Dialog box for success

  const handleServiceSelect = (services) => {
    setSelectedServices(services);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || selectedServices.length === 0) {
      return;
    }

    const totalAmount = selectedServices.reduce((total, service) => total + service.price, 0);

    setLoading(true); // Start loading

    try {
      const { data } = await axiosInstance.post('/payment/create', { amount: totalAmount });

      const { clientSecret } = data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setLoading(false); // Stop loading

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccessMessage('Payment successful!');
        setSelectedServices([]);
        setOpenSuccessDialog(true); // Show success dialog
        navigate('/payments/successful');
      }
    } catch (error) {
      setLoading(false); // Stop loading
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDialogClose = () => {
    setOpenSuccessDialog(false); // Close dialog
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '45%' }}>
        <ServiceSelection services={services} onSelect={handleServiceSelect} />
      </div>
      <div style={{ width: '45%' }}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        {/* <TextField
          label="Amount (in cents)"
          variant="outlined"
          fullWidth
       style={{fontSize:"50px"}}
          value={selectedServices.reduce((total, service) => total + service.price, 0)}
          margin="normal"
          disabled
        /> */}
        <TextField
  label="Amount (in cents)"
  variant="outlined"
  fullWidth
  value={selectedServices.reduce((total, service) => total + service.price, 0)}
  margin="normal"
  disabled
  style={{
    fontSize: "50px", 
    fontWeight: "bold", 
    
  }}
  InputProps={{
    style: {
      fontSize: "50px",   
      fontWeight: "bold",  
      textAlign: "center", 
       color: "black",   
    }
  }}
/>

        <div style={{ margin: '20px 0', padding: '10px' }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <a href="https://www.paypalobjects.com/en_GB/vhelp/paypalmanager_help/credit_card_numbers.htm" target='_blank'>check dummy card Numbers</a><br />
        
        {/* Show loading indicator while processing payment */}
        {loading ? <CircularProgress /> : (
          <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
            Pay
          </Button>
        )}

        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
      </div>

      {/* Success Dialog Box */}
      <Dialog open={openSuccessDialog} onClose={handleDialogClose}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <Typography>Your payment was processed successfully. Thank you!</Typography>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleDialogClose} color="primary">
          Continue to dashboard{navigate('/payments')}
          </Button> */}
          <Button onClick={handleDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

const Payments = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <br /><br />
      <Typography variant="h4" color="primary">
        Transaction History
      </Typography>
      <br />
      <TransactionHistory />
    </>
  );
};

export default Payments;



// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Button, TextField, Typography } from '@mui/material';
// import axiosInstance from 'utils/axiosInstance';
// import { useNavigate } from 'react-router';
// import ServiceSelection from '../components/ServiceSelection';
// import TransactionHistory from './TransactionHistory';

// const stripePromise = loadStripe('pk_test_51QZc2mIP2mbo7fpu8N2TV0yDj9whpMpQPYIK69i9tNkuP6d0u5c7xxMv3ajMCmHVZS1NPUSLbDwsntrXPgPxJb6A00JeaAZZKa');


// const services = [
//     { id: 1, name: 'General Consultation', description: 'Consultation with a general physician.', price: 500 },
//     { id: 2, name: 'Dental Checkup', description: 'Comprehensive dental examination.', price: 700 },
//     { id: 3, name: 'Eye Examination', description: 'Complete eye checkup and vision test.', price: 600 },
//     { id: 4, name: 'Personal Consultation', description: 'Complete personal check-up, 1:1 doctor consaltancy .', price: 1200 },
//     { id: 5, name: 'X-Ray', description: '3d, 2d complete X-Ray', price: 800 },
    
//   ];

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [selectedServices, setSelectedServices] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const navigate = useNavigate();

//   const handleServiceSelect = (services) => {
//     setSelectedServices(services);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements || selectedServices.length === 0) {
//       return;
//     }

//     const totalAmount = selectedServices.reduce((total, service) => total + service.price, 0);

//     try {
//       const { data } = await axiosInstance.post('/payment/create', { amount: totalAmount });

//       const { clientSecret } = data;

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//       } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//         setSuccessMessage('Payment successful!');
//         setSelectedServices([]);
//         navigate('/payments/successful');
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div style={{ width: '45%' }}>
//         <ServiceSelection services={services} onSelect={handleServiceSelect} />
//       </div>
//       <div style={{ width: '45%' }}>
//         <Typography variant="h5" gutterBottom>
//           Payment Details
//         </Typography>
//         <TextField
//           label="Amount (in cents)"
//           variant="outlined"
//           fullWidth
//           value={selectedServices.reduce((total, service) => total + service.price, 0)}
//           margin="normal"
//           disabled
//         />
//         <div style={{ margin: '20px 0', padding:'10px' }}>
//           <CardElement options={{ hidePostalCode: true }} />
//         </div>
       
//         <a href="https://www.paypalobjects.com/en_GB/vhelp/paypalmanager_help/credit_card_numbers.htm" target='_blank'>check dummy card Numbers</a><br />
//         <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
//           Pay
//         </Button>
//         {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//         {successMessage && <Typography color="primary">{successMessage}</Typography>}
//       </div>
//     </form>
//   );
// };

// const Payments = () => {
//   return (
//     <>
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//     <br /><br />
//     <Typography variant="h4" color="primary">
//                  Transaction History
//                 </Typography>
//                 <br />
//     <TransactionHistory/>
//     </>
//   );
// };

// export default Payments;
