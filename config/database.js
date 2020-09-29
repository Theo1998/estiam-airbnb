require('dotenv').config();

module.exports = {
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jijvf.gcp.mongodb.net/airbnb?retryWrites=true&w=majority`,
};
