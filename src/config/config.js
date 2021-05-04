module.exports = {
  HOSTNAME:
    process.env.NODE_ENV === "production"
      ? "https://top-pick-api.herokuapp.com"
      : "http://localhost:4001",
};
