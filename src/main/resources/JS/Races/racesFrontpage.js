import * as restFunctions from '../universal.js';


document.addEventListener("DOMContentLoaded", fetchAllRaces)

const dateInput = document.getElementById('wednesday-date');
const submitBtn = document.getElementById("submitData");
const tableBody = document.getElementById("tableBody")

dateInput.addEventListener('change',  () => {

    const selectedDate = new Date(dateInput.value);

    if (selectedDate.getDay() !== 3) {
        alert("Du skal vælge en onsdag")
        dateInput.value = ""
    };
});

submitBtn.addEventListener("click", submitNewRace);

async function fetchAllRaces() {

    console.log("fetced")

    const url = "http://localhost:8080/getAllRaces"

    const data = await restFunctions.fetchAny(url)

    tableBody.innerHTML = ""

    data.forEach(putDataInTableWButton)

    tableBtns()
}

function putDataInTableWButton(data, index) {

    const boatTypeString = restFunctions.returnBoatTypeString(data.boatType)
    const dateFormatted = restFunctions.dateFormat(data.date)

    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + dateFormatted + "</td>" +
        "<td>" + boatTypeString + "</td>" +
        "<td>" +
        "<button class='viewParticipant' id='viewParticipant" + index + "' value='" + JSON.stringify(data) + "'>Se deltagere</button>" +
        "</td>"

    tableBody.appendChild(tr)

}

function tableBtns() {

    const viewParticipantBtn = document.querySelectorAll(".viewParticipant");

    viewParticipantBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            localStorage.setItem("race", btn.value)
            window.location.href = "SingleRace.html"
        });
    });

}



async function submitNewRace() {

    const date = document.getElementById("wednesday-date").value;

    const boatTypeSelect = document.getElementById("boatType")
    const selectedValue = boatTypeSelect.value;

    let newRace = {
        "date": date,
        "boatType": ""
    }


    if (selectedValue === boatTypeSelect.options[0].value) {

        for (let i = 1; i <= 3; i++) {
            newRace.boatType = boatTypeSelect.options[i].value;
            await postRace(newRace, false);

        }
        alert("Oprettet")

    } else {

        newRace.boatType = selectedValue;
        await postRace(newRace, true)

    }

}

async function postRace(newRace, showAlert) {

    const url = "http://localhost:8080/postRace";

    const response = await restFunctions.restPostData(url, newRace, showAlert);

    if (response.ok) {
        fetchAllRaces()
    }
}

export {fetchAllRaces}