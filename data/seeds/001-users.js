const faker = require("faker");

function makeFake() {
  const fakeData = [];
  for (let i = 0; i < 3; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const imageSource = faker.image.avatar();
    fakeData.push({ name, email, imageSource });
  }
  return fakeData;
}
const data = makeFake();

exports.seed = function(knex, Promise) {
  return knex("users").insert([...data]);
};
