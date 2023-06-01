/* Post data JS - når alle informationer bliver givet gennem en form */


const input = document.getElementById('wednesday-date');

input.addEventListener('change', function () {
    const selectedDate = new Date(this.value);


    if (selectedDate.getDay() !== 3) {
        alert("Du skal vælge en onsdag")
        input.value = ""
    };
});

const submitBtn = document.getElementById("submitData");
submitBtn.addEventListener("click", submitData);

 function submitData() {

    const date = document.getElementById("wednesday-date").value;

    const boatTypeSelect = document.getElementById("boatType");
    const selectedValue = boatTypeSelect.value;

    let newRace = {
        "date": date,
        "boatType": ""
    }

    if (selectedValue === boatTypeSelect.options[0].value) {

        for (let i = 1; i <= 3; i++) {
            newRace.boatType = boatTypeSelect.options[i].value;
            postRace(newRace);
        }

    } else {

        newRace.boatType = selectedValue;
        postRace(newRace)

    }

}

async function restPostRace(newRace){
    const url = "http://localhost:8080/postRace";

    const newRaceJsonString = JSON.stringify(newRace)

    const postToDb = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: newRaceJsonString
    }

    const fetchresponse = await fetch(url, postToDb);
    return fetchresponse;
}

function postRace(newRace){

     const response = restPostRace(newRace);

     if(!response.ok){
         const errorMessage = response.text()
         throw new Error(errorMessage)
     }
        else {
            alert("Postet til DB")
            fetchAllRaces()
     }


}



/// se tabel

const tableBody = document.getElementById("tableBody")

async function fetchAllRaces() {

    const url = "http://localhost:8080/getAllRaces"

    const data = await fetchAny(url)

    tableBody.innerHTML = ""

    data.forEach(putDataInTableWButton)

}

fetchAllRaces()

function putDataInTableWButton(data, index) {

    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + data.date + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" +
        "<button class='participants' id='viewParticipant" + index + "' value='" + data + "'>Se deltagere</button>" +
        "</td>"

    tableBody.appendChild(tr)


    const viewParticipant = document.getElementById("viewParticipant" + index);

    viewParticipant.addEventListener("click", () => {

        localStorage.setItem("race", JSON.stringify(data))
        window.location.href = "EditRace.html"
    })

}

