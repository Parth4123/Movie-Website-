import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env["MONGO_USERNAME"];
const mongo_password = process.env["MONGO_PASSWORD"];
const db_name = process.env["DB_NAME"];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kbl8ceb.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const port = process.env["PORT"];

MongoClient.connect(uri, {
  maxPoolSize: 50, // no.of connetion allowed
  wtimeoutMS: 2500, // time to wait for connection
  useNewUrlParser: true, // new url parser
}).catch(err =>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})