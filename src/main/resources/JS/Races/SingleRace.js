import * as restFunctions from '../universal.js';
import {dateFormat} from "../universal.js";

document.addEventListener("DOMContentLoaded", setUp)

const race = JSON.parse(localStorage.getItem("race"))
const selectBoat = document.querySelector("#sailboats")
const addBoatToRaceButton = document.getElementById("addBoat")
const tableBody = document.getElementById("tableBody")
const popup = document.querySelector("dialog")

let participantsInRace = []

addBoatToRaceButton.addEventListener("click", addBoatToRace)


async function setUp() {
    setTitle()
    await fetchBoatsInRace()
    await fetchSailboatsBasedOnType()

}

function setTitle(){
    const title = document.getElementById("title")
    const boattypeString = restFunctions.returnBoatTypeString(race.boatType)
    const formatedDate = restFunctions.dateFormat(race.date)
    title.innerHTML = formatedDate + "<br>" +  boattypeString;

}

async function fetchSailboatsBasedOnType() {

    const url = "http://localhost:8080/getBoatsByBoatType/" + race.boatType


    const boatsWithSameBoatType = await restFunctions.fetchAny(url)
    const boatsAlreadyInRace = participantsInRace

    //filter der fjerner de både der allerede er i kapsejladset
    const boatsNotInRace = boatsWithSameBoatType.filter((boat) => {
        return !boatsAlreadyInRace.some((boatInRace) => boat.id === boatInRace.sailboat.id);
    });

    boatsNotInRace.forEach(putBoatsInDropdown)

}

function putBoatsInDropdown(data) {


    const option = document.createElement("option")
    option.innerHTML = data.name
    option.value = JSON.stringify(data)

    selectBoat.appendChild(option)

}

function addBoatToRace() {


    const boatJsonPared = JSON.parse(selectBoat.value);
    const boatName = boatJsonPared.name;


    if (confirm("Vil du tilføje " + boatName + " til kapsejladset?")) {
        postResult()
    }

}

async function postResult() {

    const resultPreview = {
        "sailboat": JSON.parse(selectBoat.value),
        "race": race,
    }

    const url = "http://localhost:8080/postResult"
    const fetchresponse = await restFunctions.restPostData(url, resultPreview, true);


    if (fetchresponse.ok) {
        fetchBoatsInRace()
    }
}

async function fetchBoatsInRace() {

    const url = "http://localhost:8080/getResultsByRace/" + race.id

    participantsInRace  = await restFunctions.fetchAny(url)

    tableBody.innerHTML = ""

    participantsInRace.forEach(putDataInTable)

}

function putDataInTable(data, index) {

    const tableBody = document.getElementById("tableBody")

    const tr = document.createElement("tr")

    let btnText = "Rediger resultat";

    if (data.position == null) {
        data.position = ""
        btnText = "Tilføj resultat"
    }

    tr.innerHTML =
        "<td>" + data.id + "</td>" +
        "<td>" + data.sailboat.name + "</td>" +
        "<td>" + data.position + "</td>" +
        "<td>" + data.points + "</td>" +
        "<button class='results' id='result" + index + "' value='" + data + "'>" + btnText + "</button>"

    tableBody.appendChild(tr)

    const addResult = document.getElementById("result" + index);
    if (data.position == "") {
        addResult.classList.add("greyBtn")
    }
    addResult.addEventListener("click", () => {

        addNewResults(data)

    })

}

function addNewResults(data) {

    popup.showModal();


    const boatName = document.getElementById("boatName")
    boatName.textContent = "Sejlbåd: " + data.sailboat.name


    const completed = document.getElementById("completed");
    const popupInputWrapper = document.getElementById("popupInputWrapper")
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    completed.addEventListener("change", (event) => {

        if (event.target.checked) {

            popupInputWrapper.innerHTML = "" +
                "<label for='boatPosition'>Angiv plads</label>" +
                "<input type='number' id='boatPosition' name='boatPosition' min='1' max='100'>"
        } else {
            popupInputWrapper.innerHTML = ""
        }

    });

    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
        popup.close();

        checkboxes.forEach((checkbox) => {
            checkbox.checked = false
            popupInputWrapper.innerHTML = ""
        })


    });


    const submitResult = document.getElementById("submitResult")
    submitResult.addEventListener("click", () => {

        if (completed.checked) {
            const boatPosition = document.getElementById("boatPosition").value
            boatPosition.trim()

            if (boatPosition != "") {
                restPutResult(data, boatPosition)
            }

        } else {

        }

        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            popupInputWrapper.innerHTML = ""
        })

    });
}

async function restPutResult(data, boatPosition) {

    const url = "http://localhost:8080/updateResult/" + data.id;
    const position = boatPosition + ". plads"

    const result = {
        id: data.id,
        position: position,
        points: boatPosition,
        race: race,
        sailboat: data.sailboat
    }

    const response = await restFunctions.restUpdateData(url, result);

    if (response.ok) {
        popup.close();
        fetchBoatsInRace()
    }

}

function checkCheckBoxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function (event) {
            checkboxes.forEach(function (otherCheckbox) {
                if (otherCheckbox !== event.target) {
                    otherCheckbox.checked = false;
                }
            });
        });
    });


}

function calculatePoints() {

}

