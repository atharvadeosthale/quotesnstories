const mongo = require("mongoose");

mongo.connect(
  "mongodb+srv://main:main123@cluster0.22rbk.mongodb.net/quotesnstories?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Connection to MongoDB failed!");
    } else {
      console.log("Connected with MongoDB!");
    }
  }
);

module.exports = mongo.connection;
