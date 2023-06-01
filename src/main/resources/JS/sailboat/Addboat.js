


/* Post data JS - når alle informationer bliver givet gennem en form */


const submitBoat = document.getElementById("postBoat");
submitBoat.addEventListener("submit", submitData);


async function submitData(event){

    event.preventDefault();

    const form = event.currentTarget
    const url = "http://localhost:8080/postSailboat";

    try
    {
        const formData = new FormData(form)
        const newObject = Object.fromEntries(formData.entries())


        console.log(newObject)

        const newObjectJsonString = JSON.stringify(newObject)

        const postToDb = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: newObjectJsonString
        }

        const fetchresponse = await fetch(url, postToDb);

        if(!fetchresponse.ok){
            const errorMessage = await response.text()
            throw new Error(errorMessage)
        }
        else {
            alert(`${newObject.name} er oprettet`)
            popup.close();
            fetchBoats()
            //og hvad den skal gøre når den er postet
        }

    } catch (error){
        alert(error.message)
    }

}
