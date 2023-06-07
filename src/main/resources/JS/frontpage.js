import * as restFunctions from './universal.js';

document.addEventListener("DOMContentLoaded", setup)


async function setup() {

    const upcomingRacesUrl = "http://localhost:8080/upcoming3races"
    const upcomingRaces = await restFunctions.fetchAny(upcomingRacesUrl)

    showRaces(upcomingRaces)

}

function showRaces(upcomingRaces){

    const upcomingRaceDiv = document.getElementById("upcomingRaceDiv")

        upcomingRaces.forEach((race) => {
            const raceDiv = document.createElement("div")
            raceDiv.classList.add("raceDiv")

            const boatTypeString = restFunctions.returnBoatTypeString(race.boatType)
            raceDiv.innerHTML = "Dato: " + race.date + " | " + boatTypeString
            upcomingRaceDiv.appendChild(raceDiv)
    })
}
