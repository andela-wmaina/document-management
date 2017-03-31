const User = require('../models').User;
const Document = require('../models').Document;
const jwt = require('jsonwebtoken');

const secretTokenKey = process.env.SECRET_TOKEN_KEY;

/* Defines middelware methods */
class MiddlewareController {

   /**
    * authMiddleware method
    * Checks if user has a token and if token is valid
    * @params req
    * @params res
    * @params next
    * @return { object } - when token is rejected
  */
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
        return res.status(400).json({
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

  /**
    * checkPermissionDocs method
    * Checks if user has permission to make changes to a document
    * @params req
    * @params res
    * @params next
    * @return { object } - when request is rejected
  */
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
          return res.status(403).json({
            message: 'You do not have the permission to make any changes to this document'
          });
        }
        next();
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  /**
    * checkPermissionUsers method
    * Checks if user has permission to make changes to a user
    * @params req
    * @params res
    * @params next
    * @return { object } - when request is rejected
  */
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
        res.status(400).json(error);
      });
  }

  /**
    * checkPermissionRoles method
    * Checks if user has permission to make changes to a role
    * @params req
    * @params res
    * @params next
    * @return { object } - when request is rejected
  */
  checkPermissionRoles(req, res, next) {
    if (req.user.roleId !== 1) {
      return res.status(403).json({
        message: 'You do not have the permission to create a role'
      });
    }
    next();
  }

   /**
    * checkUser method
    * Filters private document according to user role and user id
    * Sets req.data with results
    * @params req
    * @params res
    * @params next
    * @return {void}
  */
  checkUser(req, res, next) {
    if (req.user.roleId === 2) {
      return Document
        .findAll({
          where: {
            userId: req.user.id
          }
        })
        .then((docs) => {
          req.data = docs;
          next();
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
    return Document
      .findAll({
        where: {
          access: 'private'
        }
      })
      .then((docs) => {
        req.data = docs;
        next();
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
}

module.exports = new MiddlewareController();
