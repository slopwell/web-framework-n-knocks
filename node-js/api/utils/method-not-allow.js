const methodNotAllowed = () => {
  return {
    statusCode: 405,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: "Method Not Allowed" }),
  };
};

module.exports = methodNotAllowed;
