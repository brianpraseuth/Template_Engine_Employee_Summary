const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function startApp() {
    console.log("Welcome! Please answer prompts to build your Employee roster.");
    console.log("Please enter information about the engineering Manager.");
    inquirer.prompt([{
            type: "input",
            message: "What is the Manager's Name?: ",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is their ID number?: ",
            name: "managerID"
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is their office number?",
            name: "managerOffice"
        }
    ]).then(function (response) {
        let manager = new Manager(
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.managerOffice
        );
        teamMembers.push(manager);
        console.log("Now let's build the team!");
        chooseTeamMember();
    })
}

    function chooseTeamMember() {
    inquirer.prompt({
                type: "list",
                message: "Who would you like to add?",
                name: "employeeChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "I'm done adding employees"
                ]
            }).then(answer => {
                switch(answer.employeeChoice) {
                    case "Engineer":
                        EngineerQuestions();
                        break;
                    case "Intern":
                        internQuestions();
                        break;
                    case "I'm done adding employees":
                        buildTeam();
                        break;
                }
            })
        };
    function EngineerQuestions() {
        inquirer.prompt([{
                type: "input",
                message: "What is the Engineer's Name?: ",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is their ID?: ",
                name: "engineerID"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is their Github profile?",
                name: "engineerGithub"
            },

        ]).then(function (response) {
            let engineer = new Engineer(
                response.engineerName,
                response.engineerID,
                response.engineerEmail,
                response.engineerGithub
            );
            teamMembers.push(engineer);
            chooseTeamMember();
        })
    }

    function internQuestions() {
        inquirer.prompt([{
                type: "input",
                message: "What is the intern's Name?: ",
                name: "internName"
            },
            {
                type: "input",
                message: "What is their ID?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What school did they attend?",
                name: "internSchool"
            }
        ]).then(function (response) {
            let intern = new Intern(
                response.internName,
                response.internID,
                response.internEmail,
                response.internSchool
            );
            teamMembers.push(intern);
            chooseTeamMember();
        })
    }

    function buildTeam() {
        if(! fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers))
    }

    startApp();

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