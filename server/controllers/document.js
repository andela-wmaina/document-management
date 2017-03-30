const Document = require('../models').Document;
const controllerHelpers = require('../helpers/controllerHelpers');

/* Defines  Document Controller methods */
class DocumentController {

  /**
    * create method
    * Creates a document
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

    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access || 'private',
        userId: req.user.id
      })
      .then((document) => {
        res.status(200).json({
          message: 'You have successfuly created a document',
          document
        });
      })
      .catch(error => res.status(400).json(error));
  }

   /**
    * list method
    * Lists all documents found in the database
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  list(req, res) {
    const privateDocs = req.data;
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
          res.status(400).json(error);
        });
    }
    return Document
      .findAll({
        where: {
          access: 'public'
        }
      })
      .then(document => res.status(200).json({ document, privateDocs }))
      .catch(error => res.status(400).json(error));
  }

   /**
    * find method
    * Finds a document by the id specified
    * @params req - document id
    * @params res
    * @return { object } - A response to the user
  */
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

   /**
    * update method
    * Updates a document
    * @params req - document id, change to be made
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
    return Document
      .update(updateData, {
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
    * Deletes a document
    * @params req - document id
    * @params res
    * @return { object } - A response to the user
  */
  delete(req, res) {
    return Document
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).json({ message: 'Document successfully deleted' }))
      .catch((error) => {
        res.status(400).json(error);
      });
  }

   /**
    * findsByTitle method
    * Finds a document by the title provided
    * @params req - document title
    * @params res
    * @return { object } - A response to the user
  */
  findByTitle(req, res) {
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
