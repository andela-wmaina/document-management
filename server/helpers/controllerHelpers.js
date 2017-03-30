
class controllerHelpers {
    validateInput(data) {
      let valid;
      Object.values(data).map((dat) => {
        if (dat === '' || dat === null) {
          valid = true;
        }
      });
      if (valid) {
        return valid;
      }
    }
}

module.exports = new controllerHelpers();
