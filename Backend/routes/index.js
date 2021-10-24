var express = require('express');
var router = express.Router();

const classroomController = require('../controllers').classroom;
const cityController = require('../controllers').city;
const hallController = require('../controllers').hall;
const courseController = require('../controllers').institution;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Classroom Router */
router.get('/api/classroom', classroomController.list);
router.get('/api/classroom/:id', classroomController.getById);
router.post('/api/classroom', classroomController.add);
router.put('/api/classroom/:id', classroomController.update);
router.delete('/api/classroom/:id', classroomController.delete);

/* City Router */
router.get('/api/city', cityController.list);
router.get('/api/city/:id', cityController.getById);
router.post('/api/city', cityController.add);
router.put('/api/city/:id', cityController.update);
router.delete('/api/city/:id', cityController.delete);

/* hall Router */
router.get('/api/hall', hallController.list);
router.get('/api/hall/:id', hallController.getById);
router.post('/api/hall', hallController.add);
router.put('/api/hall/:id', hallController.update);
router.delete('/api/hall/:id', hallController.delete);

/* institution Router */
router.get('/api/institution', courseController.list);
router.get('/api/institution/:id', courseController.getById);
router.post('/api/institution', courseController.add);
router.put('/api/institution/:id', courseController.update);
router.delete('/api/institution/:id', courseController.delete);

/* Advance Router */
router.post('/api/city/add_course', cityController.addInstitution);
router.post('/api/classroom/add_with_cities', classroomController.addWithCities);
router.post('/api/hall/add_with_course', hallController.addWithInstitution);

module.exports = router;
