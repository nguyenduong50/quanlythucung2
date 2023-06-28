'use strict';

//=============Varriable=============//

//Form data input
const nameBreedInput = document.getElementById("input-name-breed");

//Button Submit
const submitBtn = document.getElementById("submit-btn");

//Table
const tbody = document.getElementById("tbody");

//=============Function=============//

//Clear form data input
function clearInput() {
    nameBreedInput.value = '';
    typeInput.value = 'Select Type';
}

//Render List Breed;
function renderListBreedTable(list) {
    tbody.innerHTML = '';

    for (let i = 0; i <= list.length - 1; i++) {
        const row = document.createElement('tr');

        row.innerHTML =
            '<td>' + (i + 1) + '</td>' +
            '<td>' + list[i].name + '</td>' +
            '<td>' + list[i].type + '</td>' +
            `<td> <button type="button" id="deleteBtn" class="btn btn-danger" onclick="deleteBreed('${i}')">Delete</button> </td>`;
        tbody.appendChild(row);
    }
}

//Delete Breed
function deleteBreed(i){
    if(confirm('Are you delete?')){
        listBreed.splice(i,1);
        saveToStorage('listBreed', listBreed);
        renderListBreedTable(listBreed);
    }
}

//=============Default program=============//

renderListBreedTable(listBreed);

//=============Event=============//

//Add new Breed
submitBtn.addEventListener('click', function () {
    const newBreed = {
        name: nameBreedInput.value,
        type: typeInput.value,
    }

    let validate = true;

    //Validate data input
    function validateInput(newBreed) {
        //dataInput null
        if (newBreed.type === "Select Type" || "") {
            alert("Please select Type!");
            validate = false;
        }

        if (newBreed.name === "") {
            alert("Please select name Breed!");
            validate = false;
        }

        //nameInput unique
        for (let i = 0; i <= listBreed.length - 1; i++) {
            if (newBreed.name === listBreed[i].name) {
                alert("name breed must be unique");
                validate = false;
            }
        }
    }

    validateInput(newBreed);

    //Insert new Breed to list Breed
    if (validate) {
        listBreed.push(newBreed);
        renderListBreedTable(listBreed);
        saveToStorage('listBreed', listBreed);
        clearInput();
    }
})


