const Transaction = require('../models/transactionModel');

exports.handleStripeEvent = function(req, res) {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update transaction status in the database
      Transaction.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: paymentIntent.status },
        function(err) {
          if (err) {
            return res.status(500).send({ error: err.message });
          }
          res.status(200).send({ received: true });
        }
      );
      break;
    // Handle other event types as needed
    default:
      res.status(400).end();
  }
};
