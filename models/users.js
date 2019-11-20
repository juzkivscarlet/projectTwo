var bcrypt = require('bcryptjs');

module.exports = (sequelize,DataTypes) => {
    var Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    Users.addHook("beforeCreate", (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return Users;
};