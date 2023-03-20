// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });

//documnet.ready


var saveBtn = $(".saveBtn");
var saveIcon = $(".fa-save");
var savedToStorageEl = $("#saved-to-storage");
var header = $("header");
var eventHour;
var eventId;
var calendarEvent = JSON.parse(localStorage.getItem("calendarEvent")) || [];

displayDate();
setHourBlocks();

//displays the current date
function displayDate() {
  var today = dayjs().format('dddd DD[th of] MMMM');
  $("#currentDay").text(today);
}

//changes the colour of each hour block depending on whether it is past, present, or future
function setHourBlocks () {
  //gets the current hour in 24 hour time and converts it into an int
  var currentHour = parseInt(dayjs().format('HH'));
  var hourBlockEl;

  for(i = 0; i <= 8; i++) {
    //gets the <div> for each hour block
    hourBlockEl = $('body').children("div").children().eq(i);
    //gets the id of the <div> after the '-' and converts it into an int
    hourNum = parseInt(hourBlockEl.attr("id").split('-')[1]);

    //compares the current hour with the hour of the hour block and changes the colour of each hour block depending on whether it is past, present, or future
    if (currentHour < hourNum) {
      hourBlockEl.addClass("future");
    } else if (currentHour > hourNum) {
      hourBlockEl.addClass("past");
    } else {
      hourBlockEl.addClass("present");
    }
  }
}

//when user clicks the blue save button then a function is run to save the event to local storage
saveBtn.on("click", function(event) {
  var element = event.target;
  saveEvent(element)
});

//if the user clicks the floppy disc icon instead of the blue button it will still run the function to save the event to local storage
saveIcon.on("click", function(event){
  event.stopPropagation();
  var element = event.target;
  var button = $(element).parent();
  saveEvent(button);
});

//gets the event inputed from the user and saves it to local storage
function saveEvent (element) {
  //gets the <textarea> of the save button that has been clicked
  var textArea = $(element).prev();
  //gets the value from the <textarea>
  var textInput = textArea.val();

  //gets the <div> hour block assoicated with the save button and <textarea>
  eventHour = textArea.parent();
  //gets the id from the <div>
  eventId = eventHour.attr("id");

  //if there is already an input for a timeslot, delete that event and replace it with the new one
  for(i = 0; i < calendarEvent.length; i++) {
    if (calendarEvent[i].hour === eventId) {
      delete calendarEvent[i].hour;
      delete calendarEvent[i].input;
      calendarEvent.splice(i, i);
    }
  }
  
  //saved the user input into an object with the associated id of the hour block
  var scheduledEvent = {
    hour: eventId,
    input: textInput
  }

  //saves the object to an array (either an empty array or an array from local storage)
  calendarEvent.push(scheduledEvent);
  //saves to local storage
  localStorage.setItem("calendarEvent", JSON.stringify(calendarEvent));

  //tells the user that their data has been saved
  savedToStorageEl.text(textInput + " saved to local Storage!");
  header.append(savedToStorageEl);
}

getEvent();

//retrieves events from local storage and writes it to the hour block it was saved into
function getEvent () {
  for(i = 0; i < calendarEvent.length; i++) {
    var savedEvent = $('body').find("#" + calendarEvent[i].hour).children("textarea");
    savedEvent.append(calendarEvent[i].input);
  }
}
