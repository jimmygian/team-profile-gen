const helper = require("./helper");
const inquirer = require("inquirer");

// array of questions for user
const employeeQs = [
    // NAME
    {
        type: 'input',
        name: 'name',
        message: "Manager's name?",
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
        name: 'ID',
        message: "Employee ID?",
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
      message: "What's your email?",
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
    },
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
    // // GITHUB USERNAME
    // {
    //     type: 'input',
    //     name: 'github_username',
    //     message: "What's your GitHub username?",
    //     validate(input) {
    //         if (helper.isGitHubUsername(input.trim())) {
    //         return true;
    //         }
    //         return "Please provide a correct github username."
    //     },
    // }
  ];

  const anotherArray = [0, "00"];

  module.exports = {
    employeeQs,
    anotherArray
};