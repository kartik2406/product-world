const { initiatePayment } = require("./cart.service");

const paymentGatewayController = async (req, res, next) => {
  let userDetails = req.user;
  let paymentDetails = req.body;
  console.log("User", userDetails);
  console.log("paymentDetails", paymentDetails);
  try {
    let paymentRes = await initiatePayment({ paymentDetails, userDetails });
    res.status(200).send({ ...paymentRes });
  } catch (e) {
    // console.error(e.message);
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  paymentGatewayController,
};
