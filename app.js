const express = require('express')
const ExpressError = require('./expressError');
const itemsRoutes = require("./routes")

const app = express();

app.use(express.json());

app.use("/items", itemsRoutes);

app.get('/', function(req, res) {
    return res.send('sup y\'all');
  });
// app.get('/', function(req, res) {
//     return res.send('sup y\'all');
    
//   });











// 404 handler
app.use(function(req, res) {
  throw new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  console.log('its me, your error handler')
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;