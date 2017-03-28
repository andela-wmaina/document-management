const User = require('../models').User;
const Document = require('../models').Document;
const jwt = require('jsonwebtoken');
const secretTokenKey = process.env.SECRET_TOKEN_KEY;

class MiddlewareController {
  authMiddleware(req, res, next) {
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

  checkPermissionDocs(req, res, next) {
    Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'We could not find this document :(',
          });
        }

        if (document.userId !== req.user.id && req.user.roleId !== 1) {
          return res.json({
            message: 'You do not have the permission to make any changes to this document'
          });
        }
        next();
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  checkPermissionUsers(req, res, next) {
    User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'We could not find this user :(',
          });
        }

        if (user.id !== req.user.id && req.user.roleId !== 1) {
          return res.status(403).json({
            message: 'You do not have the permission to make any changes to this user'
          });
        }
        next();
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json(error);
      });
  }

  checkPermissionRoles(req, res, next) {
    if (req.user.roleId !== 1) {
      return res.json({
        message: 'You do not have the permission to create a role'
      });
    }
    next();
  }
}

module.exports = new MiddlewareController();