const warr = ["Budi izvrstan u onom što vidiš!", "voliš.", "Zaiskri"];
let i = 0;
let ti;

function typeEffect() {
    let w = warr[i].split("");
    var loopType = function () {
        if (w.length > 0 && i != 2) {
            document.getElementById('t1').innerHTML += w.shift();
        }
        else {
            delEffect();
            return false;
        };
        ti = setTimeout(loopType, 135);
    };
    loopType();
};


function typeSec() {
    let w = warr[i].split("");
    document.getElementById('t2').innerHTML = "<br/>";
    var loopType = function () {
        if (w.length > 0) {
            document.getElementById('t2').innerHTML += w.shift();
        }
        else {
            document.getElementById('t3').innerHTML = ".";
            delEffect();
            return false;
        };
        ti = setTimeout(loopType, 135);
    };
    loopType();
};
typeEffect();

function delEffect() {
    let w = warr[i].split("");
    var loopDelete = function () {
        if (w.length > 25) {
            w.pop();
            document.getElementById('t1').innerHTML = w.join("");
        } else {
            if (warr.length > (i + 1)) {
                i++;
            } else {
                return false;
            };
            if (i < 2) {
                typeEffect();
                return false;
            } else {
                typeSec();
                return false;
            }
        };
        ti = setTimeout(loopDelete, 135);
    };
    loopDelete();
};
