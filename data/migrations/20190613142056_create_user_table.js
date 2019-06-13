exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .notNullable()
      .unique();

    tbl
      .string("email")
      .notNullable()
      .unique();

    tbl.string("imageSource").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
