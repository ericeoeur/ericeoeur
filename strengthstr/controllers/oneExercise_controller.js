const express = require('express'); 
const OneExercise = require('../models/oneExercise.js'); 
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js')
const lift = express.Router(); 

//AUTHENTICATION CHECK
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


// SEED ROUTE
lift.get('/seed', (req, res) => {
  OneExercise.create(
    [
      {
        liftName: 'Squat',
        weight: '135',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Bench',
        weight: '95',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Press',
        weight: '75',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Deadlift',
        weight: '175',
        sets: '1',
        reps: '5',
        completed: true
      }
    ],
    (error, data) => {
      console.log("oneExercise Seed was successful");
      res.redirect('/')
    }
  )
})


//NEW
lift.get('/new', isAuthenticated, (req, res) => {
  res.render('../views/exercises/new.ejs', {
    currentUser: req.session.currentUser
  })
})


//EDIT


//DELETE


//SHOW


//UPDATE


//CREATE
lift.post('/', (req,res) => {
  if (req.body.completed === 'on') {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  console.log("~~~ New Lift Post ~~~~!!!!!!");
  console.log(req.body);
  console.log(req.body.workoutID);

  let newLift = new OneExercise({
    liftName: req.body.liftName, 
    weight: req.body.weight, 
    sets: req.body.sets, 
    reps: req.body.reps, 
    completed: req.body.completed
  })

  

  WorkoutExercises.findById(req.body.workoutID, (error, foundWorkout) => {

  newLift.save((err, newLift) => {
    if (err) {
      res.status(400).send("There is an error while adding a new lift"); 
    } else {
      console.log("you have successfully added a new lift!"); 
      foundWorkout.exercises.push(newLift);
      foundWorkout.save(); 
      res.redirect('/workout/'+req.body.workoutID);
    }
  })

})
  
  //now you need to try to PUSH this data of newLift into the workoutExercises' exercise array. 



})

//INDEX 

module.exports = lift