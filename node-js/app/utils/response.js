const successfully = require("./successfully.js");
const badRequest = require("./bad-request.js");
const methodNotAllowed = require("./method-not-allow.js");

const internalServerError = (output) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "Internal Server Error",
      error: output,
    }),
  };
};

module.exports = {
  successfully,
  badRequest,
  methodNotAllowed,
  internalServerError,
};
