
const port = 3000,
http = require("http"),
httpStatusCodes = require("http-status-codes"),
fs = require("fs");
var path = require("path");
const router = require("./router"),

plainTextContentType = {
    "Content-Type": "text/plain"
    },
    htmlContentType = {
    "Content-Type": "text/html"
    },
    customReadFile = (file, res) => { 
    fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
    console.log("Error reading the file...");
    }
    res.end(data);
    });
    };
    router.get("/homepage.html", (req, res) => {
        res.writeHead(httpStatusCodes.OK, htmlContentType);
        customReadFile("views/homepage.html", res);
       });
   router.get("/personal.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/personal.html", res);
   });
   router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
   });
   http.createServer(router.handle).listen(3000); 
   console.log(`The server is listening on port number:
   ${port}`);
   