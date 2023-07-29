// Create web server
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var port = 8080;
var comments = [];
var app = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var ext = path.extname(pathname);
    console.log("Request for " + pathname + " received.");
    if (pathname === "/") {
        fs.readFile("index.html", "utf-8", function(err, data) {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(data);
            response.end();
        });
    } else if (ext === ".css") {
        fs.readFile("." + pathname, "utf-8", function(err, data) {
            response.writeHead(200, {
                "Content-Type": "text/css"
            });
            response.write(data);
            response.end();
        });
    } else if (ext === ".js") {
        fs.readFile("." + pathname, "utf-8", function(err, data) {
            response.writeHead(200, {
                "Content-Type": "text/js"
            });
            response.write(data);
            response.end();
        });
    } else if (ext === ".jpg") {
        fs.readFile("." + pathname, function(err, data) {
            response.writeHead(200, {
                "Content-Type": "image/jpg"
            });
            response.write(data);
            response.end();
        });
    } else if (ext === ".png") {
        fs.readFile("." + pathname, function(err, data) {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(data);
            response.end();
        });
    } else if (ext === ".ico") {
        fs.readFile("." + pathname, function(err, data) {
            response.writeHead(200, {
                "Content-Type": "image/ico"
            });
            response.write(data);
            response.end();
        });
    } else if (pathname === "/comments") {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(comments));
        response.end();
    } else if (pathname === "/saveComment") {
        var body = "";
        request.on("data", function(data) {
            body += data;
        });
        request.on("end", function()