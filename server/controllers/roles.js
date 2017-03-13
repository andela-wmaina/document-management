const Roles = require('../models').Role;

class RolesController {
  create(req, res) {
    return Roles.create({
        name: req.body.name,
      })
      .then(roles => res.status(201).send({
        message: "Successful entry",
        role: role
      }))
      .catch(error => res.status(400).send(error));
  }

  list(req, res) {
  return Roles
    .all()
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
  }
};

module.exports = new RolesController();