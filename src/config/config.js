module.exports = {
  HOSTNAME:
    process.env.NODE_ENV === "production"
      ? "https://top-pick-api.herokuapp.com"
      : "https://top-pick-api-dev.herokuapp.com",
};
