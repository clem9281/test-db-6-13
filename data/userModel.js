const db = require("./dbConfig");

const find = () => {
  return db("users");
};

const findBy = filter => {
  return db("users").where(filter);
};

const addUser = user => {
  return db("users").insert(user);
};

const deleteUser = filter => {
  return db("users")
    .where(filter)
    .del();
};
const updateUser = (filter, user) => {
  return db("users")
    .where(filter)
    .update(user);
};

module.exports = {
  find,
  addUser,
  findBy,
  deleteUser,
  updateUser
};
