module.exports = (sequelize, DataTypes) => {
    var Events = sequelize.define("Events", {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateBegin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateEnd: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timeBegin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timeEnd: {
            type: DataTypes.STRING,
            allowNull: true
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Events;
};