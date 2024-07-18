'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);
global.XMLHttpRequest = require('xhr2');
const emailjs = require('emailjs-com')
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
        sequelize.models.UserProfile.create({UserId: user.id, createdAt: new Date(), updatedAt: new Date()});
        async function sendMail() {
          try {
              await emailjs.send(
                'service_ecqf1wi',
                'template_3ybytk8',
                  {
                      to_name: user.email,
                      to_email: user.email,
                      message: `Congratz your email [ ${user.email} ] has been registered on RangStudy. start your journey NOW!`
                  },
                  "vlpOkw-WxicMewCqJ", 
              );
              console.log('SUCCESS SENDING EMAIL CREATION!');
            } catch (err) {
              console.log('ERROR', err);
            }
      }
      sendMail()
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};

