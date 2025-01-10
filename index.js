import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
  dotenv.config(); //load environment variables

  const client = new mongodb.MongoClient( //create instance of MongoClient
    process.env.MOVIEREVIEWS_DB_URI //pass in database URI
  );

  //retrieve env port or use port 8000
  const port = process.env.PORT || 8000;

  try {
    await client.connect(); //connect to database
    await MoviesDAO.injectDB(client); //get initial ref to movies collection in db
    await ReviewsDAO.injectDB(client);

    //start server after promise is fulfilled
    app.listen(port, () => {
      console.log("server is running on port:" + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//handle unexpected errors
main().catch(console.error);
