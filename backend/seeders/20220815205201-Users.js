"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          name: "Admin",
          email: "admin@gmail.com",
          role: 1,
          date: "2020-08-15T20:52:01.000Z",
        },

        {
          id: 2,
          name: "Adam Ahmad",
          email: "asd2@gmail.com",
          role: 2,
          date: "2020-08-15T20:52:01.000Z",
        },

        {
          id: 3,
          name: "Ahmed Ali",
          email: "asd3@gmail.com",
          role: 2,
          date: "2020-08-15T20:52:01.000Z",
        },

        {
          id: 4,
          name: "Ali Ahmed",
          email: "asd4@gmail.com",
          role: 3,
          date: "2020-08-15T20:52:01.000Z",
        },

        {
          id: 5,
          name: "Rozana Ahmed",
          email: "asd5@gmail.com",
          role: 2,
          date: "2020-08-15T20:52:01.000Z",
        },

        {
          id: 6,
          name: "Victoria Ahmad",
          email: "asd6@gmail.com",
          role: 2,
          date: "2020-08-15T20:52:01.000Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
