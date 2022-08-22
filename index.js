// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateREADME = require("./utils/generatemarkdown.js");
const fs = require("fs");
// TODO: Create an array of questions for user input
const promptMain = () => {
  console.log(`
    ===========================
    Welcome to ReadMe Generator
    ===========================
    `);
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("You need to enter a project name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "description",
      message:
        "Provide a description of the project. (Required) ",
      validate: (descriptionInput) => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("You need to enter a project description!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github username (Required)",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("You need to enter a username!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address (Required)",
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log("You need to enter an email address");
          return false;
        }
      },
    },
    {
      type: "checkbox",
      name: "sections",
      message:
        "What sections would you like to include? (Check all that apply) \n",
      choices: [
        "Link to Deployed Site",
        "Installation Instructions",
        "Usage Information",
        "Contribution Guidelines",
        "Test Instructions",
        "Collaboration Credits",
      ],
    },
    {
        type: "list",
        name: "license",
        message:
          "Select a license for your repository",
        choices: [
          "MIT",
          "GNU - GPLv3",
          "No-License"
        ],
        default: 0
      }
  ]);
};
const promptSectionContent = (READMEdata) => {
  READMEdata.sectionContent = [];
  let sectionArr = [];
  for (let i = 0; i < READMEdata.sections.length; i++) {
    let sectionObj = {
      type: "input",
      name: READMEdata.sections[i],
      message: "Add the " + READMEdata.sections[i] + " below: \n",
      validate: (input) => {
        return input ? true : console.log("Please enter the info!");
      },
    };
    sectionArr.push(sectionObj);
  }
  return inquirer.prompt(sectionArr).then((sectionContentData) => {
    READMEdata.sectionContent.push(sectionContentData);
    return READMEdata;
  });
};
// TODO: Create a function to write README file
const writeToFile = (MDstring) => {
    fs.writeFile("./dist/README.md", MDstring, err => err? console.log(err): console.log("README.md file created in 'dist' directory"))
}

// Function call to initialize app
promptMain()
  .then(promptSectionContent)
  .then((READMEdata) => {
    return generateREADME(READMEdata);
  })
  .then(MDstring => {
    writeToFile(MDstring);
  });