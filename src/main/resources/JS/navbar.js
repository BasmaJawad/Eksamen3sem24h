function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}


const navbar = document.querySelector(".wrapper")
const footer = document.getElementById("footerContainer")

function navbarSetup(){
    navbar.innerHTML = ' <a href=\'frontpage.html\'id="logo">Roskilde kapsejlads</a>\n' +
        '        <nav>\n' +
        '            <ul id="navbarWrapper">\n' + /*skriv html filen således: href='\priceTable.html\'*/
        '                <li><a href=boatsFrontpage.html>SejlBåde</a></li>\n' +
        '                <li><a href=\'RacesFrontpage.html\'>Kapsejlads</a></li>\n' +
        '                <li><a href=\'seasonOverview.html\'>Sæson oversigt</a></li>\n' +
        '            </ul>\n' +
        '        </nav>'

}

function footerSetup(){
    footer.innerHTML = '    <footer>\n' +
        '        © 2023 All rights reserved. <br>\n' +
        '        Designed and developed by...\n' +
        '\n' +
        '    </footer>'
}

navbarSetup()
footerSetup()