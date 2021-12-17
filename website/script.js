let pages = [
    "start-page",
    "printer-page", 
    "printer-id-page", 
    "fail-page", 
    "help-page", 
    "info-page", 
    "end-page"
]

let failReasons = [	
    'För lite filament',
	'Filament sprucket',
	'Fastnade inte',
	'Warping',
	'Inga supports',
	'Stringing',
	'För tunna lager',
	'Fel toleranser',
	'Printade inte klart',
	'Ojämn printyta',
	'Dålig fil',
	'Bräcklig print'
]

function showPage(selected){
    pages.forEach(page => {
        console.log(page)
        document.getElementById(page).style.display = "none"
    });
    document.getElementById(selected).style.display = "block"
}

function sendData(data, nextPage){
    // fire base code here
    console.log(data)
    showPage(nextPage)
}

function dataDromDroppDown(dropDownId, nextPage){
    var e = document.getElementById(dropDownId)
    var data = e.value
    sendData(data, nextPage)
}

document.addEventListener('DOMContentLoaded', function () {
    pages.forEach(page => {
        document.getElementById(page).style.display = "none"
    })
    document.getElementById("start-page").style.display = "block"

    failReasons.forEach(reason => {
        var option = document.createElement("option")
        option.innerText = reason
        option.value = reason
        document.getElementById("fail-reason").appendChild(option)
    });
}, false);