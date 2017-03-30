const Roles = require('../models').Role;
const controllerHelpers = require('../helpers/controllerHelpers');

class RolesController {
  create(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Invalid Input'
      });
    }
    return Roles.create({
      name: req.body.name
    })
      .then(role => res.status(201).json({
        message: 'You have created a role!',
        role
      }))
      .catch(error => res.status(400).json(error));
  }

  list(req, res) {
    return Roles
      .all()
      .then(role => res.status(200).json(role))
      .catch(error => res.status(400).json(error));
  }
}

module.exports = new RolesController();
