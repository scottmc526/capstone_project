
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(t){
    t.increments();
    t.string('bowler_name');
    t.string('frame[0]');
    t.string('secondBall');
    t.string('frame');
    t.string('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
