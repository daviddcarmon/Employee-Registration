/// DEPENDENCIES
const inquirer = require("inquirer");
const inquirerConfirmValidated = require("inquirer-confirm-validated");
const employeeOp = require("./lib/Employee");
const engineerOp = require("./lib/Engineer");
const internOp = require("./lib/Inter");
const managerOp = require("./lib/Manager");
/// NATIVE
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);

/// FUNCTIONS 14-122 and 184-323 for DOT THEN PROMISE
const confirmString = async (input) => {
  if (typeof input !== "string" || input.trim("") === "") {
    return `Expected parameter to be a non-empty string`;
  } else {
    return true;
  }
};

const confirmNumber = async (input) => {
  if (typeof input !== "number" || input > 0) {
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

////////////// ENGINEER PROMPT \\\\\\\\\\\\\
function engineerPrompt() {
  inquirer.prompt([
    {
      name: "name",
      message: "What's your engineer's name?",
      type: "input",
      // validate: confirmString,
    },
    {
      name: "id",
      message: "What's your engineer's id",
      type: "input",
      // validate: confirmNumber,
    },
    {
      name: "email",
      message: "What's your engineer's email?",
      type: "input",
      // validate: confirmString,
    },
    {
      name: "github",
      message: "What's your engineer's GitHub username?",
      type: "input",
      // validate: confirmString,
    },
  ]);
}

////////////// INTER PROMPT \\\\\\\\\\\\\
function internPrompt() {
  inquirer.prompt([
    {
      name: "name",
      message: "What's your intern's name?",
      type: "input",
      // validate: confirmString,
    },
    {
      name: "id",
      message: "What's your intern's id",
      type: "input",
      // validate: confirmNumber,
    },
    {
      name: "email",
      message: "What's your intern's email?",
      type: "input",
      // validate: confirmString,
    },
    {
      name: "school",
      message: "What is your intern's school?",
      type: "input",
      // validate: confirmString,
    },
  ]);
}

////// END TERMINAL PROMPT \\\\\\
function done() {
  return;
}

//////////////////// DELETE \\\\\\\\\\\\\\\\\\\\\\\\
////////// select prompt based of answer \\\\\\\\\\\\
function setEmployees(answer) {
  if (answer.role === "Engineer") {
    engineer(answer.name, answer.id, answer.email, answer.role, answer.gitHub);
    return true;
  }
  if (answer.role === "Intern") {
    intern(answer.name, answer.id, answer.email, answer.role, answer.school);
    return true;
  }
  if (answer.role === "I don't add anymore.") {
    writeFileAsync("index.html", employeeList).then(function () {
      console.log(`Your Employee list was generated!`);
    });
    done();
  }
}

////// BULK CODE \\\\\\
async function EmployeeRegistration() {
  try {
    const employee = await inquirer.prompt([
      {
        name: "name",
        message: "What is the manager's name?",
        type: "input",
        // validate: confirmString,
        // validate: (input) => {
        //   if (input.trim("") !== "string" || input.trim("") === "") {
        //   return `Expected parameter to be a non-empty string`;
        //   }
        //   return true;
        // },
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

/// VARIABLES \\\
let managerList = [];
let engineerList = [];
let internList = [];
let employeeList = [...managerList, ...engineerList, ...internList];

////////////// DOT PROMISE \\\\\\\\\\\\\\
employees();
function employees() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the manager's id",
        name: "id",
      },
      {
        type: "input",
        message: "What is the manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the manager's number?",
        name: "number",
      },
      {
        type: "list",
        message: "What type of team member are they?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    /////////// DOT THEN \\\\\\\\\\
    // inside function switch statement for 3 functions
    .then(function (answer) {
      setEmployees(answer);
    })
    // .then(function (answer) {
    //   if (answer.role === "Engineer") {
    //     engineer(
    //       answer.name,
    //       answer.id,
    //       answer.email,
    //       answer.role,
    //       answer.gitHub
    //     );
    //     return true;
    //   }
    //   if (answer.role === "Intern") {
    //     intern(
    //       answer.name,
    //       answer.id,
    //       answer.email,
    //       answer.role,
    //       answer.school
    //     );
    //     return true;
    //   }
    //   if (answer.role === "I don't add anymore.") {
    //     writeFileAsync("index.html", employeeList).then(function () {
    //       console.log(`Your Employee list was generated!`);
    //     });
    //     done();
    //   }
    // })
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
      {
        type: "list",
        message: "Add another member?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    .then((interObj) => {
      const intern = new Intern(name, id, email, role, internObj.school);
    });
}

////////////// ENGINEER PROMPT \\\\\\\\\\\\\
function engineer(name, id, email, role, gitHub) {
  inquirer
    .prompt([
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
      {
        type: "list",
        message: "Add another member?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't add anymore."],
      },
    ])
    .then((engineerObj) => {
      const engineer = new Engineer(name, id, email, role, engineerObj.gitHub);
      console.log(engineer);
    });
}
