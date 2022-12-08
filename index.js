const axios = require("axios")
const fs = require("fs")
var removeNewline = require('newline-remove');
const pug = require("pug")
const format = require('html-format');
const shell = require("shelljs")


async function yes(){
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git, please install git!');
        shell.exit(1);
      }
    
    
    const response = await axios.get("https://api.aideas.dev/get")
    const array = response.data


    const newarray = removeNewline(array)

    
    

        const buildstring = 'p AIdeas 💡 - AI generated startup ideas!\n'+
        'div.carousel\n'+
        '  div.carousel__body\n'+
        '    div.carousel__prev\n'+
        '      i.far.fa-angle-left\n'+
        '    div.carousel__next\n'+
        '      i.far.fa-angle-right\n'+
        '    div.carousel__slider\n'+
        `     - items = [${newarray}];\n`+
        '      each val1, index in items\n'+
        '        div.carousel__slider__item\n'+
        '          div.item__3d-frame\n'+
        '              div.item__3d-frame__box.item__3d-frame__box--front\n'+
        '                h1=val1\n'+
        '              div.item__3d-frame__box.item__3d-frame__box--left\n'+
        '              div.item__3d-frame__box.item__3d-frame__box--right   \n'+
        '';
    
    fs.writeFileSync("./index.pug", buildstring)



    var html = pug.renderFile("index.pug")
    const newfinal = `<!DOCTYPE html> <html lang="en" > <head> <meta charset="UTF-8"> <title>AIdeas</title> <link rel='stylesheet' href='https://static.fontawesome.com/css/fontawesome-app.css'> <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.9.0/css/all.css'> <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Space+Mono&amp;display=swap'><link rel="stylesheet" href="./style.css"><link rel="icon" href="favicon.svg" type="image/x-icon" /></head><body>`+ html + `<script src="./script.js"></script></body> <footer>Made by Joabutt.dev</footer></html>`
    const finalfinal = format(newfinal, ' '.repeat(4))
    fs.writeFileSync("./dist/index.html", finalfinal)
    console.log("Successfully Written! See index.html for the compiled file!");


    shell.cd("dist")
    if (shell.exec('git add -A').code !== 0) {
        shell.echo('Error: Git add failed');
        shell.exit(1);
      }

    if (shell.exec('git commit -am "Updated Ideas"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
    if (shell.exec('git push').code !== 0) {
        shell.echo('Error: Git push failed');
        shell.exit(1);
      }

      shell.cd("../")
}

yes()
