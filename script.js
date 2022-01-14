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
	'Bräcklig print',
    'Gick sönder i lossning från plattan'
]

var helpMessages = require('./helpMessages.json');

let adventurers = [
    1, 2, 3, 4, 5
]

let finders = [
    1, 2, 3, 4, 5, 6
]

let form = {
    "printer": null,
    "printerNr": null,
    "success": null,
    "reason": null
}

function showPage(selected){
    if (selected == "fail-page" && form.success == true){
        selected = "end-page"
    } 
    if (selected == "help-page" && form.reason == null) {
        selected = "end-page"
    } 
    if(selected == 'end-page'){
        console.log(form)
        fetch("https://printer-success-api.herokuapp.com/", 
            {method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"printer": form.printer, "printerNr": form.printerNr, "success": form.success, "reason": form.reason})
            })
    }
    if(selected == "info-page"){
        document.getElementById("help-title").innerText = "För att undvika " + form.reason
        document.getElementById("help-text").innerText = helpMessages[form.reason]
    }
    pages.forEach(page => {
        document.getElementById(page).style.display = "none"
    });
    document.getElementById(selected).style.display = "block"
}

function selectPrinterType (type) {
    form.printer = type
    if (type == 'Adventurer') {
        printers = adventurers
    } else {
        printers = finders
    }
    printers.forEach(printer => {
        var option = document.createElement("option")
        option.innerText = type + " " + printer
        option.value = printer
        document.getElementById("printer-id").appendChild(option)
    })
}

function addData(data, nextPage, dataType){
    form[dataType] = data
    console.log(data)
    showPage(nextPage)
}

function dataFromDroppDown(dropDownId, nextPage, dataType){
    var e = document.getElementById(dropDownId)
    var data = e.value
    addData(data, nextPage, dataType)
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