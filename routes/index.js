var express = require('express');
var router = express.Router();

const classroomController = require('../controllers').classroom;
const cityController = require('../controllers').city;
const hallController = require('../controllers').hall;
const courseController = require('../controllers').institution;
const reviewController= require('../controllers').review;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Classroom Router */
// router.get('/classroom', classroomController.list);
// router.get('/classroom/:id', classroomController.getById);
// router.post('/classroom', classroomController.add);
// router.put('/classroom/:id', classroomController.update);
// router.delete('/classroom/:id', classroomController.delete);

/* City Router */
router.get('/city', cityController.list);
router.get('/city/:id', cityController.getById);
router.post('/city', cityController.add);
router.put('/city/:id', cityController.update);
router.delete('/city/:id', cityController.delete);

/* hall Router */
router.get('/hall', hallController.list);
router.get('/hall/:id', hallController.getById);
router.post('/hall', hallController.add);
router.put('/hall/:id', hallController.update);
router.delete('/hall/:id', hallController.delete);

/* institution Router */
router.get('/institution', courseController.list);
router.get('/institution/:id', courseController.getById);
router.post('/institution', courseController.add);
router.put('/institution/:id', courseController.update);
router.delete('/institution/:id', courseController.delete);

/* Advance Router */
router.post('/city/add_course', cityController.addInstitution);
// router.post('/classroom/add_with_cities', classroomController.addWithCities);
router.post('/hall/add_with_course', hallController.addWithInstitution);

/*Review Router*/
router.post('/review/add',reviewController.addWithCities);


module.exports = router;
