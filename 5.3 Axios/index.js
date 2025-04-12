import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let randomActivity = {
  "activity":"",
  "availability":0,
  "type": "",
  "participants":0,
  "price": 0,
  "accessibility": "",
  "duration": "",
  "kidFriendly": false,
  "link": "",
  "key": "",
  "error": ""
};

const mapRandomActivity = function(data){
  randomActivity.activity = data.activity;
  randomActivity.availability = data.availability;
  randomActivity.type = data.type;
  randomActivity.participants = data.participants;
  randomActivity.price = data.price;
  randomActivity.accessibility = data.accessibility;
  randomActivity.duration = data.duration;
  randomActivity.kidFriendly = data.kidFriendly;
  randomActivity.link = data.link;
  randomActivity.key = data.key;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");

    /** Sample response.data
        {
            "activity": "Go to a concert with some friends",
            "availability": 0.4,
            "type": "social",
            "participants": 4,
            "price": 0.6,
            "accessibility": "Minor challenges",
            "duration": "hours",
            "kidFriendly": true,
            "link": "",
            "key": "4558850"
        }
     */

    mapRandomActivity(response.data);

    res.render("index.ejs", { data: randomActivity });
  } catch (error) {
    randomActivity.error = error.message;
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: randomActivity,
    });
  }
});

// POST request to filter the activities.
app.post("/", async (req, res) => {
  console.log(req.body);

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

  // base url.
  const uri = "https://bored-api.appbrewery.com/filter";
  
  // Array to hold the QS parameters.
  let params = [];

  // Response data.
  let resData = null;

  try{
    // Check if the request body has the type and participants.
    if(req?.body){
      // Check if the request body has the type.
      if(req.body.type){
        params.push(`type=${req.body.type}`);
      }

      // Check if the request body has the participants.
      if(req.body.participants){
        params.push(`participants=${req.body.participants}`);
      } 
    }
    
    // Check if there are any parameters to add to the request.
    if(params.length > 0){
      uri += `?${params.join("&")}`;
      resData = await axios.post(uri);
    }
  
  }
  catch(error){
    randomActivity.error = "No activities that match your criteria.</br>" + error.message;
    console.error("Failed to make request:", error.message);
  }
  finally{
    // Check if there is a response data then map the data to RandomActivity.
    if(resData){
      mapRandomActivity(resData[Math.floor(Math.random() * resData.length)]);
    }

    // Render the index.ejs file with the randomActivity.
    res.render("index.ejs", {
      data: randomActivity,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}/`);
});
