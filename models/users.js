module.exports = (sequelize,DataTypes) => {
    var Users = sequelize.define("Users", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING
    });

    return Users;
};