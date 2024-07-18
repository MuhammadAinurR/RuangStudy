'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);
global.XMLHttpRequest = require('xhr2');
const emailjs = require('emailjs-com')
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here 
      User.hasOne(models.UserProfile)
      User.belongsToMany(models.Course, { through: models.UserCourse });
    }

    // static method for get the data
    static async getDashboard({ user }) {
      const userProfile = await User.findByPk(user.id, {
        include: {
          model: sequelize.models.UserProfile,
          attributes: ['name']
        },
        attributes: ['id', 'email']
      });
      const courseDetails = await User.findByPk(user.id, {
        include: {
          model: sequelize.models.Course
        },
        attributes: ['id']
      })
      return { userProfile, courseDetails }
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,20],
          msg: 'password should more than 7 characters'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['SuperUser', 'Public']],
          msg: 'role is not valid'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'Public'
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

