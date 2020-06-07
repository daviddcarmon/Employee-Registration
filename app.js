/// DEPENDENCIES
const inquirer = require("inquirer");
const inquirerConfirmValidated = require("inquirer-confirm-validated");
/// NATIVE
const util = require("util");
const fs = require("fs");

/// VARIABLES
let employeeList = [];
let managerList = [];
let engineerList = [];
let internList = [];

/// FUNCTIONS
const confirmString = async (input) => {
  if (typeof input !== "string" || input.trim("") === "") {
    return "Expected parameter to be a non-empty string";
  } else {
    return true;
  }
};

const confirmNumber = async (input) => {
  if (typeof input !== "number" || input > 0) {
    return "Expected parameter to be a number greater than zero";
  } else {
    return true;
  }
};

const confirmRole = async (answer) => {
  if (answer.role === "Engineer") {
    engineerPrompt();
  }
  if (answer.role === "Intern") {
    internPrompt();
  }
};

function engineerPrompt() {
  inquirer.prompt([
    {
      type: "input",
      message: "What's your engineer's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What's your engineer's id",
      name: "id",
    },
    {
      type: "input",
      message: "What's your engineer's email?",
      name: "email",
    },
    {
      type: "input",
      message: "What's your engineer's GitHub username?",
      name: "github",
    },
  ]);
}

function internPrompt() {
  inquirer.prompt([
    {
      type: "input",
      message: "What's your intern's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What's your intern's id",
      name: "id",
    },
    {
      type: "input",
      message: "What's your intern's email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your intern's school?",
      name: "school",
    },
  ]);
}

/// BULK CODE
async function EmployeeRegistration() {
  try {
    const employee = await inquirer.prompt([
      {
        name: "name",
        message: "What is the manager's name?",
        type: "input",
        // validate: confirmString,
      },
      {
        name: "id",
        message: "What is the manager's id",
        type: "input",
        // validate: confirmNumber,
      },
      {
        name: "email",
        message: "What is the manager's email?",
        type: "input",
        // validate: confirmString,
      },
      {
        name: "number",
        message: "What is the manager's number?",
        type: "input",
        // validate: confirmNumber,
      },
      {
        name: "role",
        message: "What type of team member are they?",
        type: "list",
        choices: ["Engineer", "Intern"],
        // validate: confirmRole,
      },
    ]);

    // const engineer =
  } catch (err) {
    console.log(`${err} error??`);
  }
}
EmployeeRegistration();
