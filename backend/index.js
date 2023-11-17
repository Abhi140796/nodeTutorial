const fs = require("fs");

// fs.writeFile("message.txt",
//     "Hello buddy", function (err) {
//         if (err) {
//             throw err;
//         }
//         console.log("It worked!")
//     });

fs.readFile("message.txt", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toLocaleString());
});