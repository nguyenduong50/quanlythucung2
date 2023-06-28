'use strict';

//=============Varriable=============//

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const inputFile = document.getElementById("input-file");

let listTest = [];

//=============Function=============//

function saveDataToFile() {
    let blob = new Blob([JSON.stringify(listPet)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "listpet.json");
}

async function getFileFromComputer() {
    if(inputFile.files.length > 0){
        let srcFile = window.URL.createObjectURL(inputFile.files[0]);

        let listRequest = await fetch(srcFile);            
        let json = await listRequest.json();
        saveToStorage('listPet', json);
    }

}       

//=============Event=============//

exportBtn.addEventListener("click", function(){
    saveDataToFile();
})

importBtn.addEventListener("click", function(){
    getFileFromComputer();
})