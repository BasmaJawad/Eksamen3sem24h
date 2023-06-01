/* Post data JS - når alle informationer bliver givet gennem en form */



const input = document.getElementById('wednesday-date');

input.addEventListener('change', function() {
    const selectedDate = new Date(this.value);


    if (selectedDate.getDay() !== 3) { // 3 corresponds to Wednesday (Sunday = 0, Monday = 1, Tuesday = 2, etc.)
        alert("Du skal vælge en onsdag")
    };
});

const submitBtn = document.getElementById("submitData");
submitBtn.addEventListener("click", submitData);
async function submitData() {

    const date = document.getElementById("wednesday-date").value;

    const boatTypeSelect = document.getElementById("boatType");
    const selectedValue = boatTypeSelect.value;

    let newRace = {
        "date": date,
        "boatType": ""
    }

    if (selectedValue === boatTypeSelect.options[0].value) {
        //HVIS ALLE 3
    } else {

        newRace.boatType = selectedValue;

    }

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

    if (!fetchresponse.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    } else {
        alert("Postet til DB")
        //og hvad den skal gøre når den er postet
    }

}




