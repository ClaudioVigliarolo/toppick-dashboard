module.exports = {
  HOSTNAME:
    process.env.NODE_ENV === 'production'
      ? 'https://topicks-dashboard.herokuapp.com'
      : 'http://localhost:4001',
};
