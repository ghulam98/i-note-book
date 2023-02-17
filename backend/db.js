const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const CONN = ()=>{
mongoose.connect('mongodb://127.0.0.1:27017/inotebook')
.then(()=>{
    console.log("connection ok")
}).catch((err)=>{
    console.log("not connected!",err)
})
}
module.exports = CONN;



// const mongoose = require('mongoose');
// // const mongoURI = "mongodb://localhost:27017";//WRONG
// // const mongoURI = "mongodb://localhost:27017/?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000";
// const mongoURI = "mongodb://localhost:27017/inotebook";
// mongoose.set("strictQuery", false);


// const connectToMongo = () =>{
//         mongoose.connect(mongoURI, () => {
//         console.log("Connected to MongoDB");
// });
// console.log("END")
// }
// // console.log(connectToMongo.serverStatus().connections,"Number od conn")
// module.exports = connectToMongo;



