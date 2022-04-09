export const HOSTNAME =
  process.env.NODE_ENV === "production"
    ? "https://toppick-dev-api.herokuapp.com"
    : "http://localhost:4001";
