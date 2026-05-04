// Eventually update to get the team ID from the Clay settings the user chooses
// Currently hard coded to the Dodgers' ID: 119
const team_id = 119;

// Daily hit the schedule API to see if there is a game scheduled for the selected team
async function checkSchedule(id) {
  // Get the day, month, and year to plug into the api url string 
  // For whatever reason, Date methods are NOT zero indexed on Day and Year but ARE zero indexed for the Month
  // Because of that, we need to increment the Month int by 1 on creation for acccurate date capture
  let current_full_date = new Date();
  
  let current_day = current_full_date.getDate();
  let current_month = current_full_date.getMonth() +1;
  let current_year = current_full_date.getFullYear();
  
  // Construct the api url with the above variables
  // v1 is currently the only supported statsapi.mlb api version
  // sportId=1 refers to the MLB specifically, may be changed in the future to include minor leagues, etc.
  let schedule_api_url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${current_year}-${current_month}-${current_day}`;
  console.log(`${current_year}-${current_month}-${current_day}`);
  
  try {
    const response = await fetch(schedule_api_url);
    // Handle non-ok responses    
    if (!response.ok) {
      // throw new Error(`Response status: ${response.status}`);
      console.log("error: ", response.status);
    }

    const result = await response.json();
    console.log(result);
    
    // Parse response for team_id, and use the api's gameDate field to capture when the game starts for local user
    // If no team_id found for the day, exit and do not provide N/A update to user
    
  } catch (error) {
    console.error(error.message);
  }
}

console.log("about to run checkSchedule")
checkSchedule(team_id);

// Variables Needed for Updates
let current_update_url_parameters =  {
  // This will change to get the game_id from the above schedule checker  
  game_id: 824364,
  most_recent_timeStamp: 0
};

// // Open the websocket for the game once it is set to live
// const ws = new WebSocket("wss://ws.statsapi.mlb.com/api/v1/game/push/subscribe/gameday/824364");

// ws.addEventListener("open", (event) => {
//   console.log("Server Opened, waiting to receive updates.");
// });

// ws.addEventListener("message", (event) => {
//   let response = JSON.parse(event.data);
//   console.log("response received: ", response);
//   console.log("timeStamp: ", response.timeStamp);
//   current_update_url_parameters.most_recent_timeStamp = response.timeStamp;
//   console.log("update received, new data to submit for an update is: ", JSON.stringify(current_update_url_parameters));
// });

