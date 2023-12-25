const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { managerQs, internQs, engineerQs } = require("./src/questions.js");
const { resolveNaptr } = require("dns");


async function init() {
    const team = await getTeam();
    console.log(team);

    // Create array to store Employee instances
    const empArr = [];

    // Add Manager to array
    const manager = new Manager(team.manager.name, team.manager.id, team.manager.email, team.manager.officeNum);
    empArr.push(manager);
    
    // Add Engineers to array
    const engineers = team.engineers;
    if (engineers.length !== 0) {
        engineers.forEach(engineer => {
            const eng = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
            empArr.push(eng);
        });
    }

    // Add Interns to array
    const interns = team.interns;
    if (interns.length !== 0) {
        interns.forEach(intern => {
            const intr = new Intern(intern.name, intern.id, intern.email, intern.school);
            empArr.push(intr);
        });
    }
    
    // Render page
    const page = render(empArr);
    // console.log(page);

    // Generate output folder + team.html
    generateHtml(page);
}
init();



  // ** FUNCTIONS ** //

async function getTeam() {
    // Get Manager
    const manager = await makeEmployee(managerQs);

    // Initialize Eng / Int arrays
    const engineers = [];
    const interns = [];
    let continueLoop = true; // Control variable for the loop

    while (continueLoop) {
        // Ask for next Choice
        const choice = await nextChoice();
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
    return { manager: manager, engineers: engineers, interns: interns};
}


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

function generateHtml(page) {
    // Check if OUTPUT_DIR exists
    fs.stat(OUTPUT_DIR, (err, stats) => {
        if (err) {
            // Directory does not exist
            fs.mkdir(OUTPUT_DIR, { recursive: true }, (mkdirErr) => {
                if (mkdirErr) {
                    console.error("Error creating directory:", mkdirErr);
                } else {
                    // Write file after creating directory
                    const filePath = path.join(OUTPUT_DIR, "team.html");
                    fs.writeFile(filePath, page, (writeErr) => {
                        if (writeErr) {
                            console.error("Error writing file:", writeErr);
                        } else {
                            console.log("File written successfully.");
                        }
                    });
                }
            });
        } else {
            // Directory exists
            const filePath = path.join(OUTPUT_DIR, "team.html");
            fs.writeFile(filePath, page, (writeErr) => {
                if (writeErr) {
                    console.error("Error writing file:", writeErr);
                } else {
                    console.log("File written successfully.");
                }
            });
        }
    });
}