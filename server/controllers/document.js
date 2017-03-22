const Document = require('../models').Document;

class DocumentController {

  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access || 'private',
        userId: req.body.userId
      })
      .then((document) => {
        res.status(201).json({
          message: 'You have successfuly created a document',
          document
        });
      })
      .catch(error => res.status(400).json(error));
  }

  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return Document
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset
        })
        .then((document) => {
          if (!document) {
            return res.status(404).json({
              message: 'We could not find this document :('
            });
          }
          res.status(200).json(document);
        })
        .catch((error) => {
          res.status(400).json(error)
        });
    }
    return Document
      .findAll({
        where: {
          access: 'public'
        }
      })
      .then(document => res.status(200).json(document))
      .catch(error => res.status(400).json(error));
  }

  find(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'We could not find this document :(',
          });
        }
        return res.status(200).json(document);
      })
      .catch(error => res.status(400).json(error));
  }

  update(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'We could not find this document :(',
          });
        }
        if (document.userId !== req.user.id) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .update({
            title: req.body.title || document.title,
          })
          .then(() => res.status(200).json({
            message: 'Your changes have been successfully applied',
            document: document
          }))
          .catch((error) => {
            res.status(400).json(error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  delete(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'We could not find this document :(',
          });
        }
        if (document.userId !== req.user.id && req.user.roleId !== 1) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).json({ message: 'Document successfully deleted' }))
          .catch((error) => {
            res.status(400).json(error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  findByName(req, res) {
    return Document
      .findAll({
        where: {
          title: req.query.title
        }
      })
      .then((document) => {
        if (document.length === 0) {
          return res.status(404).json({
            message: 'We could not find this document :(',
          });
        }
        return res.status(200).json(document);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

}

module.exports = new DocumentController();
