import sequelize, { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';
import { type } from 'os';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return [this.fname, this.lname].join(' ');
  }
}

Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    modelName: 'humans',
    sequelize: db,
  }
)

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    species: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    modelName: 'animals',
    sequelize: db,
  }
)

Human.hasMany(Animal, { foreignKey: 'animalId' });
Animal.belongsTo(Human, { foreignKey: 'humanId' });

export default db;
