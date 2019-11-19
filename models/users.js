module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    });

    return Users;
};