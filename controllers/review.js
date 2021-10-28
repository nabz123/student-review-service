const Review = require('../models').Review;
const Hall = require('../models').Hall;

module.exports = {
    list(req, res) {
        return Review
            .findAll({
                include: [{
                    model: Hall,
                    as: 'hall'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Hall, as: 'hall'}, 'createdAt', 'DESC'],
                ],
            })
            .then((reviews) => res.status(200).send(reviews))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return Review
            .findByPk(req.params.id, {
                include: [{
                    model: Hall,
                    as: 'hall'
                }],
            })
            .then((review) => {
                if (!review) {
                    return res.status(404).send({
                        message: 'Review Not Found',
                    });
                }
                return res.status(200).send(review);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    add(req, res) {
        return Review
            .create({
                review_name: req.body.review_name,
            })
            .then((review) => res.status(201).send(review))
            .catch((error) => res.status(400).send(error));
    },

    addWithCities(req, res) {

        return Review
            .create(
                {
                    review_data: JSON.stringify(req.body.review_name),
                     hall_id: req.body.hall,
                }
            )
            .then((review) => res.status(201).send(review))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            });
    },

    update(req, res) {
        return Review
            .findByPk(req.params.id, {
                include: [{
                    model: Hall,
                    as: 'hall'
                }],
            })
            .then(review => {
                if (!review) {
                    return res.status(404).send({
                        message: 'Review Not Found',
                    });
                }
                return review
                    .update({
                        review_name: req.body.review_name || review.review_name,
                    })
                    .then(() => res.status(200).send(review))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Review
            .findByPk(req.params.id)
            .then(review => {
                if (!review) {
                    return res.status(400).send({
                        message: 'Review Not Found',
                    });
                }
                return review
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
