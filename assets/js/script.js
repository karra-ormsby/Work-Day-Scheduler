$(document).ready(function () { 
  var saveBtn = $(".saveBtn");
  var clearBtn = $('.clearBtn');
  var textArea = $('teaxtarea');
  var saveIcon = $(".fa-save");
  var savedToStorageEl = $("#saved-to-storage");
  var header = $("header");
  var eventHour;
  var eventId;
  var calendarEvent = JSON.parse(localStorage.getItem("calendarEvent")) || [];
  

  displayDate();
  setHourBlocks();
  getEvent();

  //displays the current date
  function displayDate() {
    var today = dayjs().format('dddd DD[ of] MMMM');
    $("#currentDay").text(today);

    var currentDate = {
      day: today
    }

    //checks if it is a new day
    if (calendarEvent.length > 0 && "day" in calendarEvent[0]) {
      //if it is clear the local stoarg and the input on the page
      if (calendarEvent[0].day !== today) {
        localStorage.clear();
        $("input[type=text], textarea").val("");
      }
    }
    calendarEvent.shift();
    calendarEvent.unshift(currentDate);
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
        calendarEvent.splice(i, 1);
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

  //retrieves events from local storage and writes it to the hour block it was saved into
  function getEvent () {
    for(i = 0; i < calendarEvent.length; i++) {
      var savedEvent = $('body').find("#" + calendarEvent[i].hour).children("textarea");
      savedEvent.append(calendarEvent[i].input);
    }
  }


  //when the clear event button is clicked by the user the local storage is cleared and all of the schedule hour blocks are cleared too
  clearBtn.on("click",function (event) {
    localStorage.clear();
    $("input[type=text], textarea").val("");

  });

});