
/* defines helper methods used by the controllers */
class controllerHelpers {

    /**
    * validateInput method
    * Checks if user input is valid
    * @params data - user request body
    * @return { bool } - true if invalid
    */
    validateInput(data) {
      let invalid;
      Object.keys(data).map((val) => {
        if (data[val] === '' || data[val] === null) {
          invalid = true;
        }
      });
      if (invalid) {
        return invalid;
      }
    }

   /**
    * filterUser method
    * Filters user details and removes password property
    * from return object
    * @params data - user request body
    * @returns - filtered user object
    */
    filterUser(user) {
      const { id, username, email, createdAt, updatedAt, roleId } = user.dataValues;
      return { id, username, email, createdAt, updatedAt, roleId };
    }
}

module.exports = new controllerHelpers();
