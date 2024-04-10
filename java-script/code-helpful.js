let frameHeight;
let frameWidth;
let photoHeight;
let photoWidth;
let matButton;
let answer;
let typeButton;
let dropDown;
let choosenType;
let openSaveButton;
let saveSetUP;
let saveButton;
let saveNameBox;
let getSavesButton;
let example1
let example2
let exampleButton

let hasSaves = false;
let saveShown = false;
let examplesShown = false;

let saves = []


let dimensions = {
    "matWidth": "blank",
    "matHeight": "blank",
    "photoWidth": "blank",
    "photoHeight": "blank",
    "borderWidth": "blank",
    "borderHeight": "blank",
    "windowWidth": "blank",
    "windowHeight": "blank"
}

let type

function getHTMLElements(){
    frameHeight = document.querySelector('#frameHeight')
    frameWidth = document.querySelector('#frameWidth')
    photoHeight = document.querySelector('#photoHeight')
    photoWidth = document.querySelector('#photoWidth')
    matButton = document.querySelector('#button')
    typeButton = document.querySelector('#choose')
    dropDown = document.querySelector('#type')
    answer = document.querySelector('#answer')
    openSaveButton = document.querySelector('#openSave')
    saveSetUP = document.querySelector('.popUp')
    saveButton = document.querySelector('#save')
    saveNameBox = document.querySelector('#saveName')
    getSavesButton = document.querySelector('#getSaves')
    allSaves = document.querySelector('#allSaves')
    example1 = document.querySelector('#example1')
    example2 = document.querySelector('#example2')
    exampleButton = document.querySelector('#getExamples')
    warning = document.querySelector("#warning")
    clear = document.querySelector('#clear')
}

function clearAnswer(where){
    while(where.firstChild !== null){
        where.removeChild(where.firstChild);
    }
}

function clearSaves(){
    saves.splice(0, saves.length)
    hasSaves = false
    saveShown = false
    getSavesButton.style.display="none"
    clear.style.display="none"
    getSavesButton.setAttribute('value', "Previous Saves")
    clearAnswer(allSaves)
}

function chooseType(){
    choosenType = dropDown.value
}

function showExamples(){
    if (examplesShown==false){
        examplesShown=true
        exampleButton.setAttribute('value', "Close")
        example1.style.display="inline" 
        example2.style.display="inline"
    }
    else{
        examplesShown=false
        exampleButton.setAttribute('value', "Examples")
        example1.style.display="none" 
        example2.style.display="none"
    }
}

function openSave(){
    saveSetUP.style.display="block"
    openSaveButton.style.display="none"
    warning.style.display="none"
}

function makeSave(){
    let saveName = saveNameBox.value
    let safeSave = true
    for(i=0; i<saves.length; ++i){
        if(saves[i]==saveName){
            safeSave = false
        }
    }
    if (safeSave==true){
        saves.push(saveName)
        window.localStorage.setItem(saveName, JSON.stringify(dimensions))
        saveSetUP.style.display = "none"
        if (hasSaves==false){
            hasSaves=true
            getSavesButton.style.display="block"
        }   
    }
    else{
        warning.style.display="block"
    }
}

function showSaves(){
    if (saveShown==false){
        getSavesButton.setAttribute('value', "Close")
        clear.style.display = "block"
        saveShown=true
        for (i=0; i<saves.length; ++i){
            console.log(saves[i])
            let newObject = window.localStorage.getItem(saves[i])
            let currentSave = JSON.parse(newObject)
            console.log(currentSave)
            addTitle(saves[i], allSaves)
            giveInfo(currentSave["matHeight"], currentSave["matWidth"], "Mat", allSaves)
            giveInfo(currentSave["photoHeight"], currentSave["photoWidth"], "Photo", allSaves)
            giveInfo(currentSave["windowHeight"], currentSave["windowWidth"], "Window", allSaves)
            giveInfo(currentSave["borderHeight"], currentSave["borderWidth"], "Border", allSaves)
        }
    }
    else{
        getSavesButton.setAttribute('value', "Previous Saves")
        clear.style.display = "none"
        saveShown = false
        clearAnswer(allSaves)
    }
}

function calculateMat(){
    openSaveButton.style.display="block"
    saveSetUP.style.display="none"
    clearAnswer(answer)
    chooseType()
    if (choosenType == "margin"){
        dimensions["photoWidth"] = photoWidth.value
        dimensions["photoHeight"] = photoHeight.value
        dimensions["matWidth"] = frameWidth.value
        dimensions["matHeight"] = frameHeight.value
        calculateWindow()
        calculateMargin()
    }
    if (choosenType == "frame"){
        dimensions["photoWidth"] = photoWidth.value
        dimensions["photoHeight"] = photoHeight.value
        dimensions["borderWidth"] = marginWidth.value
        dimensions["borderHeight"] = marginHeight.value
        calculateWindow()
        calcuteFrame()
    }
    if (choosenType == "photo"){
        dimensions["matWidth"] = frameWidth.value
        dimensions["matHeight"] = frameHeight.value
        dimensions["borderWidth"] = marginWidth.value
        dimensions["borderHeight"] = marginHeight.value
        calculatePhoto()
        calculateWindow()
    }
    giveInfo(dimensions["matHeight"], dimensions["matWidth"], "Mat", answer)
    giveInfo(dimensions["photoHeight"], dimensions["photoWidth"], "Photo", answer)
    giveInfo(dimensions["windowHeight"], dimensions["windowWidth"], "Window", answer)
    giveInfo(dimensions["borderHeight"], dimensions["borderWidth"], "Border", answer)
}

function calculateWindow(){
    dimensions["windowWidth"] = dimensions["photoWidth"] - 0.5
    dimensions["windowHeight"] = dimensions["photoHeight"] - 0.5
}

function calculateMargin(){
    dimensions["borderWidth"] = (dimensions["matWidth"] - dimensions["windowWidth"])/2
    dimensions["borderHeight"] = (dimensions["matHeight"] - dimensions["windowHeight"])/2 
}

function calcuteFrame(){
    dimensions["matWidth"] = dimensions["borderWidth"] * 2 + dimensions["borderWidth"]
    dimensions["matHeight"] = dimensions["borderHeight"] * 2 + dimensions["windowHeight"]
}

function calculatePhoto(){
    dimensions["photoWidth"] = dimensions["matWidth"] - dimensions["borderWidth"] * 2 + 0.5
    dimensions["photoHeight"] = dimensions["matHeight"] - dimensions["borderHeight"] * 2 + 0.5
}

function giveInfo(height, width, type, where){
    let newh3 = document.createElement("h3")
    newh3.textContent = `The ${type} is ${width} inches wide x ${height} inches tall`
    where.appendChild(newh3)
}

function addTitle(what, where){
    let newh3 = document.createElement("h3")
    newh3.textContent = `${what}`
    where.appendChild(newh3)
}

function runProgram() {
    getHTMLElements()
    matButton.addEventListener("click", calculateMat);
    openSaveButton.addEventListener("click", openSave);
    saveButton.addEventListener("click", makeSave);
    getSavesButton.addEventListener("click", showSaves);
    exampleButton.addEventListener("click", showExamples);
    clear.addEventListener("click", clearSaves)
}

document.addEventListener('DOMContentLoaded', runProgram);