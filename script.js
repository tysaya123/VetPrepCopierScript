// ==UserScript==
// @name         VetPrep Copier
// @namespace    http://tampermonkey.net/
// @version      2025-04-24
// @description  Add buttons to copy questions and answer from the vetprep website
// @author       You
// @match        https://www.vetprep.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vetprep.com
// @grant        none
// ==/UserScript==

setTimeout(main, 500);

function main() {
    'use strict';

    const questions = document.getElementById('question').querySelectorAll('span')[0].innerHTML.replace(/\<.*?\>/g, '')

    let answersStr = ""
    const answers = document.getElementsByClassName('answer-list')[0].querySelectorAll('li')
    answers.forEach((answer) => {answersStr += `\n * ${answer.innerText.replace(" Correct Answer","")}`})


    let correctAnswer = document.getElementsByClassName('correct')[0].innerText.replace(" Correct Answer","")
    let explanation = document.getElementsByClassName('well')[0].getElementsByTagName('p')[0].innerHTML


    addCopyBtn("Question!", questions + answersStr)
    addCopyBtn("Answer!", correctAnswer + "\n" + explanation)
}

function addCopyBtn(label, copyStr) {
    let btn = document.createElement("BUTTON");
    btn.innerHTML = '<a id="myButton" type="button">'+ label

    const computedStyle = document.defaultView.getComputedStyle(document.getElementsByClassName("btn btn-default")[0], "")
    Array.from(computedStyle).forEach(key => btn.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
    btn.style.setProperty("margin-left", "20px")

    btn.onclick = () => {
        navigator.clipboard.writeText(copyStr)
    };

    let div = document.getElementById("btn-next").parentNode
    div.appendChild(btn)
}
