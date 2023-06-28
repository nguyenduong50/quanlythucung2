'use strict';
//=============Varriable static=============//

//Side bar
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");

//Form data input
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//List pet
let listPet = getFromStorage('listPet') ?? [];

//List Breed
let listBreed = getFromStorage('listBreed') ?? [];
let listFilterBreed = listBreed ??[];
let inputBreed = document.getElementById("input-breed");


//=============Function static=============//

//Save data to storage
function saveToStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

//Get data from Storage
function getFromStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

//Load list Breed from Storage to form data input
function renderBreed(list){
    inputBreed.innerHTML = "Select Breed";
    const option = document.createElement('option');
    option.innerHTML = "Select Breed";
    inputBreed.appendChild(option);

    if(typeInput.value === "Select Type"){
        for(let i = 0; i <= listBreed.length - 1; i++){
            const option = document.createElement('option');
            option.innerHTML = listBreed[i].name;
            inputBreed.appendChild(option);
        }
    }else{
        for(let i = 0; i <= list.length - 1; i++){
            const option = document.createElement('option');
            option.innerHTML = list[i].name;
            inputBreed.appendChild(option);
        }
    }

}

//Filter Breed based on list Type (Dog, Cat)
function filterBreed(){
    listFilterBreed = listBreed.filter(breed => breed.type === typeInput.value);
    renderBreed(listFilterBreed);
}

//=============Event static=============//

//Toggle
sideBarTitle.addEventListener('click', function () {
    sideBar.classList.toggle('active');
})