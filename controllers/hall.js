const Hall = require('../models').Hall;
const Institution = require('../models').Institution;
const Review = require('../models').Review;

module.exports = {
    list(req, res) {
        return Hall
            .findAll({
                include: [{
                    model: Review,
                    as: 'review'
                }, {
                    model: Institution,
                    as: 'institution'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Institution, as: 'institution'}, 'createdAt', 'DESC'],
                ],
            })
            .then((halls) => {
                console.log("get data success ::: ", halls);
                res.status(200).send(halls)
            })
            .catch((error) => {
                console.log('get data error ::: ', error);
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return Hall
            .findByPk(req.params.id, {
                include: [{
                    model: Review,
                    as: 'review'
                }, {
                    model: Institution,
                    as: 'institution'
                }],
            })
            .then((hall) => {
                if (!hall) {
                    return res.status(404).send({
                        message: 'Hall Not Found',
                    });
                }
                return res.status(200).send(hall);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Hall
            .create({
                hall_name: req.body.hall_name
            })
            .then((hall) => res.status(201).send(hall))
            .catch((error) => res.status(400).send(error));
    },

    addWithInstitution(req, res) {
        return Hall
            .create({
                hall_name: req.body.hall_name,
                institution: req.body.institution
            }, {
                include: [{
                    model: Institution,
                    as: 'institution'
                }]
            })
            .then((hall) => res.status(201).send(hall))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Hall
            .findByPk(req.params.id, {
                include: [{
                    model: Review,
                    as: 'review'
                }, {
                    model: Institution,
                    as: 'institution'
                }],
            })
            .then(hall => {
                if (!hall) {
                    return res.status(404).send({
                        message: 'Hall Not Found',
                    });
                }
                return hall
                    .update({
                        hall_name: req.body.hall_name
                    })
                    .then(() => res.status(200).send(hall))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Hall
            .findByPk(req.params.id)
            .then(hall => {
                if (!hall) {
                    return res.status(400).send({
                        message: 'Hall Not Found',
                    });
                }
                return hall
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
