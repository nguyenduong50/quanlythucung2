'use strict';
//=============Varriable=============//

const findID = document.getElementById("find-btn");

//=============Function=============//

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
            '<td>' + new Date(list[i].date).getDate() + "/" + (new Date(list[i].date).getMonth() + 1) + "/" + new Date(list[i].date).getFullYear() + '</td>'
        tbody.appendChild(row);
    }
}

//=============Default program=============//

renderBreed(listBreed);

//=============Event=============//

findID.addEventListener("click", function () {
    let listSearch = [];

    //ID input and Name input null
    if (idInput.value === "" && nameInput.value === "") {
        if (typeInput.value === "Select Type" && breedInput.value === "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    listPet[i].vaccinated === vaccinatedInput.checked &&
                    listPet[i].dewormed === dewormedInput.checked &&
                    listPet[i].sterilized === sterilizedInput.checked
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value !== "Select Type" && breedInput.value === "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].type === typeInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value === "Select Type" && breedInput.value !== "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].breed === breedInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value !== "Select Type" && breedInput.value !== "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].type === typeInput.value &&
                    listPet[i].breed === breedInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }
    }

    //ID input and Name input not null
    if ((idInput.value !== "" || nameInput.value !== "")) {
        if (typeInput.value === "Select Type" && breedInput.value === "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].id.toLowerCase().indexOf(idInput.value.toLowerCase()) >= 0 &&
                    listPet[i].name.toLowerCase().indexOf(nameInput.value.toLowerCase()) >= 0
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value !== "Select Type" && breedInput.value === "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].id.toLowerCase().indexOf(idInput.value.toLowerCase()) >= 0 &&
                    listPet[i].name.toLowerCase().indexOf(nameInput.value.toLowerCase()) >= 0 &&
                    listPet[i].type === typeInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value === "Select Type" && breedInput.value !== "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].id.toLowerCase().indexOf(idInput.value.toLowerCase()) >= 0 &&
                    listPet[i].name.toLowerCase().indexOf(nameInput.value.toLowerCase()) >= 0 &&
                    listPet[i].breed === breedInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }

        if (typeInput.value !== "Select Type" && breedInput.value !== "Select Breed") {
            for (let i = 0; i <= listPet.length - 1; i++) {
                if (
                    (listPet[i].vaccinated === vaccinatedInput.checked &&
                        listPet[i].dewormed === dewormedInput.checked &&
                        listPet[i].sterilized === sterilizedInput.checked) ||
                    listPet[i].id.toLowerCase().indexOf(idInput.value.toLowerCase()) >= 0 &&
                    listPet[i].name.toLowerCase().indexOf(nameInput.value.toLowerCase()) >= 0 &&
                    listPet[i].type === typeInput.value &&
                    listPet[i].breed === breedInput.value
                ) {
                    listSearch.push(listPet[i]);
                }
            }
            renderListPetTable(listSearch);
        }
    }


})


