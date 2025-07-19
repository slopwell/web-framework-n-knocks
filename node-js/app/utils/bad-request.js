const badRequest = (message) => {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: message }),
  };
};

module.exports = badRequest;
