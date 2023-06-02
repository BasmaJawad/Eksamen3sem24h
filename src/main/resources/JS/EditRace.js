const race = JSON.parse(localStorage.getItem("race"))

setUp()

function setUp() {
    const title = document.getElementById("title")
    title.textContent = race.date + " " + race.boatType
    fetchBoatsInRace()

}


async function fetchSailboatsBasedOnType() {

    const url = "http://localhost:8080/getBoatsByBoatType/" + race.boatType

    const data = await fetchAny(url)

    //filter metode her

    data.forEach(putDataInDropdown)

}

const boats = document.querySelector("#sailboats")

function putDataInDropdown(data) {


    const option = document.createElement("option")
    option.innerHTML = data.name
    option.value = JSON.stringify(data)

    boats.appendChild(option)

}

fetchSailboatsBasedOnType()


const addBoatToRaceButton = document.getElementById("addBoat")
addBoatToRaceButton.addEventListener("click", addBoatToRace)

function addBoatToRace() {


    const boatJsonPared = JSON.parse(boats.value);
    const boatName = boatJsonPared.name;


    if (confirm("Vil du tilføje " + boatName + " til kapsejladset?")) {
        postResult()
    }

}


async function postResult() {

    const resultPreview = {
        "sailboat": JSON.parse(boats.value),
        "race": race,
    }

    const resultPreviewJsonString = JSON.stringify(resultPreview)

    const postToDb = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: resultPreviewJsonString
    }

    const url = "http://localhost:8080/postResult"
    const fetchresponse = await fetch(url, postToDb);

    if (!fetchresponse.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    } else {
        alert("Postet til DB")
        fetchBoatsInRace()
    }

}


async function fetchBoatsInRace() {

    const url = "http://localhost:8080/getResultsByRace/" + race.id

    const data = await fetchAny(url)

    tableBody.innerHTML = ""

    data.forEach(putDataInTable)

}


function putDataInTable(data, index) {

    const tableBody = document.getElementById("tableBody")

    const tr = document.createElement("tr")

    if (data.position == null) {
        data.position = ""
    }

    tr.innerHTML =
        "<td>" + data.id + "</td>" +
        "<td>" + data.sailboat.name + "</td>" +
        "<td>" + data.position + "</td>" +
        "<td>" + data.points + "</td>" +
        "<button class='results' id='result" + index + "' value='" + data + "'> Resultat </button>"

    tableBody.appendChild(tr)

    const addResult = document.getElementById("result" + index);
    addResult.addEventListener("click", () => {

        addNewResults(data)

    })


}
const popup = document.querySelector("dialog")

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

    console.log(result)

    const updatedData = {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(result)
    }

    const response = await fetch(url, updatedData);

    if (!response.ok) {
        alert("Det gik ikke godt med update");
    } else {
        alert("working")
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

