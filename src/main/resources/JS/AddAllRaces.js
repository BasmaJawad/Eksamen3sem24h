document.addEventListener("DOMContentLoaded", () => {localStorage.clear();})

//metode der tilføjer ALLE kapsejladser


function getWednesdays() {
    const wednesdays = [];
    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-10-01');

    // Set the start date to the first Wednesday after or on May 1st
    const start = new Date(startDate);
    start.setDate(1);
    while (start.getDay() !== 3) { // Wednesday: 0 - Sunday, 1 - Monday, ..., 6 - Saturday
        start.setDate(start.getDate() + 1);
    }

    // Iterate through the dates and add Wednesdays to the array
    while (start <= endDate) {
        const formattedDate = start.toISOString().split('T')[0];
        wednesdays.push(formattedDate);
        start.setDate(start.getDate() + 7); // Increment by 7 days (1 week)
    }

    return wednesdays;
}

const createAllRaces = document.getElementById("createAllRaces");

createAllRaces.addEventListener("click", createAllRacesFunction);

async function createAllRacesFunction() {

    const url = "http://localhost:8080/getAllRaces"
    const existingRaces = await fetchAny(url)
    const allWednesdays = getWednesdays(); //from 2023-05-01 to 2023-10-01

    const existingRaceDates = existingRaces.map(getDateFromRace)
    const missingRaces = allWednesdays.filter(date => !existingRaceDates.includes(date))
    const boatTypes = ["LONGERTHAN40", "SMALLERTHAN25", "FROM25TO40"];

    missingRaces.forEach(date => {
        boatTypes.forEach(boatType => {
            const newRace = {
                date: date,
                boatType: boatType
            };
            restPostRace(newRace);
        });
    });
    fetchAllRaces()

}

function getDateFromRace(race){
    return race.date
}


