console.log("sejlbåde tabel")
const tableBody = document.getElementById("tableBody")


const popup = document.querySelector("dialog")

document.querySelector(".button-container button").addEventListener("click", () => {
    popup.showModal(); //built in function to show popup
});

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
    popup.close();
})
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function fetchBoats() {

    const url = "http://localhost:8080/getAllBoats"

    const data = await fetchAny(url)

    tableBody.innerHTML = ""

    data.forEach(putDataInTableWButton)

}

fetchBoats()


function putDataInTableWButton(data, index) {

    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + data.id + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" + data.name + "</td>" +
        "<td>" +
        "<button class='editBtn' id='editBtn" + index + "' value='" + data + "'>Rediger</button>" +
        "</td>" +
        "<td>" +
        "<button class='racesBtn' id='racesBtn" + index + "' value='" + data + "'>Resultater</button>" +
        "</td>" +
        "<td>" +
        "<button class='deleteBtn' id='deleteBtn" + index + "' value='" + data + "'>Slet</button>" +
        "</td>"

    tr.row = index

    tableBody.appendChild(tr)


    const editBtn = document.getElementById("editBtn" + index);
    const racesBtn = document.getElementById("racesBtn" + index);
    const deleteBtn = document.getElementById("deleteBtn" + index);


    editBtn.addEventListener("click", () => {
        editBoat(data)
    })

}

function editBoat(data) {

    popup.showModal()

    const nameField = document.getElementById("name")
    nameField.value = data.name

    const boatTypeField = document.getElementById("boatType")
    boatTypeField.value = data.boatType

    const submitBoat = document.getElementById("postBoat");

    submitBoat.addEventListener("submit", updateBoat);

    //tilføjer hidden id felt til formen

    const form = document.getElementById("postBoat")
    const idField = document.createElement("input")
    idField.type = "hidden"
    idField.name = "id"
    idField.value = data.id
    form.appendChild(idField)

}

async function updateBoat(id, event) {

    event.preventDefault();
    const form = event.currentTarget

    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())


    const url = "http://localhost:8080/updateData/" + newObject.id;

    const updatedData = {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newObject)
    }

    //calls backend and wait for return
    const response = await fetch(url, updatedData);

    if (!response.ok) {
        alert("Det gik ikke godt med update");
    }
    else {
        alert("Data er opdateret");
        popup.close();
        fetchBoats();
    }

    return response;
}