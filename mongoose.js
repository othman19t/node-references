// #83 84 85
const mongoose = require("mongoose"); // npm i mongoose
const validator = require("validator"); // npm i validator
// connecting to db
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

 // Define a model
 const User = mongoose.model("User", {
   name: {
     type: String,
     required: true,
     trim: true,
   },
   email: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
     validate(value) {
       if (!validator.isEmail(value)) {
         throw new Error("invalid email");
       }
     },
   },
   password: {
     type: String,
     required: true,
     minlength: 7,
     trim: true,
     validate(value) {
       if (value.toLowerCase().includes("password")) {
         throw new Error("Password can not contain 'password'");
       }
     },
   },
   age: {
     type: Number,
     default: 0,
     validate(value) {
       if (value < 0) {
         throw new Error("Age must be a positive number");
       }
     },
   },
 });

 //Create a user
 const me = new User({
   name: "othman",
   email: "othman@gmail.com",
   password: "othman1995",
   age: 25,
 });

 //saving the user in the database
 me.save()
   .then((result) => {
     console.log(result);
   })
   .catch((err) => {
     console.log(err);
   });

 //Define a model
 const Task = mongoose.model("Task", {
   description: {
     type: String,
   },
   completed: {
     type: Boolean,
   },
 });

 // create a task
 const task = new Task({
   description: "this is the description",
   completed: false,
 });

 // save the task in the database
 task
   .save()
   .then((result) => {
     console.log(result);
   })
   .catch((err) => {
     console.log(err);
   });
