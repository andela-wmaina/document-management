const Document = require('../models').Document;

class DocumentController {

  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
      })
      .then((document) => {
        res.status(201).send({
          message: 'Successful entry',
          document
        });
      })
      .catch(error => res.status(400).send(error));
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
            return res.status(404).send({
              message: 'No Users'
            });
          }
          res.status(200).send(document);
        })
        .catch((error) => {
          res.status(400).send(error)
        });
    }
    return Document
      .all()
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send(error));
  }

  find(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  }

  update(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
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
          .then(() => res.status(200).send({
            message: 'Succesful Update',
            document: document
          }))
          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  delete(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        if (document.userId !== req.user.id && req.user.roleId !== 1) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }))
          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
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
            message: 'Document Not Found',
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
