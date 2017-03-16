const User = require('../models').User;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const secretTokenKey = process.env.SECRET_TOKEN_KEY;

const createToken = (user) => {
  return jwt.sign(user, secretTokenKey);
}

// Generate a salt
const salt = bcrypt.genSaltSync();
// Hash the password with the salt
const GenerateHash = (password) => {
  return bcrypt.hashSync(password, salt);
} 

class UserController {
  create(req, res) {

    return User.create({
        username: req.body.username,
        email: req.body.email,
        password: GenerateHash(req.body.password),
        roleId: req.body.role
      })
      .then((user) => {
        const userInfo = { _id: user.id }
        const token = createToken(userInfo);

        res.status(200).json({
          message: 'Successful registration',
          token: token,
          userDetails: user
        });
      })
      .catch(error => res.status(400).send(error));
  }

   testCreate(data) {

    return User.create(data)
      .then((user) => {
        const userInfo = { _id: user.id }
        const token = createToken(userInfo);
      })
      .catch(error => error);
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
              error: 'User not found'
            })
        }

        const password = bcrypt.compareSync(req.body.password, user.password); // true

        if (!password) {
          return res.send('Password does not match');
        }

        const userInfo = { _id: user.id }
        const token = createToken(userInfo);

        res.status(200)
          .json({
            message: 'Successful login',
            token,
            user
          });
      })
      .catch(error => res.status(400).send(error));
  }

  // logout(req, res) {
  //  return req.logout();
  // },

  middleware(req, res, next) {
    const token = req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }

    jwt.verify(token, 'secretTokenKey', (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      }
      // TODO fetch the user from the db using the decoded id.
      User
        .findById(decoded._id)
        .then(user => {
          if (!user) {
            return 'User Not Found'
          }
          req.user = user
          next()
        });
    });
  }

  list(req, res) {
    return User
      .all()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  }

  find(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  }

  update(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            email: req.body.email || user.email,
          })
          .then(() => res.status(200).send({
          message: "Successful Update",
          user: user
        }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = new UserController();
