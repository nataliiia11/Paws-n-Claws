const httpStatus = require("http-status-codes"),
 htmlContentType = {
 "Content-Type": "text/html"
 },
 routes = { 
 "GET": {
//  "/contact": (req, res) => {
//  res.writeHead(httpStatus.OK, {
//  "Content-Type": "text/plain"
//  })
//  res.end("This  is  a  contact  page!")
//  }
//comment
 },
 'POST': {}
 };
exports.handle = (req, res) => { 
 try {
 if (routes[req.method][req.url]) { //tìm routes tương ứng trong routes object qua method và url
 routes[req.method][req.url](req, res);
 } else {
 res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
 res.end("<h1>No such file exists</h1>");
 }
 } catch (ex) {
 console.log("error: " + ex);
 }
};
exports.get = (url, action) => { 
 routes["GET"][url] = action;
};
exports.post = (url, action) => {
 routes["POST"][url] = action;
};
