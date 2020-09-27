const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);

const employees = [];

//GENERATE TEAM.html

function generateMyTeam() {
    const teamHTML = render(employees);
    writeFileAsync(outputPath, teamHTML);
    console.log("See your team output/team.html!")
}
//FUNCTION TO BEGIN APPLICATION

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
                console.log(employees);
            }

        })
        .then(function() {
            generateMyTeam();
        })
        .catch(function(error) {
            console.log(error);
        });
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
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            employees.push(newEngineer);
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
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(newIntern);
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
            const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employees.push(newManager);
            nextEmployee();
        });
};

//RUN APP

run();