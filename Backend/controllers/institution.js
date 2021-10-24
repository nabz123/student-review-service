const Institution = require('../models').Institution;
const City = require('../models').City;
const Hall = require('../models').Hall;

module.exports = {
  list(req, res) {
    return Institution
      .findAll({
        include: [{
          model: City,
          as: 'cities'
        },{
          model: Hall,
          as: 'hall'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: City, as: 'Cities' }, 'createdAt', 'DESC'],
        ],
      })
      .then((institutions) => res.status(200).send(institutions))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Institution
      .findByPk(req.params.id, {
        include: [{
          model: Institution,
          as: 'institution'
        }],
      })
      .then((institution) => {
        if (!institution) {
          return res.status(404).send({
            message: 'Institution Not Found',
          });
        }
        return res.status(200).send(institution);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Institution
      .create({
        institution_name: req.body.institution_name,
      })
      .then((institution) => res.status(201).send(institution))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Institution
      .findByPk(req.params.id, {
        include: [{
          model: Institution,
          as: 'institution'
        }],
      })
      .then(institution => {
        if (!institution) {
          return res.status(404).send({
            message: 'Institution Not Found',
          });
        }
        return institution
          .update({
            institution_name: req.body.institution_name
          })
          .then(() => res.status(200).send(institution))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Institution
      .findByPk(req.params.id)
      .then(institution => {
        if (!institution) {
          return res.status(400).send({
            message: 'Institution Not Found',
          });
        }
        return institution
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
