require('dotenv').config();

//My routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const solutionRoutes=require("./routes/solution");
const casesRoutes=require("./routes/cases");
const departmentRoutes=require("./routes/department");
// const lawsRoutes=require("./routes/laws");`


//middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

//Database
const mongoose=require("mongoose");
const port=process.env.PORT ||8000;

//Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true, useFindAndModify: false }).then(()=>{
        console.log("db connected successful")
    }).catch(()=>{
        console.log("Error in loading database");
    });

//Express
const express=require("express");
const app=express();

//using middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',solutionRoutes);
app.use('/api',casesRoutes);
app.use('/api',departmentRoutes);
// app.use('/api',lawsRoutes);

//route start
app.listen(port,()=>{
    console.log("app is running...");
});
