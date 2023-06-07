import * as restFunctions from '../universal.js';


const urlBoats = "http://localhost:8080/getAllBoats"
const allboats = await restFunctions.fetchAny(urlBoats)


const urlResults = "http://localhost:8080/getAllResults"
const allResults = await restFunctions.fetchAny(urlResults)

setup()
function setup(){
    findTop3()
    leaderBoardTable()
}


function pointTotal(){

    const hashMap = new Map()

    allboats.forEach((boat) => {

        let totalPoints = 0

        allResults.forEach((result) => {
            if (boat.id === result.sailboat.id) {
               totalPoints += result.points
            }
        })
        if (totalPoints !== 0)
            hashMap.set(boat, totalPoints)
    })

    return hashMap

}

function topPoints(){

    let top = []

    let mapOfBoatsAndPoints = pointTotal()


    let i = 0
    while (mapOfBoatsAndPoints.size > 0) {

        let lowestValue = Infinity
        let keyWithLowestValue = null

        mapOfBoatsAndPoints.forEach((value, key) => {

            if (value < lowestValue) {
                lowestValue = value;
                keyWithLowestValue = key;
            }
        })

        mapOfBoatsAndPoints.delete(keyWithLowestValue)


        const winner = {
            place: i + 1,
            boat: keyWithLowestValue,
            totalpoints: lowestValue,
        }

        top.push(winner)
        i++
    }

    return top
}

function findTop3(){
    const top3 = topPoints()

    showTop3(top3[0],"top1")
    showTop3(top3[1],"top2")
    showTop3(top3[2],"top3")


}
function showTop3(boatAndPoints, htmlId){


    const boatName = document.querySelector(`#${htmlId} .boatName`)
    const points = document.querySelector(`#${htmlId} .points`)
    const boatType = document.querySelector(`#${htmlId} .boatType`)

    boatName.innerHTML = boatAndPoints.boat.name
    points.innerHTML = "POINTS: " + boatAndPoints.totalpoints

    const boattypeString = restFunctions.returnBoatTypeString(boatAndPoints.boat.boatType)
    boatType.innerHTML = boattypeString

}


function leaderBoardTable(){
    const list = topPoints()

    list.forEach((data) => {

        const tableBody = document.getElementById("tableBody")

        const tr = document.createElement("tr")

        const boattypeString = restFunctions.returnBoatTypeString(data.boat.boatType)

        tr.innerHTML =
            "<td class='place'>" + data.place + "</td>" +
            "<td>" + data.boat.name + "</td>" +
            "<td>" + data.totalpoints + "</td>" +
            "<td>" + boattypeString + "</td>"

        tableBody.appendChild(tr)
    })

}

