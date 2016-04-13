
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(t){
    t.increments();
    t.string('bowler_name');
    t.string('gameTotal')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
