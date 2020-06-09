/// DEPENDENCIES
const inquirer = require("inquirer");
const inquirerConfirmValidated = require("inquirer-confirm-validated");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/htmlRenderer");
/// NATIVE
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

/// FUNCTIONS 14-122 and 184-323 for DOT THEN PROMISE
const confirmString = async (input) => {
  if (
    input.includes("0") ||
    input.includes("1") ||
    input.includes("2") ||
    input.includes("3") ||
    input.includes("4") ||
    input.includes("5") ||
    input.includes("6") ||
    input.includes("7") ||
    input.includes("8") ||
    input.includes("9") ||
    input.trim("") === ""
  ) {
    return `Expected parameter to be a non-empty string`;
  } else {
    return true;
  }
};

const confirmNumber = async (input) => {
  input = parseInt(input);
  if (isNaN(input) || input < 0) {
    return `Expected parameter to be a number greater than zero`;
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

////// END TERMINAL PROMPT \\\\\\
function done() {
  return;
}

////////// SELECT PROMP BASED OFF ROLE \\\\\\\\\\\\
function setEmployees(role) {
  if (role === "Engineer") {
    engineer();
    return true;
  }
  if (role === "Intern") {
    intern();
    return true;
  }
  if (role === "I don't add anymore.") {
    render(employeeList);
    done();
  }
}

/// VARIABLES \\\
let managerList = [];
let engineerList = [];
let internList = [];
let employeeList = [...managerList, ...engineerList, ...internList];

//////////////////// DELETE \\\\\\\\\\\\\\\\\\\\\\\\
//////////// ONCE ASYNC CODE WORKS \\\\\\\\\\\\\\\\\\
////////////////// DOT PROMISE \\\\\\\\\\\\\\\\\\\\\\\
employees();
function employees() {
  const managerPrompt = inquirer
    .prompt([
      {
        type: "input",
        message: "What is the manager's name?",
        name: "name",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What is the manager's id",
        name: "id",
        validate: confirmNumber,
      },
      {
        type: "input",
        message: "What is the manager's email?",
        name: "email",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What is the manager's number?",
        name: "number",
        validate: confirmNumber,
      },
      {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    /////////// DOT THEN \\\\\\\\\\
    // inside function switch statement for 3 functions
    .then(function ({ name, id, email, number, role, gitHub, school }) {
      const manager = new Manager(name, id, email, number);
      employeeList.push(manager);
      setEmployees(role);
    })
    .catch(function (err) {
      return `Error!!`;
    });
}

////////////// INTER PROMPT \\\\\\\\\\\\\
function intern(name, id, email, role, school) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's your intern's name?",
        name: "name",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What's your intern's id",
        name: "id",
        validate: confirmNumber,
      },
      {
        type: "input",
        message: "What's your intern's email?",
        name: "email",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
        validate: confirmString,
      },
      {
        type: "list",
        message: "Add another member?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    .then((internObj) => {
      const intern = new Intern(
        internObj.name,
        internObj.id,
        internObj.email,
        internObj.role,
        internObj.school
      );
      employeeList.push(intern);
      setEmployees(internObj.role);
      console.log(intern);
    });
}

////////////// ENGINEER PROMPT \\\\\\\\\\\\\
function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's your engineer's name?",
        name: "name",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What's your engineer's id",
        name: "id",
        validate: confirmNumber,
      },
      {
        type: "input",
        message: "What's your engineer's email?",
        name: "email",
        validate: confirmString,
      },
      {
        type: "input",
        message: "What's your engineer's GitHub username?",
        name: "github",
        validate: confirmString,
      },
      {
        type: "list",
        message: "Add another member?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    .then((engineerObj) => {
      const engineer = new Engineer(
        engineerObj.name,
        engineerObj.id,
        engineerObj.email,
        engineerObj.role,
        engineerObj.gitHub
      );
      //   console.log(engineer);
      employeeList.push(engineer);
      setEmployees(engineerObj.role);
      console.log(engineer);
    });
}

////// BULK ASYNC CODE \\\\\\
async function EmployeeRegistration() {
  try {
    const employee = await inquirer.prompt([
      {
        name: "name",
        message: "What is the manager's name?",
        type: "input",
        validate: confirmString,
      },
      {
        name: "id",
        message: "What is the manager's id",
        type: "input",
        validate: confirmNumber,
      },
      {
        name: "email",
        message: "What is the manager's email?",
        type: "input",
        validate: confirmString,
      },
      {
        name: "number",
        message: "What is the manager's number?",
        type: "input",
        validate: confirmNumber,
      },
      {
        name: "role",
        message: "What type of team member are they?",
        type: "list",
        choices: ["Engineer", "Intern"],
        validate: confirmRole,
      },
    ]);

    //  SHOULD BE IN OR WITH A CONDITIONAL TO CALL ON OR THE OTHER
    // const engineer = await engineerPrompt();
    // const intern = await internPrompt();
    // const done = await done()
  } catch (err) {
    console.log(`${err} error??`);
  }
}
// EmployeeRegistration();
