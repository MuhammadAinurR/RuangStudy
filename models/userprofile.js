'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    get formatDob(){
      if(this.dob){
        return this.dob.toISOString().split('T')[0];
      }else{
        return this.dob
      }
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    dob: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    pob: DataTypes.STRING,
    lastEducation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};