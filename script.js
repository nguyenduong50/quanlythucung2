'use strict';

//=============Varriable=============//

//Button
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");

//Healthy pet boolean
let isShowHealthy = false;

//=============Function=============//

//Clear form input
function clearInput(){
    idInput.value = '';
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
            `<td> <button type="button" id="deleteBtn" class="btn btn-danger" onclick="deletePet('${i}')">Delete</button> </td>`;

        tbody.appendChild(row);
    }
}

//Show healthy Pet
function showHealthyPet(){
    let listHealthyPet = listPet.filter(function(item){
        return item.vaccinated === true && item.dewormed === true && item.sterilized === true;
        
    })

    renderListPetTable(listHealthyPet);
}

//Delete pet
function deletePet(i){
    if(confirm('Are you delete?')){
        listPet.splice(i,1);
        saveToStorage('listPet', listPet);
        renderListPetTable(listPet);
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
        id: idInput.value,
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

        for(let i = 0; i <= listPet.length - 1; i++){
            if(newPet.id === listPet[i].id){
                alert('ID must be unique!');
                validate = false;
            }
        }
    }

    validateInput(newPet);

    //Insert new Pet to list Pet
    if(validate){
        listPet.push(newPet);
        saveToStorage('listPet', listPet);
        renderListPetTable(listPet);
        clearInput();
        renderBreed(listBreed);
    }
})

//Show healthy Pet
healthyBtn.addEventListener("click", function(){
    isShowHealthy = !isShowHealthy;

    if(isShowHealthy){
        healthyBtn.innerHTML = 'Show All Pet';
        showHealthyPet();
    }
    else{
        healthyBtn.innerHTML = 'Show Healthy Pet';
        renderListPetTable(listPet);
    }
});
