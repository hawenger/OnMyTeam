const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { fetchAsyncQuestionPropertyQuestionProperty } = require("inquirer/lib/utils/utils");
const { ifStatement } = require("@babel/types");

const createdEmployees = [];
let createdManagers = [];
let createdInterns = [];
let createdEngineers = [];
//function to generate employee
//ask what employee wants to enter
//function for additonal qs(manager, intern, engineer)


//function to generate manager
//ask what type of employee want to create
//function to handle intern and engineer
//building html rendering function file build words
//inquirer.prompt().then;

//RUN APPLICATION

function run() {
    createEmployee();
};

//TYPE OF EMPLOYEE TO CREATE PROMPT

function createEmployee() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'Select employee role:',
            choices: [
                { name: 'Intern' },
                { name: 'Engineer' },
                { name: 'Manager' }
            ]
        }]).then(answers => {
            if (answers.type == 'Intern') {
                createIntern();
            }
            if (answers.type == 'Engineer') {
                createEngineer();
            }
            if (answers.type == 'Manager') {
                createManager();
            }
        })
};

//ADD ANOTHER EMPLOYEE PROMPT
function nextEmployee() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'next',
            message: 'Add another employee?',
            choices: [
                { name: 'YES' },
                { name: 'NO' },
            ]
        }])
        .then(answers => {
            if (answers.next == 'YES') {
                createEmployee();
            }
            if (answers.next == 'NO') {
                console.log('FIN');
                console.log(createdManagers);
                console.log(createdEngineers);
                console.log(createdInterns);
            }
        })
}

//CREATE SPECIFIC EMPLOYEE TYPE

function createEngineer() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'username',
                message: 'GITHUB USERNAME'
            }
        ])
        .then(answers => {
            let newEngineer = answers;
            createdEngineers.push(newEngineer);
            nextEmployee();
        });
};

function createIntern() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'school',
                message: 'SCHOOL NAME'
            }
        ])
        .then(answers => {
            let newIntern = answers;
            createdInterns.push(newIntern);
            nextEmployee();
        });

};

function createManager() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'OFFICE NUMBER'
            }
        ])
        .then(answers => {
            let newManager = answers;
            createdManagers.push(newManager);
            nextEmployee();
        });
};



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

run();