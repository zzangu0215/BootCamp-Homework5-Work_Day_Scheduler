// declare global variables

// Set the beginning hour to be 8AM
var hourBeginning = moment().startOf('day').add(16,'h');
// totalHours = 8AM to 6PM = 11 hours
var totalHours = 11;
// Get current hour
var currentHour = moment().format('H');
// initializes timeTableElement and currentState of present, future, and past;
var timeTableElement;
var currentState;


function displayToday() {
    // today display
    var today = moment().format("llll");
    $('#currentDay').text(today);
}

function fillTimeTable() {

    for (var hour = 0; hour < totalHours; hour++) { 
        var realHour = hour + 17;
        // add one hour while iterating for loop
        timeTableElement = hourBeginning.add(1,'h').format('HH:mm a');

        // determine the currentState based on the conditions
        if (currentHour == realHour) {
            currentState = 'present';
        } else if (currentHour < realHour) {
            currentState = 'past';
        } else {
            currentState = 'future';
        }

        var appendBlock = 
            `<div id="hour-${realHour}" class="row time-block ${currentState}">
                <div class="col-md-1 hour">${timeTableElement}</div>
                <textarea class="col-md-10 description ${realHour}"></textarea>
                <button class="btn saveBtn col-md-1">
                    <i class="fas fa-save"></i>
                </button>
            </div>`;

        $("#addAll").append(appendBlock);

    }

    loadSchedule();
}

function saveSchedule() {

    var keyName = $(this).parent().attr('id');
    var keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);
}

function loadSchedule() {

    for (var hour = 0; hour < totalHours; hour++) {
        var realHour = hour + 17;
        var loadedSchedule = localStorage.getItem(`hour-${realHour}`);

        $(`.${realHour}`).val(loadedSchedule);
    }

}

// Function calls
displayToday();
fillTimeTable();
$('.saveBtn').on('click', saveSchedule);

setInterval(function() {
    displayToday();
}, 60000);

setInterval(function() {
    fillTimeTable();
}, 600000);
