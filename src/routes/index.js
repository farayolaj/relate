const customerRoutes = require('./customer');
const authRoutes = require('./auth').default;

module.exports = {
  customerRoutes,
  authRoutes
};