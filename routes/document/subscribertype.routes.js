var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var subscribertypeModel = require('./../../models/document/subscribertypeModel');


router.post('/create', async function(req, res) {
  try{
        await subscribertypeModel.create({
            subscriber_type:  req.body.subscriber_type,
            date_and_time : req.body.date_and_time
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"User type Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      subscribertypeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        subscribertypeModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        subscribertypeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        subscribertypeModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"User type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        subscribertypeModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      subscribertypeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User type Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
