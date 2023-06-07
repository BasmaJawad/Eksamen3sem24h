import * as restFunctions from '../universal.js';


 fetchAllResults()

let allResults = []
let longerThan40Results = 0;
let shorterThan25Results = 0;
let between25And40Results = 0;

async function fetchAllResults(){

    const url = "http://localhost:8080/getAllResults"


    allResults = await restFunctions.fetchAny(url)

    const boatTypes = ["LONGERTHAN40", "SMALLERTHAN25", "FROM25TO40"];



    allResults.forEach((result) => {
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

    displayPoints()
}

function displayPoints(){
    const longerThan40Wrapper = document.querySelector("#above40 span")
    const shorterThan25Wrapper = document.querySelector("#under25 span")
    const between25And40Wrapper = document.querySelector("#between25-40 span")

    longerThan40Wrapper.innerHTML = longerThan40Results
    shorterThan25Wrapper.innerHTML = shorterThan25Results
    between25And40Wrapper.innerHTML = between25And40Results

}

/*function findUniqueBoatsInResults(resultList){
    const uniqueBoatsId = new Set()

    resultList.forEach((result) => {
        uniqueBoatsId.add(result.sailboat.id)
    })

    let uniqueBoats = []


    resultList.forEach((result) => {
        if(uniqueBoatsId.has(result.sailboat.id)){ //set.has() returnerer true hvis den har den

            uniqueBoats.push(result)
            uniqueBoatsId.delete(result.sailboat.id) //sletter alle af samme id
        }
    })
    console.log(uniqueBoats)
}

 */