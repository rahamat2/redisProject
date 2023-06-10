// const redis = require('redis');
// const client = redis.createClient();

// client.on('error', function(err){
//     console.log("Not Connected Error");
// });

// client.on('connect', function(err){
//     console.log("Connected");
// });


const redis = require("redis");
const redisclient = redis.createClient();
  
(async () => {
    await redisclient.connect();
})();
  
console.log("Connecting to the Redis");
  
redisclient.on("ready", () => {
    console.log("Connected!");
});
  
redisclient.on("error", (err) => {
    console.log("Error in the Connection: ", err);
});

(async () => {
    await redisclient.disconnect();
})();

