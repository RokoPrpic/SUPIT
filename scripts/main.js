
//Contact form
function openForm() {
    document.getElementById("contact").style.display = "block";
}
function closeForm() {
    document.getElementById("contact").style.display = "none";
}


//Classes table
// Get json arr all classes
const xhrOne = new XMLHttpRequest();
xhrOne.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
        var arrClasses = JSON.parse(this.responseText);
        // Search bar autocomplete
        function autocomplete(inp, arr) {
            var currentFocus;
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                this.parentNode.appendChild(a);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].label.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        b = document.createElement("DIV");
                        b.innerHTML = "<strong>" + arr[i].label.substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].label.substr(val.length);
                        b.innerHTML += "<input type='hidden' value='" + arr[i].label + "'>";
                        let classID = arr[i].value;
                        b.addEventListener("click", function (e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            var url = "http://www.fulek.com/VUA/supit/GetKolegij/" + classID;
                            // Add to table on select
                            var xTwo = new XMLHttpRequest();
                            xTwo.onreadystatechange = function () {
                                if (this.readyState === XMLHttpRequest.DONE) {
                                    let obj = JSON.parse(this.responseText);
                                    let store = [];
                                    store.push(obj);
                                    //document.getElementById("demo").innerHTML = store[0].kolegij + obj.tip;

                                    let table = document.querySelector(".tc");
                                    let tableBody = document.querySelector(".tbody")
                                    let data = Object.keys(store[0]);

                                    generateTable(tableBody, store);
                                    generateTableHead(table, data);
                                    generateTableFoot(table);
                                    sumECTS();
                                    sumH();
                                }
                            };
                            xTwo.open('get', url, true);
                            xTwo.send();
                            // end add
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            inp.addEventListener("keydown", function (e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    currentFocus++;
                    addActive(x);
                } else if (e.keyCode == 38) {
                    currentFocus--;
                    addActive(x);
                } else if (e.keyCode == 13) {
                    e.preventDefault();
                    if (currentFocus > -1) {
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                if (!x) return false;
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }
        autocomplete(document.getElementById("srcbar"), arrClasses);
        // end get
    }
};
xhrOne.open('get', 'http://www.fulek.com/VUA/SUPIT/GetNastavniPlan', true);
xhrOne.send();


function generateTableHead(table, data) {
    generateTableHead = function () { };
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        // let tbody = table.createTBody();
        // tbody.id = "tbodyID";
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        let cell = row.insertCell();
        let btn = document.createElement('input');
        cell.appendChild(btn);
        btn.type = "button";
        btn.value = 'Delete';
        btn.className = 'btn_remove';
        btn.setAttribute('onclick', 'deleteRowBody(this)');
    }
}

function generateTableFoot(table) {
    generateTableFoot = function () { };
    let tfoot = table.createTFoot();
    let tfRow = tfoot.insertRow(0);
    let tfVoid = tfRow.insertCell(0);
    let tfUkupno = tfRow.insertCell(1);
    tfUkupno.innerHTML = "Ukupno";
    var tfEcts = tfRow.insertCell(2);
    // tfEcts.innerHTML = sumECTS();
    var tfSati = tfRow.insertCell(3);
    // tfSati.innerHTML = sumH();
}

function deleteRowBody(r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tbodyID").deleteRow(i-1);
    sumECTS();
    sumH();
}

function sumECTS() {
    // let t = document.getElementById("tbodyID");
    let s = 0;
    for (let i = 0; i < this.document.getElementById("tbodyID").rows.length; i++) {
        s += parseInt(this.document.getElementById("tbodyID").rows[i].cells[2].innerHTML);
    } this.document.getElementById("tfootID").rows[0].cells[2].innerHTML = s;
}

function sumH() {
    let h = 0;
    for (let i = 0; i < this.document.getElementById("tbodyID").rows.length; i++) {
        h += parseInt(this.document.getElementById("tbodyID").rows[i].cells[3].innerHTML);
    } this.document.getElementById("tfootID").rows[0].cells[3].innerHTML = h;
}



// gmaps
/*
function initMap() {
    var algebra = { lat: 45.813630, lng: 15.936660 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: algebra });
    var marker = new google.maps.Marker({ position: algebra, map: map });
}
google.maps.event.addDomListener(window, 'load', initMap); */






 
