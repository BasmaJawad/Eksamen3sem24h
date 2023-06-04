import * as restFunctions from '../universal.js';

document.addEventListener("DOMContentLoaded", boatsTable)

const tableBody = document.getElementById("tableBody")
const popup = document.querySelector("dialog")
const addBoatButton = document.querySelector(".button-container button")
const closeBtn = document.querySelector(".close");

//tilføj båd inputs
const nameField = document.getElementById("name")
const boatTypeField = document.getElementById("boatType")
const submitButtonContainer = document.getElementById("submitButtonContainer");
const submitBoatForm = document.getElementById("postBoat");

addBoatButton.addEventListener("click", () => {
    nameField.value = ""
    boatTypeField.value = ""
    popup.showModal();
    addSubmitBtn()
});

closeBtn.addEventListener("click", () => {
    popup.close();
})

async function boatsTable() {

    const url = "http://localhost:8080/getAllBoats"

    const data = await restFunctions.fetchAny(url)

    tableBody.innerHTML = ""

    data.forEach(putDataInTableWButton)

    tableBtns()


}

function putDataInTableWButton(data, index) {

    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + data.id + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" + data.name + "</td>" +
        "<td>" +
        "<button class='editBtn' id='editBtn" + index + "' value='" + JSON.stringify(data) + "'>Rediger</button>" +
        "</td>" +
        "<td>" +
        "<button class='racesBtn' id='racesBtn" + index + "' value='" + JSON.stringify(data) + "'>Resultater</button>" +
        "</td>" +
        "<td>" +
        "<button class='deleteBtn' id='deleteBtn" + index + "' value='" + JSON.stringify(data) + "'>Slet</button>" +
        "</td>"

    tableBody.appendChild(tr)


}

function tableBtns(){

    const editBtn = document.querySelectorAll(".editBtn");
    const racesBtn = document.querySelectorAll(".racesBtn");
    const deleteBtn = document.querySelectorAll(".deleteBtn");


        editBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                editBoat(JSON.parse(btn.value))
            });
        });

        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                deleteBoat(JSON.parse(btn.value))
            });
        });
}



function addSubmitBtn() {

    submitButtonContainer.innerHTML = "<button id='submitData' type='submit'>Opet båd</button>"
    submitBoatForm.addEventListener("submit", submitData)

}


//NY båd

async function submitData(event){


    event.preventDefault();

    const form = event.currentTarget
    const url = "http://localhost:8080/postSailboat";
    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())

    const response = await restFunctions.restPostData(url, newObject,true);

    if (response.ok) {
        popup.close();
        boatsTable();
    }
    submitBoatForm.removeEventListener("submit", submitData);
}

//REDIGER båd

function addEditBtn() {

    submitButtonContainer.innerHTML = "<button id='editData' type='submit'>Gem ændringer</button>"


}

let updateBoatHandler = null;
function editBoat(data) {

    popup.showModal()
    addEditBtn()

    nameField.value = data.name

    boatTypeField.value = data.boatType

    //tilføjer hidden id felt til formen

    const idField = document.createElement("input")
    idField.type = "hidden"
    idField.name = "id"
    idField.value = data.id
    submitBoatForm.appendChild(idField)


    updateBoatHandler = (event) => updateBoat(data.id, event);
    submitBoatForm.addEventListener("submit", updateBoatHandler);

}

async function updateBoat(id, event) {

    event.preventDefault();
    const form = event.currentTarget

    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())


    const url = "http://localhost:8080/updateBoat/" + newObject.id;

    const response = await restFunctions.restUpdateData(url, newObject);

    if (response.ok) {
        console.log(response)
        popup.close();

       boatsTable();

    }

    submitBoatForm.removeEventListener("submit", updateBoatHandler);

}


async function deleteBoat(Data) {

    const confirmDelete = confirm("Er du sikker på du vil slette " + Data.name + "?")

    if (confirmDelete) {

        const url = "http://localhost:8080/deleteBoat/" + Data.id

        const response = await restFunctions.restDeleteData(url, Data)

        if (response.ok) {
           boatsTable()

        }

    }

}