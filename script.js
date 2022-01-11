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
    if(selected == 'end-page'){
        console.log(form)
        fetch("https://printer-success-api.herokuapp.com/", 
            {method:"POST",
            headers: {
                'Content-Type': 'json'
            },
            body: JSON.stringify(form)
            })
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