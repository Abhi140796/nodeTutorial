/**
 * 1. Use the inquirer npn package to get user input.
 * 2. Use the qr-imaqe npn packaqe to turn tne user entered URL irto a QR code imaqe.
 * 3. Creatc a txt file to save the user 'input using the native fs node module.
 */

import userInput from "inquirer";
import qrHelper from "qr-image";
import fileHelper from "fs";

let question = {
    "message": "Enter URL", name: "url"
}
userInput.prompt(question).then(function (answere) {
    let qrData = qrHelper.image(answere.url, { type: "png" });
    qrData.pipe(fileHelper.createWriteStream("./images/I_Love_QR.png"));
}).catch(function (err) {
    if (err) {
        throw err;
    }
});