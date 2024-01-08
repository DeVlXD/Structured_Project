const mongoose = require("mongoose");
const Agenda = require("agenda");

//Agenda initialization.
let agenda;
agenda = new Agenda({
  mongo: mongoose.connection
});

module.exports.startCronJobs = async () => {
  console.log("Agenda Started");
  await agenda.start();
};
