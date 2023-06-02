
fetchAllResults()
async function fetchAllResults(){

    const url = "http://localhost:8080/getAllResults"


    const data = await fetchAny(url)

    const boatTypes = ["LONGERTHAN40", "SMALLERTHAN25", "FROM25TO40"];

    let longerThan40Results = 0;
    let shorterThan25Results = 0;
    let between25And40Results = 0;

    data.forEach((result) => {
        if(result.race.boatType == boatTypes[1]){
            shorterThan25Results += result.points
        }
        else if(result.race.boatType == boatTypes[0]){
            longerThan40Results +=result.points
        }
        else{
            between25And40Results +=result.points
        }
    })

    displayPoints(longerThan40Results, shorterThan25Results, between25And40Results)
}

function displayPoints(longerThan40Results, shorterThan25Results, between25And40Results){
    const longerThan40 = document.querySelector("#above40 span")
    const shorterThan25 = document.querySelector("#under25 span")
    const between25And40 = document.querySelector("#between25-40 span")

    longerThan40.innerHTML = longerThan40Results
    shorterThan25.innerHTML = shorterThan25Results
    between25And40.innerHTML = between25And40Results
}