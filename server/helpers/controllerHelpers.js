
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
}

module.exports = new controllerHelpers();
