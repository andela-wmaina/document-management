const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
      roleId: req.body.role
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

  middleware(req, res, next) {
    const token = req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'Opps! You need a token to access this'
      });
    }

    jwt.verify(token, secretTokenKey, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Token provided is incorrect'
        });
      }

      User
        .findById(decoded._id)
        .then((user) => {
          if (!user) {
            return 'We could not find this user :(';
          }
          req.user = user;
          next();
        });
    });
  }

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
            message: 'user Not Found',
          });
        }
        return res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  update(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            email: req.body.email || user.email,
          })
          .then(() => res.status(200).json({
            message: 'Successful Update',
            user
          }))
          .catch((error) => {
            res.status(400).json(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'We could not find this user :(',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).json({ message: 'User has been deleted' }))
          .catch((error) => {
            res.status(400).json(error);
          });
      })
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
