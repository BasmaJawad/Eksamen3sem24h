import * as restFunctions from '../universal.js';
import { fetchAllRaces } from './racesFrontpage.js';
document.addEventListener("DOMContentLoaded", () => {localStorage.clear();})

//metode der tilføjer ALLE kapsejladser

const createAllRaces = document.getElementById("createAllRaces");
createAllRaces.addEventListener("click", createAllRacesFunction);


function getWednesdays() {

    let wednesdays = [];
    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-10-01');

    const start = new Date(startDate);
    start.setDate(1); // Start at the first day of the month
    while (start.getDay() !== 3) { // Find the first Wednesday
        start.setDate(start.getDate() + 1); // Increment the date by 1 day until you get to a Wednesday
    }

    while (start <= endDate) { // Loop until you get to the end date
        const formattedDate = start.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        wednesdays.push(formattedDate);
        start.setDate(start.getDate() + 7);
    }

    return wednesdays;
}



async function createAllRacesFunction() {

    const url = "http://localhost:8080/getAllRaces"
    const postUrl = "http://localhost:8080/postRace";

    const existingRaces = await restFunctions.fetchAny(url)
    const allWednesdays = getWednesdays(); //from 2023-05-01 to 2023-10-01

    const existingRaceDates = existingRaces.map(getDateFromRace) // Ny liste med alle datoer fra eksisterende ræs
    const missingRaces = allWednesdays.filter(date => !existingRaceDates.includes(date))

    const boatTypes = ["LONGERTHAN40", "SMALLERTHAN25", "FROM25TO40"];

    for (const date of missingRaces) {
        for (const boatType of boatTypes) {
            const newRace = {
                date: date,
                boatType: boatType
            };
             await restFunctions.restPostData(postUrl, newRace,false);
        }
    }
    alert("Alle ræs oprettet fra 1.maj til 1.oktober 2023")

   await fetchAllRaces()


}

function getDateFromRace(race){
    return race.date
}


