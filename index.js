const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// TEST //
const emp1 = new Manager("Nick Harvard", "nharv@grmail.com", 1);
const emp2 = new Engineer("Dim Gian", "dg92@gmail.com", "jimmygian");
const emp3 = new Engineer("Nick MIT", "nharv@grmail.com", "nickmit22");
const emp4 = new Intern("Jack Stanford", "nharv@grmail.com", "Harvard");

console.log(emp1, emp1.getRole())
console.log(emp2, emp2.getRole())
console.log(emp3, emp3.getRole())
console.log(emp4, emp4.getRole())
// --- //