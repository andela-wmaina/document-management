const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const secretTokenKey = process.env.SECRET_TOKEN_KEY;
// Generate a salt
const salt = bcrypt.genSaltSync();

const createToken = (user) => {
  return jwt.sign(user, secretTokenKey);
}

// Hash the password with the salt
const generateHash = (password) => {
  return bcrypt.hashSync(password, salt);
}

class UserController {
  create(req, res) {
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

  login(req, res) {
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

  // logout(req, res) {
  //  return req.logout();
  // },

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

  update(req, res) {
    const updateData = req.body
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
