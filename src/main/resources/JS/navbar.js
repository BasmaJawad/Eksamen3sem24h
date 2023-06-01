const navbar = document.querySelector(".wrapper")
const footer = document.getElementById("footerContainer")

function navbarSetup(){
    navbar.innerHTML = ' <a href=\'#\'id="logo">titel</a>\n' +
        '        <nav>\n' +
        '            <ul id="navbarWrapper">\n' + /*skriv html filen således: href='\priceTable.html\'*/
        '                <li><a href=boatsFrontpage.html>SejlBåde</a></li>\n' +
        '                <li><a href=\'#\'>titel</a></li>\n' +
        '                <li><a href=\'#\'>titel</a></li>\n' +
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