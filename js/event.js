(function(){
	
$("#eventName").html(localStorage.getItem('eventName'));
$("#eventType").html(localStorage.getItem('eventType'));
$("#eventTime").html(localStorage.getItem('eventStart') + " to " + localStorage.getItem('eventEnd'));
$("#eventHost").html(localStorage.getItem('eventHost'));
$("#eventDescription").html(localStorage.getItem('eventDescription'));
$("#location").html(localStorage.getItem('eventAddress') + "<br/>" + localStorage.getItem('eventCity') + ", " + localStorage.getItem('eventState'));
$("#attendees").html(localStorage.getItem('attendees'));



	
})();