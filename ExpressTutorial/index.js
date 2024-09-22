import serverHelper from "express";

const port = 3000;
const myApp = serverHelper();

myApp.get("/home", function (req, res) {
    let filePath = "./index.html"
    var uid = req.params.uid
        , file = req.params.file;
    req.mayViewFilesFrom(){
        res.sendFile(filePath, function (hasAccess) {
            if (hasAccess) {
            }
        });
    }
});

app.get('/user/:uid/photos/:file', function (req, res) {
    var uid = req.params.uid
        , file = req.params.file;

    req.user.mayViewFilesFrom(uid, function (yes) {
        if (yes) {
            res.sendFile('/uploads/' + uid + '/' + file);
        } else {
            res.send(403, 'Sorry! you cant see that.');
        }
    });
});

myApp.listen(port, function () {
    console.log(`Server is running successfully on port ${port}`);
});