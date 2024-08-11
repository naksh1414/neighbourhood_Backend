import mongoose, { Schema, connect } from "mongoose";
import "dotenv/config";

const dbUrl = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await connect(dbUrl);
  console.log("Mongo Connection Open!!!");
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const localitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  OwnerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  Near_College: {
    type: String,
  },
  category: {
    type: String,
  },
  Distance_from_college: {
    type: String,
  },
  Description: {
    type: String,
  },
  Ratings: {
    type: String,
  },
  Reviews: {
    type: String,
  },
  Address: {
    type: String,
  },
  g_map: {
    type: String,
  },
  images: [
    {
      imageLink: {
        type: String,
      },
    },
  ],
  services_offered: [
    {
      service_Name: {
        type: String,
      },
    },
  ],
});

const Locality = mongoose.model("Locality", localitySchema);

export default Locality;
