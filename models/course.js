'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.belongsToMany(models.User, { through: models.UserCourse });
    }
  }
  Course.init({
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Select Course Category!'
        },
        notEmpty: {
          msg: 'Please Select Course Category!'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course Title is Required!'
        },
        notEmpty: {
          msg: 'Course Title is Required!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course Description is Required!'
        },
        notEmpty: {
          msg: 'Course Description is Required!'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image Url is Required!'
        },
        notEmpty: {
          msg: 'Image Url is Required!'
        },
        isUrl: {
          msg: 'Only Input Image Url!'
        }
      }
    },
    jumlahModul: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Jumlah Modul is Required!'
        },
        notEmpty: {
          msg: 'Jumlah Modul is Required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};