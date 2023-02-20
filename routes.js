const routes = require('next-routes')();

routes
     .add('/receipt/:lastpaid','/receipt')
     .add('/viewstudentpaymenthistory/:matno','/viewstudentpaymenthistory');

module.exports = routes;
