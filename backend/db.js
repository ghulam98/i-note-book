const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017";//WRONG
const mongoURI = "mongodb://localhost:27017/?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000";
mongoose.set("strictQuery", false);


const connectToMongo = () =>{
        mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB");
});
console.log("END")
}

module.exports = connectToMongo;



