// Modules
import serverHelper from "express";
import { dirname } from "path";
import { fileURLToPath } from "url"
import bodyParser from "body-parser";

// get directory
const _dirName = dirname(fileURLToPath(import.meta.url));
let fileUrl = fileURLToPath(import.meta.url);

console.log(`fileURLToPath(import.meta.url): ${fileUrl}`);
console.log(`import.meta.url: ${import.meta.url}`);
console.log(`_dirName: ${_dirName}`);

const port = 3000;
const middleWareApp = serverHelper();

middleWareApp.use(bodyParser.urlencoded({ extended: true }));
middleWareApp.use(function (req, resp, next) {
    next();

})

// Routing
middleWareApp.get("/", function (req, resp) {
    resp.sendFile(`${_dirName}/public/index.html`);
});

middleWareApp.post("/submit", function (req, resp) {
    console.log(req.body);
    let resObj = { ...req.body };
    let respo = resObj.username + resObj.password;
    resp.send("<h1>" + respo + ", you have succesfully login</h1>");
});



middleWareApp.listen(port, function () {
    // Do something
});