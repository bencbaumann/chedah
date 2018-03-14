const db    = require('../models');

module.exports = {

    // find all goals
    findAll: (req, res) => {
      db.Goal
        .find(req.query)
        .then(dbgoal => res.json(dbgoal))
        .catch(err => res.status(422).json(err));
    },

    // add a new goal
    addGoal: (req, res) => {
      console.log("Creating a goal and adding it to a gig")
      const goal = {}
      goal.name = req.body.name
      goal.budget = req.body.budget
      goal.description = req.body.description
      const categories = req.body.categories

      db.Goal.create(goal)
        .then(dbGoal => {
          // dbGoal.categories.push(categories)
          // dbGoal.save();
          console.log('dbGoal._id')
          console.log(dbGoal._id)
          console.log('gigId')
          console.log(req.body.gigId)
          
          const gigPromise = db.Gig.findOneAndUpdate({_id: req.body.gigId}, 
            {$push : {
              goals: dbGoal._id
            }},
            {
              new: true
            }
          )

          const goalPromise = db.Goal.findOneAndUpdate({_id: dbGoal._id},
            {$push: {
              categories: categories
            }})
          

          Promise.all([goalPromise, gigPromise])
            .then(resultsArray => resultsArray)

          .then(results => res.json(results))
          .catch(err => {
            console.log(err)  
            res.status(422).json(err)});
        }).catch(err => {
          console.log(err)
          res.status(422).json(err);
        });
    },

    //  update an existing goal
    updateGoal: (req, res) => {
      db.Goal
        .findOneAndUpdate({
          _id: req.params.id
        }, req.body)
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    // //  delete an existing goal
    // deleteGoal: (req, res) => {
    //   console.log(`delete goal`)
    //   db.Goal.findOneAndRemove({_id: req.params.id})
    //     .then(dbgoal => res.json(dbgoal))
    //     .catch(err => res.status(404).json({err: err, msg: 'oh no!'}))
    // },

     //  delete an existing goal
    // deleteGoal: (req, res) => {
    //   console.log(`delete goal`)
    //   db.Goal.findByIdAndRemove(req.params.id)
    //     .then(dbgoal => res.json(dbgoal))
    //     .catch(err => res.status(404).json({err: err, msg: 'oh no!'}))
    // },

    // deleteGoal: (req, res) => {
    //   db.Goal
    //     .findById({ _id: req.params.id })
    //     .then(dbgoal => dbgoal.deleteGoal())
    //     .then(dbgoal => res.json(dbgoal))
    //     .catch(err => res.status(422).json({err: err, msg: 'oh no!'}));
    // },




    // remove a goal
    deleteGoal: (req, res) => {
      console.log(`delete goal`)
      db.Goal
        .findById({
          _id: req.params.id
        })
        .then(dbgoal => {
          dbgoal.remove()
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    findGoalById: (req, res) => {
      // console.log(`-> looking for id: ${req.query.id}`);
      db.Goal
        .findById({
          _id: req.query.id
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    findGoalByName: (req, res) => {
      // console.log(`-> looking for name: ${req.query.name}`);
      db.Goal
        .findOne({
          name:  req.query.name
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },
};
