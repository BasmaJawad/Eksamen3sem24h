import * as restFunctions from '../universal.js';

document.addEventListener("DOMContentLoaded", setUp)

const race = JSON.parse(localStorage.getItem("race"))
const selectBoat = document.querySelector("#sailboats")
const addBoatToRaceButton = document.getElementById("addBoat")
const tableBody = document.getElementById("tableBody")
const popup = document.querySelector("dialog")
const popupCloseBtn = document.querySelector(".close");

let participantsInRace = []

addBoatToRaceButton.addEventListener("click", addBoatToRace)


async function setUp() {
    setTitle()
    await fetchBoatsInRace()
    await fetchSailboatsBasedOnType()

}

function setTitle() {
    const title = document.getElementById("title")
    const boattypeString = restFunctions.returnBoatTypeString(race.boatType)
    const formatedDate = restFunctions.dateFormat(race.date)
    title.innerHTML = formatedDate + "<br>" + boattypeString;

}

async function fetchSailboatsBasedOnType() {

    selectBoat.innerHTML = ""

    const url = "http://localhost:8080/getBoatsByBoatType/" + race.boatType


    const boatsWithSameBoatType = await restFunctions.fetchAny(url)
    const boatsAlreadyInRace = participantsInRace

    //filter der fjerner de både der allerede er i kapsejladset
    const boatsNotInRace = boatsWithSameBoatType.filter(boat =>
         !boatsAlreadyInRace.some((boatInRace) => boat.id === boatInRace.sailboat.id)
    );

    if (boatsNotInRace.length === 0) {
        disableAddBoatToRaceButton()
    } else {
        boatsNotInRace.forEach(putBoatsInDropdown)
    }

}

function disableAddBoatToRaceButton() {

    const option = document.createElement("option")
    option.innerHTML = "Ingen ledige både"
    selectBoat.appendChild(option)
    addBoatToRaceButton.disabled = true;


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
        await fetchBoatsInRace()
        await fetchSailboatsBasedOnType()

    }
}

async function fetchBoatsInRace() {

    const url = "http://localhost:8080/getResultsByRace/" + race.id

    participantsInRace = await restFunctions.fetchAny(url)

    tableBody.innerHTML = ""

    participantsInRace.forEach(putDataInTable)
    deleteBtns()

}

function putDataInTable(data, index) {

    const tableBody = document.getElementById("tableBody")

    const tr = document.createElement("tr")

    let btnText = "Rediger";

    if (data.position == null) {
        data.position = ""
        btnText = "Tilføj resultat"
    }

    tr.innerHTML =
        "<td>" + data.id + "</td>" +
        "<td>" + data.sailboat.name + "</td>" +
        "<td>" + data.position + "</td>" +
        "<td>" + data.points + "</td>" +
        "<td>" +
        "<button class='results' id='result" + index + "' value='" + JSON.stringify(data) + "'>" + btnText + "</button>"
        + "</td>" +
        "<td>" +
        "<button class='deleteBtn' id='delete" + index + "' value='" + data.id + "'> Slet </button>"
        + "</td>"

    tableBody.appendChild(tr)

    const addResult = document.getElementById("result" + index)

    if (data.position == "") {
        addResult.classList.add("colorBtn")
    }

    addResult.addEventListener("click", () => {

        addNewResults(data)

    })

}

function deleteBtns() {


    const deleteBtns = document.querySelectorAll(".deleteBtn")

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            deleteResult(btn.value)

        })
    })
}

async function deleteResult(id) {

    const url = "http://localhost:8080/deleteResult/" + id

    const response = await restFunctions.restDeleteData(url)

    if (response.ok) {
        setUp()
    }
}

function addNewResults(data) {

    const otherCheckboxesWrapper = document.getElementById("otherCheckboxesWrapper")

    popup.showModal();
    addOtherCheckboxes(otherCheckboxesWrapper)


    const boatName = document.getElementById("boatName")
    boatName.textContent = "Sejlbåd: " + data.sailboat.name


    const completed = document.getElementById("completed");
    const popupInputWrapper = document.getElementById("popupInputWrapper")
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submitResult = document.getElementById("submitResult")


    completed.addEventListener("change", (event) => {

        if (event.target.checked) {

            popupInputWrapper.innerHTML = "" +
                "<label for='boatPosition'>Angiv plads</label>" +
                "<input type='number' id='boatPosition' name='boatPosition' min='1' max='100'>"

            otherCheckboxesWrapper.innerHTML = ""
        }
        else {
            popupInputWrapper.innerHTML = ""
            addOtherCheckboxes(otherCheckboxesWrapper)
        }

    });


    submitResult.addEventListener("click", () => {

        if (completed.checked) {
            const boatPosition = document.getElementById("boatPosition").value
            boatPosition.trim()

            if (boatPosition !== "") {
                restPutResult(data, boatPosition)
            } else
                alert("Angiv venligst en placering")
        }

        else {
            checkboxes.forEach((checkbox) => {

                if (checkbox.checked) {

                    const status = checkbox.getAttribute("status")
                    restPutNotCompletedResult(data, status)

                }
            })
        }
        uncheckPopup(checkboxes, popupInputWrapper) //unchecker når man kikker gem

    });

    popupCloseBtn.addEventListener("click", () => {
        popup.close();
        uncheckPopup(checkboxes, popupInputWrapper) //unchecker når man kikker luk
    });
}

function addOtherCheckboxes(otherCheckboxesWrapper) {

    otherCheckboxesWrapper.innerHTML = `
    <label for="incomplete">
        <input type="checkbox" status="Ikke fuldført" id="incomplete">ikke fuldført
    </label><br>

    <label for="tooEarly">
        <input type="checkbox" status="Tidlig startet" id="tooEarly" >for tidligt
    </label><br>

    <label for="notStarted">
        <input type="checkbox" status="Ikke startet" id="notStarted">ikke startet
    </label><br>
`;


}

function uncheckPopup(checkboxes, popupInputWrapper) {

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
        popupInputWrapper.innerHTML = ""
    })
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


async function restPutNotCompletedResult(data, status) {

    const point = calculatePoints(status)
    const position = status

    const url = "http://localhost:8080/updateResult/" + data.id;

    const result = {
        id: data.id,
        position: position,
        points: point,
        race: race,
        sailboat: data.sailboat
    }

    const response = await restFunctions.restUpdateData(url, result);

    if (response.ok) {
        popup.close();
        fetchBoatsInRace()
    }


}

function calculatePoints(status) {

    let boatPosition

    if (status == "Ikke startet")
        boatPosition = participantsInRace.length + 1
    else
        boatPosition = participantsInRace.length

    return boatPosition;
}
