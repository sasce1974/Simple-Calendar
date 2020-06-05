//Thanks to Nitin Patel
//http://iamnitinpatel.com/projects/calendar/
//Referenced from https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d



const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
let currentMonth = thisMonth;
let currentYear = thisYear;
const monthName = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September',
    'October', 'November', 'December'];
const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function showCalendar(month = null, year = null) {


    if(year === null) year = thisYear;
    if(month === null) month = thisMonth;



    let firstDayInMonth = (new Date(year, month)).getDay();

    let output;
    output = "<table>";
    output +="<thead><tr><th class='chooseBtn' onclick='previous()'>&#171;</th>" +
        "<th class='chooseBtn' id='date' colspan='5' onclick='chooseDate()'>" +
        monthName[month] + " " + year +
        "</th><th class='chooseBtn' onclick='next()'>&#187;</th></tr>";
    output += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>";
    output += "</thead>";
    output += "<tbody>";

    let day = 1;
    for(let i=0; i<6; i++){
        output += "<tr>";
        for(let j=0; j<7; j++){
            if(i === 0 && j < firstDayInMonth){
                output += "<td></td>";
            }else if(day > daysInMonth(month, year)){
                output += "<td></td>";
            }else{
                if (day === today.getDate() && year === thisYear && month === thisMonth){
                    output += "<td id='today'>" + day + "</td>";
                }else {
                    output += "<td>" + day + "</td>";
                }
                day++
            }
        }
        output += "</tr>";
    }
    output += "</tbody>";
    output += "</table>";

    let calendar = document.getElementById("calendar");
    calendar.innerHTML = output;

}

function daysInMonth(month, year){
    return 32 - new Date(year, month, 32).getDate();
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function chooseDate() {
    const dateCell = document.getElementById('date');
    let tempCell = dateCell;
    tempCell.removeAttribute('onclick');

    let newCell = "<select id='year'>";
    for(let i = (thisYear-100); i<(thisYear + 100); i++){
        newCell += "<option value=" + i + ((i === thisYear) ? " selected" : "") + ">" + i + "</option>";
    }
    newCell += "</select>";


    newCell += "<select id='month'>";
    for(let i = 0; i<12; i++){
        newCell += "<option value=" + i + ((i === thisMonth) ? " selected" : "") + ">" + monthName[i] + "</option>";
    }
    newCell += "</select>";
    newCell += "<button type='button' onclick='jump()'>OK</button>";
    tempCell.innerHTML = newCell;
}


function jump() {
    const selectMonth  = document.getElementById('month');
    const selectYear = document.getElementById('year');
    currentYear = parseInt(selectYear.value) || currentYear;
    currentMonth = parseInt(selectMonth.value) || currentMonth;
    showCalendar(currentMonth, currentYear);
}
