const Document = require('../models').Document;
const User = require('../models').User;

module.exports = {
	create(req, res) {
	  return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.user
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },

	list(req, res) {
	  return Document
	    .all()
	    .then(document => res.status(200).send(document))
	    .catch(error => res.status(400).send(error));
	},

	retrieve(req, res) {
	  return Document
	    .findById(req.params.documentId)
	    .then(document => {
	      if (!document) {
	        return res.status(404).send({
	          message: 'Document Not Found',
	        });
	      }
	      return res.status(200).send(document);
	    })
	    .catch(error => res.status(400).send(error));
	},

	update(req, res) {
	  return Document
	    .findById(req.params.documentId)
	    .then(document => {
	      if (!document) {
	        return res.status(404).send({
	          message: 'Document Not Found',
	        });
	      }
	      return document
	        .update({
	          title: req.body.title || document.title,
	        })
	        .then(() => res.status(200).send(document))
	        .catch((error) => res.status(400).send(error));
	    })
	    .catch((error) => res.status(400).send(error));
	},

	destroy(req, res) {
	  return Document
	    .findById(req.params.documentId)
	    .then(document => {
	      if (!document) {
	        return res.status(404).send({
	          message: 'Document Not Found',
	        });
	      }
	      return document
	        .destroy()
	        .then(() => res.status(200).send({message: 'Deleted'}))
	        .catch((error) => res.status(400).send(error));
	    })
	    .catch((error) => res.status(400).send(error));
	}

	// exports.checkAvatar = function(req, res) {
 //  if (req.user && req.user._id) {
 //    User.findOne({
 //        _id: req.user._id
 //      })
 //      .exec(function(err, user) {
 //        if (user.avatar !== undefined) {
 //          res.redirect('/#!/');
 //        } else {
 //          res.redirect('/#!/choose-avatar');
 //        }
 //      });
 //  } else {
 //    // If user doesn't even exist, redirect to /
 //    res.redirect('/');
 //  }

};