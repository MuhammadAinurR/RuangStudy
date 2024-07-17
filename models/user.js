'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      User.hasOne(models.UserProfile)
      User.belongsToMany(models.Course, { through: models.UserCourse });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'public'
        user.password = bcrypt.hashSync(user.password, salt)
      },
      afterCreate: (user, options) => {
        sequelize.models.UserProfile.create({UserId: user.id, createdAt: new Date(), updatedAt: new Date()})
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};

