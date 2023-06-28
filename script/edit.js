'use strict';

//=============Varriable=============//

const containerForm = document.getElementById("container-form");

//Button Submit
const submitBtn = document.getElementById("submit-btn");

//Index edit
let indexEdit = -1; 

//=============Function=============//

//Clear form input
function clearInput(){
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    colorInput.value = '#000000';
    breedInput.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

//Edit pet
function editPet(index){
    containerForm.classList.remove("hide");
    indexEdit = index;

    nameInput.value = listPet[index].name;
    ageInput.value = listPet[index].age;
    typeInput.value = listPet[index].type;
    weightInput.value = listPet[index].weight;
    lengthInput.value = listPet[index].length;
    colorInput.value = listPet[index].color;
    breedInput.value = listPet[index].breed;
    vaccinatedInput.checked = listPet[index].vaccinated;
    dewormedInput.checked = listPet[index].dewormed;
    sterilizedInput.checked = listPet[index].sterilized;
}

//Update Pet
function updatePet(index, newPet){
    if(index < 0){
        alert("Please, choose record");
    }else{
        listPet[index].name = newPet.name;
        listPet[index].age = newPet.age;
        listPet[index].type = newPet.type;
        listPet[index].weight = newPet.weight;
        listPet[index].length = newPet.length;
        listPet[index].color = newPet.color;
        listPet[index].breed = newPet.breed;
        listPet[index].vaccinated = newPet.vaccinated;
        listPet[index].dewormed = newPet.dewormed;
        listPet[index].sterilized = newPet.sterilized;
    }
}

//Render List pet
function renderListPetTable(list) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';

    for (let i = 0; i <= list.length - 1; i++) {
        const row = document.createElement('tr');
        let vaccin = 'bi bi-x-circle-fill';
        let deworm = 'bi bi-x-circle-fill';
        let steriliz = 'bi bi-x-circle-fill';
        list[i].vaccinated ? vaccin = 'bi bi-check-circle-fill' : vaccin = 'bi bi-x-circle-fill';
        list[i].dewormed ? deworm = 'bi bi-check-circle-fill' : deworm = 'bi bi-x-circle-fill';
        list[i].sterilized ? steriliz = 'bi bi-check-circle-fill' : steriliz = 'bi bi-x-circle-fill';

        row.innerHTML =
            '<td>' + list[i].id + '</td>' +
            '<td>' + list[i].name + '</td>' +
            '<td>' + list[i].age + '</td>' +
            '<td>' + list[i].type + '</td>' +
            '<td>' + list[i].weight + '</td>' +
            '<td>' + list[i].length + '</td>' +
            '<td>' + list[i].breed + '</td>' +
            '<td>' + '<i class="bi bi-square-fill" style="color: ' + list[i].color + '"></i>' + '</td>' +
            '<td>' + '<i class="' + vaccin + '"></i>' + '</td>' +
            '<td>' + '<i class="' + deworm + '"></i>' + '</td>' +
            '<td>' + '<i class="' + steriliz + '"></i>' + '</td>' +
            '<td>' +  new Date(list[i].date).getDate() + "/" + (new Date(list[i].date).getMonth() + 1) + "/" + new Date(list[i].date).getFullYear() + '</td>' +
            `<td> <button type="button" id="deleteBtn" class="btn btn-warning text-light" onclick="editPet('${i}')">Edit</button> </td>`;

        tbody.appendChild(row);
    }
}

//=============Default program=============//

//Render List pet
renderListPetTable(listPet);
renderBreed(listBreed);

//=============Event=============//

//Add new Pet
submitBtn.addEventListener('click', function () {
    const newPet = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    }

    let validate = true;

    //Validate data input
    function validateInput(newPet){
        let inputString = true;
        let inputNumber = true;

        for(let dataInput in newPet){
            if(String(typeof(newPet[dataInput]) === "number") && Number.isNaN(newPet[dataInput]) ){
                validate = false;
                inputNumber = false;
            }

            if( String(typeof(newPet[dataInput])) === "string" && newPet[dataInput] === "" ){
                validate = false;
                inputString = false;
            } 

            // if( String(typeof(newPet[dataInput])) === "string" && (newPet[dataInput] === "" || newPet[dataInput].substring(0,6) === "Select") ){
            //     alert('Input missing data');
            //     validate = false;
            // } 
        }

        if(!inputNumber){
            alert('Input missing data Age, Weight, Length');
        }
        
        if(!inputString){
            alert('Input missing data ID, Name');
        }

        if(newPet.age < 1 || newPet.age > 15){
            alert("Age must be between 1 and 15!");
            validate = false;
        }

        if(newPet.weight < 1 || newPet.weight > 15){
            alert("Weight must be between 1 and 15!");
            validate = false;
        }

        if(newPet.length < 1 || newPet.length > 100){
            alert("Length must be between 1 and 100!");
            validate = false;
        }

        if(newPet.type === "Select Type"){
            alert("Please select Type!");
            validate = false;
        }

        if(newPet.breed === "Select Breed"){
            alert("Please select Breed!");
            validate = false;
        }
    }

    validateInput(newPet);

    //Insert new Pet to list Pet
    if(validate){
        updatePet(indexEdit, newPet);
        saveToStorage('listPet', listPet);
        renderListPetTable(listPet);
        clearInput();
        containerForm.classList.add("hide");
    }
})
