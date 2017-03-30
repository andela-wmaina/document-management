const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const controllerHelpers = require('../helpers/controllerHelpers');

const secretTokenKey = process.env.SECRET_TOKEN_KEY;
// Generate a salt
const salt = bcrypt.genSaltSync();
// creates a token with the user details provided
const createToken = user => jwt.sign(user, secretTokenKey);
// Hash the password with the salt
const generateHash = password => bcrypt.hashSync(password, salt);

/* Defines User Controller methods */
class UserController {

   /**
    * create method
    * Creates a user
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  create(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Invalid Input'
      });
    }
    return User.create({
      username: req.body.username,
      email: req.body.email,
      password: generateHash(req.body.password),
      roleId: req.body.role || 2
    })
      .then((user) => {
        const userInfo = { _id: user.id };
        const token = createToken(userInfo);
        res.status(200).json({
          message: 'You have been successfully registered',
          token,
          userDetails: user
        });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * login method
    * Logs in a user
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  login(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Invalid Input'
      });
    }
    return User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({
              success: false,
              error: 'User is not registered'
            });
        }
        const password = bcrypt.compareSync(req.body.password, user.password); // true
        if (!password) {
          return res.json('Password does not match');
        }
        const userInfo = { _id: user.id };
        const token = createToken(userInfo);
        res.status(200)
          .json({
            message: 'You have been successfully logged in',
            token,
            user
          });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * list method
    * Lists all users
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return User
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset
        })
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'There are no users yet!'
            });
          }
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
    return User
      .all()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * find method
    * Find a user by the id given
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  find(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'We could not find this user :(',
          });
        }
        return res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * update method
    * Updates a user
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  update(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Invalid Input'
      });
    }

    const updateData = req.body;
    return User
      .update(updateData,
      {
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).json({
        message: 'Your changes have been successfully applied'
      }))
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * delete method
    * Deletes a user
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  delete(req, res) {
    return User
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).json({ message: 'User successfully deleted' }))
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * findByName method
    * Finds a user by username
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  findByName(req, res) {
    return User
      .findAll({
        where: {
          username: req.query.username
        }
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).json({
            message: 'We could not find this user :(',
          });
        }
        return res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
}

module.exports = new UserController();
