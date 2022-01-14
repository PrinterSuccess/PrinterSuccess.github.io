let pages = [
    "start-page",
    "location-page",
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
	'Fel toleranser',
	'Printade inte klart',
	'Ojämn printyta',
	'Dålig fil',
	'Bräcklig print',
    'Gick sönder i lossning från plattan'
]

var helpMessages = {
    "För lite filament": " -Innan du börjar printen kom ihåg att kolla att det finns tillräckligt med filament på rullen\n -Du kan i exporten i flashPrint se hur många meter filament printern behöver.",
    "Filament sprucket": " -Du kan kolla innan du börjar printa att filamentet inte har en befintilig spricka.\n -Om möjligt kolla till printen och se om filamentet gått av under tiden, i stå fall Kan du bara mata in den avbrutna änden i inmatningen när den delen i printetn når matningen.",
    "Fastnade inte": " -Kan beror på att printern är felkalibrerad och printade på för hög höjd, då kan man gå in i printerns inställningar och kalibrera. \n -Kan vara dåligt fäste mot bottenplanan, går då att limma plattan med vanligt papperslim.",
    "Warping": " -Se till att det första lagret fasnar bra\n -Du kan använda lim eller använda en adventurer eftersom dem har uppvärmnng till basen",
    "Inga supports": " -Kom ihåg att placera supports i flashprint\n -Kom ihåg att ta med supports när du slicear",
    "Stringing": " -Se till att du har supports på din print på ytor som har mer än 45 graders vinkel",
    "Fel toleranser": " -Du kan använda verktyg så som fil och kniv att justera felmarginalerna på din print\n -Kom ihåg att ha med lite felmarginaler när du ritar upp din fil. Det bästa är då att mäta hur stort felet var. Oftast brukar felmarginaler på ca 0.5mm bli bra.",
    "Printade inte klart": " -Kan bero på att strömmen till printern stängdes av under printing, inte mycke man själv kan påverka\n -Någon avbröt din print. Kan bero på att den såg ett fel komma. Se till att ha ditt namn först i filnamnet så kan man säga till dig om det händer. Man har även rätt att stänga av någon annans print oavsett anledning om man inte har sitt namn i filen.",
    "Ojämn printyta": " -Se till att printytan är ren och inte har lim eller plast på sig",
    "Dålig fil": " -Kom ihåg att ha rätt inställningar när du exporterar från Inventor. Enheter i millimeter och upplösning high. \n -Kontrollera slicen ser bra ut i flashprint och att enheter m.m. är rätt inställt. \n -Se till att mata ut USB minnet korrekt",
    "Bräcklig print": " -Se till att H tillräckligt tjocka väggar och delar i inventor. Rekommenderat är över 1.5mm i de flesta fallen.\n -Försök kontrollera att printern kunde matas ordentligt. Kan bero på att printern inte fick tillräckligt med filament. ",
    "Gick sönder i lossning från plattan": " -Var försiktig i lossning, använd verktygen som finns tillgängliga. Adventure plattorna gåt att böja vilket ofta är enklare.\n -Se till att ha en reaktivt hållbar botten. Är din botten tunn/bräcklig försök rotera så du har en hållbarare sida ner eller testa att använda en raft."
}

let printers

let printerLocation

let adventurers = [
    1, 2, 3, 4
]

let finders = [
    1, 2, 3, 4, 5, 6
]

produktionAdventurers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

let form = {
    "printer": null,
    "printerNr": null,
    "success": null,
    "reason": null
}

function showPage(selected){
    switch (selected) {
        case "printer-page":
            if (printerLocation == "produktion"){
                selectPrinterType("adventurer")
                selected = "printer-id-page"
            }
            break
        case "fail-page":
            if (form.success == true){
                selected = "end-page"
            }
            break
        case "help-page":
            if (form.reason == null) {
                selected = "end-page"
            }
            break
        case "info-page":
            document.getElementById("help-title").innerText = "För att undvika " + form.reason
            document.getElementById("help-text").innerText = helpMessages[form.reason]
            break
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

    pages.forEach(page => {
        document.getElementById(page).style.display = "none"
    });
    document.getElementById(selected).style.display = "block"
}

function selectLocation (location){
    form.printer = location + "-"
    printerLocation = location
}

function selectPrinterType (type) {
    form.printer += type

    if (printerLocation == "produktion"){
        printers = produktionAdventurers
    } else {
        if (type == 'Adventurer') {
            printers = adventurers
        } else {
            printers = finders
        }
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