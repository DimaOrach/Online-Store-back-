const sequelize = require('../database');
const {DataTypes} = require('sequelize');

class Models {
    constructor(sequelize, DataTypes) {
        this.User = sequelize.define( 'user', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            email: {type: DataTypes.STRING, unique: true},
            password: {type: DataTypes.STRING},
            role: {type: DataTypes.STRING, defaultValue: 'USER'},
        })
        
        this.Basket = sequelize.define( 'basket', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        })
        
        this.BasketDevice = sequelize.define( 'basket_device', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        })
        
        this.Device = sequelize.define('device', {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING, unique: true, allowNull: false},
            price: {type: DataTypes.INTEGER, allowNull: false},
            rating: {type: DataTypes.INTEGER, defaultValue: 0},
            img: {type: DataTypes.STRING, allowNull: false},
        })
        
        this.Type = sequelize.define( 'type', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            name: {type: DataTypes.STRING, unique: true, allowNull: false},
        })
        
        this.Brand = sequelize.define( 'brand', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            name: {type: DataTypes.STRING, unique: true, allowNull: false},
        })
        
        this.Rating = sequelize.define( 'rating', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            rate: {type: DataTypes.STRING, allowNull: false, },
        })
        
        this.DeviceInfo = sequelize.define( 'device_info', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            rate: {type: DataTypes.STRING, allowNull: false},
            description: {type: DataTypes.STRING, allowNull: false},
        })
        
        this.TypeBrand = sequelize.define( 'type_brand', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        })
        
        this.User.hasOne(this.Basket);
        this.Basket.belongsTo(this.User);
        
        this.User.hasMany(this.Rating);
        this.Rating.belongsTo(this.User);
        
        this.Basket.hasMany(this.BasketDevice);
        this.BasketDevice.belongsTo(this.Basket);
        
        this.Type.hasMany(this.Device);
        this.Device.belongsTo(this.Type);
        
        this.Brand.hasMany(this.Device);
        this.Device.belongsTo(this.Brand);
        
        this.Device.hasMany(this.Rating);
        this.Rating.belongsTo(this.Device);
        
        this.Device.hasMany(this.BasketDevice);
        this.BasketDevice.belongsTo(this.Device);
        
        this.Device.hasMany(this.DeviceInfo, {as: 'info'});
        this.DeviceInfo.belongsTo(this.Device);
        
        this.Type.belongsToMany(this.Brand, {through: this.TypeBrand});
        this.Brand.belongsToMany(this.Type, {through: this.TypeBrand});
    }
}



module.exports = Models;
