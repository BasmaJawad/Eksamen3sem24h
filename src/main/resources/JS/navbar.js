

const navbar = document.querySelector(".wrapper")
const webTite = document.querySelector("title")
const footer = document.getElementById("footerContainer")

navbarSetup()
function navbarSetup(){
    navbar.innerHTML = ' <a href=\'frontpage.html\'id="logo">Roskilde Kapsejlads</a>\n' +
        '        <nav>\n' +
        '            <ul id="navbarWrapper">\n' + /*skriv html filen således: href='\priceTable.html\'*/
        '                <li><a href=boatsFrontpage.html>SejlBåde</a></li>\n' +
        '                <li><a href=\'RacesFrontpage.html\'>Kapsejladser</a></li>\n' +
        '                <li><a href=\'leaderBoard.html\'>Leader Board</a></li>\n' +
        '                <li><a href=\'seasonOverview.html\'>Sæson oversigt</a></li>\n' +
        '            </ul>\n' +
        '        </nav>'

    webTite.innerHTML = 'Roskilde Kapsejlads'

}

function footerSetup(){
    footer.innerHTML = '    <footer>\n' +
        '        © 2023 All rights reserved. <br>\n' +
        '        Designed and developed by...\n' +
        '\n' +
        '    </footer>'
}


//footerSetup()