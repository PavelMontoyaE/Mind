export default (sequelize, Sequelize) => {

  console.log(Sequelize.Datatypes);
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  console.log(Tutorial === sequelize.models.Tutorial);

  return Tutorial;
};