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
async function runSequentially() {
    // GET MANAGER
    const manager = await makeEmployee(managerQs);

    // Initialize Eng / Int arrays
    const engineers = [];
    const interns = [];
    let continueLoop = true; // Control variable for the loop

    while (continueLoop) {
        // Ask for next Choice
        const choice = await nextChoice();
        console.log("choice:", choice);
        switch (choice) {
            case 1:
                const engineer = await makeEmployee(engineerQs);
                engineers.push(engineer);
                break;
            case 2:
                const intern = await makeEmployee(internQs);
                interns.push(intern);
                break;
            default:
                continueLoop = false;
        }
    }
    
    console.log(manager);
    console.log(engineers);
    console.log(interns);
}

// Call the function to start the sequential execution
runSequentially();



  // ** FUNCTIONS **

// function to initialize program
async function makeEmployee(questions) {
    try {
        const answers = await inquirer.prompt(questions);
        return answers;
    } catch (error) {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    }
}


async function nextChoice() {
    const choices = [
        "Add an engineer",
        "Add an intern",
        "Finish building the team"
    ];

    const question = {             
        type: 'list',
        name: 'licence',
        message: "Prefered licence type?",
        choices: [...choices],
    };

    try {
        const answer = await inquirer.prompt(question);
        console.log("choice answer:", answer);
        switch (answer.licence) {
            case "Add an engineer":
                return 1;
            case "Add an intern":
                return 2;
            case "Finish building the team":
                return 3;
            default:
                return null; // Or some other default value if needed
        }
    } catch (error) {
        if (error.isTtyError) {
            console.error(error);
        } else {
            console.error(error);
        }
    }
}
