'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const { DataTypes } = Sequelize;

    await queryInterface.createTable('origins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dimension: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      },
    });

    await queryInterface.createTable('characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OriginId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },      
      created: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      },
    });

    await queryInterface.addConstraint('characters', {
      fields: ['OriginId'],
      type: 'foreign key',
      name: 'character_origin_id',
      references: {
        table: 'origins',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.removeConstraint('characters', 'character_origin_id');
    await queryInterface.dropTable('characters');
    await queryInterface.dropTable('origin');
  }
};
