//import * as restFunctions from './universal.js';
export function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

export async function restUpdateData(url, data) {

    const updatedData = {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    }

    const response = await fetch(url, updatedData);

    if (!response.ok) {
        alert("Det gik ikke godt med update");
    } else {
        alert("Data er opdateret");
    }

    return response;

}

export async function restDeleteData(url, data) {

    const deleteData = {
        method: "DELETE",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    }

    const response = await fetch(url, deleteData)

    if (!response.ok) {
        alert("Kunne ikke slette")

    } else {
        alert("Slettet")
    }

    return response

}

export async function restPostData(url, data, showAlert) {

    const postData = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    }

    try {


        const response = await fetch(url, postData)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage)


        } else {
            if (showAlert) {
                alert("Oprettet")
            }
        }

        return response
    } catch (error) {
        alert(error.message)
    }

}

export function returnBoatTypeString(boatype){

    if (boatype == "LONGERTHAN40")
        return "Større end 40 fod"
    else if (boatype == "SMALLERTHAN25")
        return "Mindre end 25 fod"
    else if (boatype == "FROM25TO40")
        return "Mellem 25 og 40 fod"
    else
        return boatype

}

export function dateFormat(date){
    const parts = date.split("-");
    const formattedDate = parts[2] + "/" + parts[1] + "-" + parts[0];
    return formattedDate;

}