const axios = require("axios").default;
const querystring = require("querystring");
const initiatePayment = async ({ paymentDetails, userDetails }) => {
  try {
    let paymentInfo = await axios({
      method: "post",
      url: `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      data: querystring.stringify({
        amount: paymentDetails.amount,
        purpose: paymentDetails.purpose,
        buyer_name: userDetails.username,
        redirect_url: paymentDetails.redirectUrl,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    });
    console.log("Payment res", paymentInfo);
    return {
      success: paymentInfo.data.success,
      redirectUrl: paymentInfo.data.payment_request.longurl,
    };
  } catch (e) {
    console.log("Err", e);
    throw new Error(e.message);
  }
};

module.exports = {
  initiatePayment,
};
