const Roles = require('../models').Role;

class RolesController {
  create(req, res) {
    return Roles.create({
        name: req.body.name
      })
      .then(role => res.status(201).send({
        message: "Successful entry",
        role: role
      }))
      .catch(error => res.status(400).send(error));
  }

  list(req, res) {
  return Roles
    .all()
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
  }
};

module.exports = new RolesController();