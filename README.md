# Work-Day-Scheduler

##Description

Given some boilerplate code a daily planner, I have added to the code to create a functioning planner. The planner displays the current date at the top of the page. It displays time block for an average work day (9am to 5pm) with the colour of the time block changing depending on whether the time has passed (the time block/(s) will be grey), is the present time (the time block will be red), or in the future (the time block/(s) will be green). You can click into each time block and enter in an event and then save the event by pressing the save button. The data is then saved to local storage so that you can refresh the page and your event will persist. You can delete an old event and write down a new one to replace it. Once you are done you can hit save and the old event is deleted from storage and only the new event remains. 

##Installation

No installation needed. The code is deployed as a stand alone page on Git Pages, (https://karra-ormsby.github.io/Work-Day-Scheduler/).

##Usage

This website is a daily planner. At the top of the page you will see the current date displayed. 

![current date](./assets/images/Current%20Date.png)

Beneath that you will see time blocks for each hour of the average work week. Seen below as being 9am - 5pm.

![time blocks](./assets/images/Time%20Blocks.png)

Each time block will be one of three colour. 

![colours of time blocks](./assets/images/Colours%20of%20time%20blocks.png)

The grey represents a time that has already passed, the red represents the current hour, and the green represents time that is still to come in that day. 

The user can click into any of the time blocks and type in an event. They can then click the save button to the right of the time block

![save button](./assets/images/Save%20Button.png)

to save their event.Their event is saved into local storage. Upon clicking the save button a message will be displayed below the date letting the user know that their input has been saved into local storage. 

As the user input is saved into local storage the user can feel free to reload the page and have the confidence that their inout will persist (as long as they continue to use the same web browser).

There is a button, just below the currestn 

##Credits

Starter code provided by Monash Bootcamp (https://git.bootcampcontent.com/Monash-University/MONU-VIRT-FSF-PT-02-2023-U-LOLC/-/tree/main/Week-05/02-Challenge)