import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/db';

interface ClientAttributes {
  id: string;
  companyName: string;
  address?: string;
  phoneNumber?: string;
  industry: string;
  panNumber: string;
  creatorId: string; 
  email: string; 
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

const Client: ModelDefined<ClientAttributes, ClientCreationAttributes> = sequelize.define(
  'Client',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: 'clients',
    timestamps: true,
  }
);

export default Client;
