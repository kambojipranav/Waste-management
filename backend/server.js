const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wasteDB')
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

const wasteSchema = new mongoose.Schema({
  zoneName: String,
  collectionDate:String,
  vehicledId:String,
  wasteQuantity:Number
});

const Waste = mongoose.model("Waste",wasteSchema);

app.post('/add',async (req,res)=>{
  const data= new Waste(req.body);
  await data.save();
  res.send({message:"Record Added"});
});

app.get('/records',async (req,res)=>{
  const data=await Waste.find();
  res.send(data);
});

app.listen(5000,()=>console.log("Server is ;running on port"));