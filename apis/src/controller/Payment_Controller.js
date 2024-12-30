const Transaction = require('../model/Transaction');
const stripe = require('stripe')('sk_test_51QZc2mIP2mbo7fpubsPuu0xAVbQBF1rK0nEpoi6jdIi0GMOe1IhMpemSDF0iFerT48CGcBwucEt4YQxIY4lSmIF7009P0LlkSp');



// const createPaymentIntent = (req, res) => {
//     const amount = req.body.amount;
  
//     stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//     })
//     .then(paymentIntent => {
//       const newTransaction = new Transaction({
//         paymentIntentId: paymentIntent.id,
//         amount: amount,
//         currency: 'usd',
//         status: paymentIntent.status,
//         createdAt: new Date()
//       });
  
//       return newTransaction.save()
//         .then(() => {
//           res.status(200).send({
//             clientSecret: paymentIntent.client_secret,
//           });
//         });
//     })
//     .catch(err => {
//       res.status(500).send({ error: err.message });
//     });
//   };


const createPaymentIntent = (req, res) => {
    const amountInDollars = parseFloat(req.body.amount);
  
    // Validate if the amount is a valid number
    if (isNaN(amountInDollars) || amountInDollars <= 0) {
      return res.status(400).send({ error: 'Amount must be a positive number.' });
    }
  
    // Convert the amount to cents (for Stripe)
    const amountInCents = Math.round(amountInDollars * 100);
  
    stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
    })
      .then(paymentIntent => {
        const newTransaction = new Transaction({
          paymentIntentId: paymentIntent.id,
          amount: amountInDollars, // Store the amount in dollars (float)
          amountInCents: amountInCents, // Store the amount in cents for payment processing
          currency: 'usd',
          status: paymentIntent.status,
          createdAt: new Date(),
        });
  
        return newTransaction.save()
          .then(() => {
            res.status(200).send({
              clientSecret: paymentIntent.client_secret,
            });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  };
  


  const getAllTransactions = async (req, res) => {
    try {
      // Retrieve all transactions from the database
      const transactions = await Transaction.find({});
  
      // Respond with the transactions
      res.status(200).send(transactions);
    } catch (err) {
      console.error('Error retrieving transactions:', err);
      res.status(500).send({ error: err.message });
    }
  };
  
  module.exports = {
    createPaymentIntent,
    getAllTransactions,
  };
  