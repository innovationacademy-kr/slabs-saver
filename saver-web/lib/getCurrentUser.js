const { Author } = require('../models');

module.exports = async (id) => {
  const user = await Author.findOne({
    where: { id },
  });
  return user;
};
