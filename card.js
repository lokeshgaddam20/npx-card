#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}`,
        value: () => {
          open("mailto:gaddamlokesh20@gmail.com");
          console.log("\nDone, see you soon in your inbox!\n");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}`,
        value: () => {
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();

          const directDownloadUrl =
            "https://github.com/lokeshgaddam20/lokeshgaddam20/releases/download/Resume/Lokesh_Gaddam_Resume.pdf";

          let pipe = request(directDownloadUrl).pipe(
            fs.createWriteStream("./lokesh-resume.pdf")
          );
          pipe.on("finish", function () {
            let downloadPath = path.join(process.cwd(), "lokesh-resume.pdf");
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath);
            loader.stop();
          });

          pipe.on("error", function (err) {
            console.log(`\nFailed to download resume: ${err.message}\n`);
            loader.stop();
          });
        },
      },
      {
        name: `View my ${chalk.yellow.bold("Portfolio")}`,
        value: () => {
          open("https://lokesh-g.vercel.app");
          console.log("\nOpening portfolio website...\n");
        },
      },
      {
        name: `Schedule a ${chalk.redBright.bold("Meeting")}`,
        value: () => {
          open("https://calendly.com/gaddamlokesh/1-hour-meet");
          console.log("\nLooking forward to our meeting!\n");
        },
      },
      {
        name: "Exit",
        value: () => {
          console.log("\nThanks for stopping by! Have a great day!\n");
        },
      },
    ],
  },
];

// Define color themes
const colors = {
  primary: '#4a90e2',
  secondary: '#00ff00',
  accent: '#6cc644',
  link: '#0077b5',
  text: '#ffffff'
};

const data = {
  name: chalk.bold.hex(colors.secondary)("Lokesh Gaddam"),
  title: chalk.hex('#e6e6e6')("Full Stack Developer"),
  academics: `${chalk.white("Bachelor's in Computer Science,")} ${chalk
    .hex("#2b82b2")
    .bold("CVRCOE")}`,
  portfolio: chalk.gray("https://") + chalk.hex(colors.primary)("lokesh-g.vercel.app"),
  twitter: chalk.gray("https://twitter.com/") + chalk.hex('#1DA1F2')("LokeshGaddam20"),
  github: chalk.gray("https://github.com/") + chalk.hex(colors.accent)("lokeshgaddam20"),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.hex(colors.link)("gaddamlokesh"),
  npx: chalk.hex(colors.primary)("npx") + " " + chalk.white("lokeshgaddam20"),

  labelPortfolio: chalk.white.bold("Portfolio:"),
  labelAcademics: chalk.white.bold("Education:"),
  labelGitHub: chalk.white.bold("GitHub:"),
  labelTwitter: chalk.white.bold("Twitter:"),
  labelLinkedIn: chalk.white.bold("LinkedIn:"),
  labelNPX: chalk.white.bold("Card:"),
};

// // Create a horizontal card layout
// const header = `
// ${chalk.hex(colors.primary).bold("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓")}`;

// const footer = `
// ${chalk.hex(colors.primary).bold("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛")}`;

// Main card content
const me = boxen(
  [
    `${chalk.bold.hex(colors.secondary)("                             " + data.name + "                             ")}`,
    `${chalk.hex('#e6e6e6')("                            " + data.title + "                            ")}`,
    ``,
    `${data.labelAcademics}  ${data.academics}`,
    ``,
    `${data.labelPortfolio}  ${data.portfolio}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelNPX}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently looking for new opportunities.")}`,
    `${chalk.italic("My inbox is always open. Whether you have a question or just want to say hi,")}`,
    `${chalk.italic("drop me a mail and I'll get back to you!")}`,
  ].join("\n"),
  {
    margin: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: colors.primary,
    float: "center",
    // Removed the problematic backgroundColor property
  }
);

// console.log(header);
console.log(me);
// console.log(footer);

const tip = [
  `${chalk.hex(colors.accent)("Pro Tip:")} Try ${chalk.bold("cmd/ctrl + click")} on the links above to open them directly`,
  "",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());