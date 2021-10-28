const City = require('../models').City;
const Institution = require('../models').Institution;

module.exports = {
  list(req, res) {
    return City
      .findAll({
        include: [{
          model: Institution,
          as: 'institutions'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Institution, as: 'institutions' }, 'createdAt', 'DESC'],
        ],
      })
      .then((cities) => res.status(200).send(cities))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return City
      .findByPk(req.params.id, {
        include: [{
          model: Institution,
          as: 'institutions'
        }],
      })
      .then((city) => {
        if (!city) {
          return res.status(404).send({
            message: 'City Not Found',
          });
        }
        return res.status(200).send(city);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return City
      .create({
        city_name: req.body.city_name,
      })
      .then((city) => res.status(201).send(city))
      .catch((error) => res.status(400).send(error));
  },

  addInstitution(req, res) {
    return City
      .findByPk(req.body.city_id, {
        include: [{
          model: Institution,
          as: 'institutions'
        }],
      })
      .then((city) => {
        if (!city) {
          return res.status(404).send({
            message: 'City Not Found',
          });
        }
        Institution.findByPk(req.body.institution_id).then((institution) => {
          if (!institution) {
            return res.status(404).send({
              message: 'Institution Not Found',
            });
          }
          city.addInstitution(institution);
          return res.status(200).send(city);
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return City
      .findByPk(req.params.id, {
        include: [{
          model: Institution,
          as: 'institutions'
        }],
      })
      .then(city => {
        if (!city) {
          return res.status(404).send({
            message: 'City Not Found',
          });
        }
        return city
          .update({
            student_name: req.body.city_name || city.city_name,
          })
          .then(() => res.status(200).send(city))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return City
      .findByPk(req.params.id)
      .then(city => {
        if (!city) {
          return res.status(400).send({
            message: 'City Not Found',
          });
        }
        return city
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
