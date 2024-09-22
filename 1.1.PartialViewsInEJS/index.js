import express from "express";

const app = express();
const port = 3000;

// step 1: make public folder static
app.use(express.static("public"));

// Step 2: Render the home page "/" index.ejs
app.get("/", function(req, res){
  res.render("index.ejs");
});

// Step 3: Render the home page "/about" about.ejs
app.get("/about", function(req, res){
  res.render("about.ejs");
});

// Step 4: Render the home page "/contact" contact.ejs
app.get("/contact", function(req, res){
  res.render("contact.ejs");
});

/* Write your code here:
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
