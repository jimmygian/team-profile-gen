const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const helper = require("./src/helper.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { managerQs, internQs, engineerQs } = require("./src/questions.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// // TEST //
// const emp1 = new Manager("Nick Harvard", 123, "nharv@grmail.com", 1);
// const emp2 = new Engineer("Dim Gian", 333, "dg92@gmail.com", "jimmygian");
// const emp3 = new Engineer("Nick MIT", 444, "nharv@grmail.com", "nickmit22");
// const emp4 = new Intern("Jack Stanford", 534, "nharv@grmail.com", "Harvard");

// console.log(emp1, emp1.getRole())
// console.log(emp2, emp2.getRole())
// console.log(emp3, emp3.getRole())
// console.log(emp4, emp4.getRole())
// // --- //
  
  // ** FUNCTIONS **

// function to initialize program
function makeManager() {
inquirer
    .prompt(engineerQs)
    .then((answers) => {
    console.log(answers);
    })
    .catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error(error);
    } else {
        // Something else went wrong
        console.error(error);
    }
    });
}

makeManager();