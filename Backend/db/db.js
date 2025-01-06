import { connect } from "mongoose";

const connectToDb = () => {
  connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => console.log(err));
};

export default connectToDb;
