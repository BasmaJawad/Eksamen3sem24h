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
    start.setDate(1);
    while (start.getDay() !== 3) {
        start.setDate(start.getDate() + 1);
    }

    while (start <= endDate) {
        const formattedDate = start.toISOString().split('T')[0];
        wednesdays.push(formattedDate);
        start.setDate(start.getDate() + 7); // Increment by 7 days (1 week)
    }

    return wednesdays;
}



async function createAllRacesFunction() {

    const url = "http://localhost:8080/getAllRaces"
    const postUrl = "http://localhost:8080/postRace";
    const existingRaces = await restFunctions.fetchAny(url)
    const allWednesdays = getWednesdays(); //from 2023-05-01 to 2023-10-01

    const existingRaceDates = existingRaces.map(getDateFromRace)
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

   await fetchAllRaces()


}

function getDateFromRace(race){
    return race.date
}


