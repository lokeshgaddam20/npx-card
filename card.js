#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:gaddamlokesh20@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://drive.google.com/uc?export=download&id=1X31D6vqkItXjeASreDH3HVOL4dA6iexz').pipe(fs.createWriteStream('./lokesh-resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'lokesh-resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://calendly.com/gaddamlokesh/1-hour-meet');
                    console.log("\n See you at the meeting \n");
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("BuhByee.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("                    Lokesh Gaddam"),
    handle: chalk.white("@lokesh_g"),
    academics: `${chalk.white("Bacherlors in Computer Science,")} ${chalk
        .hex("#2b82b2")
        .bold("CVRCOE")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("LokeshGaddam20"),
    github: chalk.gray("https://github.com/") + chalk.green("lokeshgaddam20"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("gaddamlokesh"),
    npx: chalk.red("npx") + " " + chalk.white("lokesh"),

    labelAcademics: chalk.white.bold("  Academics:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelAcademics}  ${data.academics}`,
        ``,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities."
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a question")}`,
        `${chalk.italic(
            "or just want to say hi, Just drop me a mail."
        )}`,
        `${chalk.italic(
            "I'll get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green",
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());