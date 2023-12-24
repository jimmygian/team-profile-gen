const Employee = require("../lib/Employee");
const helper = require("./helper");
const inquirer = require("inquirer");

// array of questions for user
const generateBasicQs = (type) => { 
    const Qs = [
    // NAME
    {
        type: 'input',
        name: 'name',
        message: `${type}'s Name:`,
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();
    
            if (trimmedInput !== '') {
            return true;
            }
            return "Please provide a name.";
        }
    },
    // ID
    {
        type: 'input',
        name: 'id',
        message: `${type}'s ID:`,
        default() {
            Employee.employeeID++;
            return `${Employee.employeeID}`;
        },
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();
    
            if (trimmedInput !== '' && Number.isInteger(Number(trimmedInput))) {
            return true;
            }
            return "Please provide a numerical ID (of type: Integer).";
        }
    },
    // EMAIL
    {
      type: 'input',
      name: 'email',
      message: `${type}'s Email:`,
      validate(input) {
        const trimmedInput = input.trim();
  
        if (trimmedInput === '') {
          // If the trimmed input is empty, allow the user to proceed
          return true;
        } else if (helper.isValidEmail(trimmedInput)) {
          return true;
        }
        return "Please provide a correct email or leave it blank.";
      }
    }
  ];

  return Qs;
}


const managerBasicQs = generateBasicQs("Manager");
const managerQs = [...managerBasicQs, 
    // Office Number
    {
        type: 'input',
        name: 'officeNum',
        message: "Office Number?",
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();
    
            if (trimmedInput !== '' && Number.isInteger(Number(trimmedInput))) {
            return true;
            }
            return "Please provide a numerical value (of type: Integer).";
        }
    },
];


const engineerBasicQs = generateBasicQs("Engineer");
const engineerQs = [...engineerBasicQs,
    // GITHUB USERNAME
    {
        type: 'input',
        name: 'github_username',
        message: "What's your GitHub username?",
        validate(input) {
            if (helper.isGitHubUsername(input.trim())) {
            return true;
            }
            return "Please provide a correct github username."
        },
    }
];

const internBasicQs = generateBasicQs("Intern");
const internQs = [...internBasicQs,
    // NAME
    {
        type: 'input',
        name: 'school',
        message: "Intern's school?",
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();
    
            if (trimmedInput !== '') {
            return true;
            }
            return "Please provide a correct value.";
        }
    }
];


  module.exports = {
    managerQs,
    engineerQs,
    internQs
};