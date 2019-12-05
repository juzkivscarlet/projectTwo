$(document).ready(function() {

	// GLOBAL VARIABLES

	// today
	var today = new Date();
	// array for Days of the week, since function Date().getDay() returns numbers 0-6.
	const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
	// javascript functions Date().getMonth() & Date().getDat() return numbers 0-11 & 0-6 respectively.
	const months = [
		'January', 'February', 'March', 'April', 'May', 'June', 
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	// CONSTRUCTORS

	// Calendar constructor
	var Calendar = function(month) {
		// Any given month can will span over 4-6 weeks

		// method to write appropriate layout for the month
		this.writeLayout = function() {
			var n;
			if(month.dateLayout.rowSix[0]!=null) n = 6;
			else if(month.dateLayout.rowFive[0]==null) n =4;
			else n = 5;
	
			for(var i=0; i<n; i++) {
				var addedRow = $("<tr>").attr('id',`cal-row${i+1}`);
				for(var j=0; j<7; j++) {
					addedRow.append($("<td>").attr('id',`cal-row${i+1}-col${j+1}`));
				}
				$("#calendar tbody").append(addedRow);
			}
			this.writeCalendar(n, month);
		};

		// method to write dates in the appropriate slots in calendar table
		this.writeCalendar = function(weeks, month) {

			var lastRow;
			var middleRows = [];
			var lastRowDOM = new Array(7);

			if(weeks==4) {
				lastRow = month.dateLayout.rowFour;
				middleRows.push(month.dateLayout.rowTwo, month.dateLayout.rowThree);
			} else if(weeks==5) {
				lastRow = month.dateLayout.rowFive;
				middleRows.push(month.dateLayout.rowTwo, month.dateLayout.rowThree, month.dateLayout.rowFour);
			} else if(weeks==6) {
				lastRow = month.dateLayout.rowSix;
				middleRows.push(month.dateLayout.rowTwo, month.dateLayout.rowThree, month.dateLayout.rowFour, month.dateLayout.rowFive);
			}
			
			for(var i=0; i<7; i++) {
				lastRowDOM[i] = $(`#cal-row${weeks}-col${i+1}`);
			}

			var rows = [month.dateLayout.rowOne, middleRows, lastRow];
			this.writeDate(rows, lastRowDOM, weeks);
		};
		
		this.writeDate = function(rows, lastRowDOM, weeks) {

			for(var i=0; i<7; i++) {
				if(month.dateLayout.rowOne[i]) {
					$(`#cal-row1-col${i+1}`).html(`<span>${rows[0][i]}</span></br>`);
				}
				if(rows[2][i]) {
					lastRowDOM[i].html(`<span>${rows[2][i]}</span></br>`);
				}
				for(var j=1; j<(weeks-1); j++) {
					$(`#cal-row${j+1}-col${i+1}`).html(`<span>${rows[1][j-1][i]}</span></br>`);
				}

			}
		};
		
	};

	// Month constructor
	var Month = function(name, year) {
		this.name = name;
		this.year = year;
		this.numDays = this.numberOfDays(name,year);
		var firstDay = new Date(`${name} 1, ${year}`).getDay();

		var dates = new Array(42);
		for(var i=firstDay; i<(firstDay+this.numDays); i++) {
			dates[i] = parseInt((i+1)-firstDay);
		}
		this.dateLayout = {
			rowOne: dates.slice(0,7),
			rowTwo: dates.slice(7,14),
			rowThree: dates.slice(14,21),
			rowFour: dates.slice(21,28),
			rowFive: dates.slice(28,35),
			rowSix: dates.slice(35)
		};
		console.log(this);
	};

	// Get correct number of days in said month
	Month.prototype.numberOfDays = function(name,year) {
		var n = months.indexOf(months.find((month) => {
			return month == name;
		}));
		var days;

		// month indeces with 31 days: 0,2,4,6, 7,9,11.
		// month indeces with 30 days: 3,5, 8,10.
		// February = 28, unless year is divisible by 4 (leap year), then 29.

		if(n <= 6 && n != 1) {
			if(n%2==0) days = 31;
			else days = 30;
		} else if(n >= 7) {
			if(n%2==0) days = 30;
			else days = 31;
		} else if(n == 1) {
			if(year%4==0) days = 29;
			else days = 28;
		}
		return days;
	};

	// Event constructor
	var Event = function(title, location, startDateObj, endDateObj, startTime, endTime, freq, desc) {
		this.title = title;
		this.location = location;

		this.dateBegin = `${startDateObj.year}-${startDateObj.month}-${startDateObj.day}`;
		this.dateEnd = `${endDateObj.year}-${endDateObj.month}-${endDateObj.day}`;

		this.timeBegin = formatTime(startTime);
		this.timeEnd = formatTime(endTime);
		this.frequency = freq.join(",");

		this.desc = desc;
	};

	Event.prototype.decipherDates = function() {
		var dateBeginArr = this.dateBegin.split("-");
		var dateBeginObj = {
			year: dateBeginArr[0],
			month: dateBeginArr[1],
			day: dateBeginArr[2]
		};

		var dateEndArr = this.dateEnd.split("-");
		var dateEndObj = {
			year: dateEndArr[0],
			month: dateEndArr[1],
			day: dateEndArr[2]
		};
	};

	function formatTime(time) {
		// time[0] = hours, time[1] = minutes, time[2] = AM/PM
		var hour = time[0];
		var min = time[1];
		var ampm = time[2];

		if(min<10) min = "0"+min;

		return hour+":"+min+" "+ampm;
	}

	// ON-CLICK FUNCTIONS FOR CALENDAR (Navigation)

	$("#month-prev").on('click', () => {
		changeMonth("prev");
	});

	$("#month-next").on('click', () => {
		changeMonth("next");
	});

	$("#month-today").on('click', () => {
		initCalendar(today);
	});

	function changeMonth(direction) {
		var oldMonth = months.indexOf($("#month").text());
		var year = parseInt($("#year").text());

		var newMonth;
		if(direction=="prev") {
			// if going back from January to December, newMonth=December & year -= 1
			if(oldMonth==0) {
				newMonth = months[11];
				year--;
			} else newMonth = months[oldMonth-1];
		} else if(direction=="next") {
			// if going forward from December to January, newMonth=January & year += 1
			if(oldMonth==11) {
				newMonth = months[0];
				year++;
			} else newMonth = months[oldMonth+1];
		}

		var firstDay = new Date(`${newMonth} 1, ${year}`);
		initCalendar(firstDay);
	}

	// ON-CLICK FUNCTIONS FOR ACTIONS

	
	// ADD-EVENT MODAL
	$("#add-event-btn").on('click', (e) => {
		e.preventDefault();
		addEvent();
	});

	function addEvent() {
		var startDate = {
			month: months[$("#start-month-picker").val()],
			day: $("#start-day-picker").val(),
			year: $("#start-year-picker").val()
		};

		var endDate;
		if($("#no-end-date").prop('checked')) {
			endDate = startDate;
		} else {
			endDate = {
				month: months[$("#end-month-picker").val()],
				day: $("#end-day-picker").val(),
				year: $("#end-year-picker").val()
			};
		}

		var startTime = [$("#start-time-hour").val(), $("#start-time-min").val(), $("#start-time-ampm").val()];

		var endTime = [$("#end-time-hour").val(), $("#end-time-min").val(), $("#end-time-ampm").val()];

		var freq = [];
		if($("#event-hasfreq").prop('checked')) {
			if($("#event-freq").val()=="monthly") freq = ['monthly'];
			else if($("#event-freq").val()=="weekly") freq = ['weekly'];
			else if($("#event-freq").val()=="biweekly") freq = ['biweekly'];
			else if($("#event-freq").val()=="weekdays") {
				var weekdays=[$("#event-sun"), $("#event-mon"), $("#event-tues"), $("#event-wed"), $("#event-thur"), $("#event-fri"), $("#event-sat")];
				for(var i=0; i<weekdays.length; i++) {
					if(weekdays[i].prop('checked')) freq.push(weekdays[i].attr('value'));
				}
			}

		} else freq = ['none'];

		var eventInfo = new Event($("#event-title").val().trim(), $("#event-location").val().trim(), startDate, endDate, startTime, endTime, freq, $("#event-desc").val().trim());

		$.post("/events/add", eventInfo).then(() => {
			window.location.replace("/");
		}).catch();
	}

	// date picker
	function loadDatePickers(month,day,year,which) {
		if(which=="start") toggleEndDate(false);
		else if(which=="end") toggleEndDate(true);

		for(var i=0; i<months.length; i++) {
			month.append($("<option>").attr('value',i).text(months[i]));
		}
		month.on('change', () => {
			// if month is selected (not default value)
			if(month.val()) {
				var selectedMonth = new Month(months[month.val()], 2019);
				day.empty();
				for(var j=0; j<selectedMonth.numDays; j++) {
					day.append($("<option>").attr('value',(j+1)).text(j+1));
				}
				year.val(today.getFullYear());
				checkDates();
			}
		});
		for(var i=0; i<6; i++) {
			year.append($("<option>").attr('value',2019+i).html(2019+i));
		}
	}

	// enable #end-date-picker, check for changes for #no-end-date
	function checkDates() {
		loadDatePickers($("#end-month-picker"), $("#end-day-picker"), $("#end-year-picker"), "end");
		$("#no-end-date").on('change', () => {
			if($("#no-end-date").prop('checked')) toggleEndDate(false);
			else toggleEndDate(true);
		});
	}

	// if event only occurs on one date, disable #event-date-picker
	function toggleEndDate(enabled) {
		if(!enabled) {
			$("#end-month-picker").val($("#start-month-picker").val()).change().attr('disabled',true);
			$("#end-day-picker").val($("#start-day-picker").val()).change().attr('disabled',true);
			$("#end-year-picker").val($("#start-year-picker").val()).change().attr('disabled',true);
		} else {
			$("#end-month-picker").attr('disabled',false);
			$("#end-day-picker").attr('disabled',false);
			$("#end-year-picker").attr('disabled',false);
		}
	}

	// if event is all-day, disable start-time-picker & end-time-picker
	$("#event-allday").on('change', () => {
		if($("#event-allday").prop("checked")) toggleAllDayEvent(false);
		else toggleAllDayEvent(true);
	});

	function toggleAllDayEvent(enabled) {
		if(!enabled) {
			$("#start-time-hour").val(12).change().attr('disabled',true);
			$("#start-time-min").val(0).change().attr('disabled',true);
			$("#start-time-ampm").val("am").change().attr('disabled',true);

			$("#end-time-hour").val(11).change().attr('disabled',true);
			$("#end-time-min").val(55).change().attr('disabled',true);
			$("#end-time-ampm").val("pm").change().attr('disabled',true);
		} else {
			$("#start-time-hour").attr('disabled',false);
			$("#start-time-min").attr('disabled',false);
			$("#start-time-ampm").attr('disabled',false);

			$("#end-time-hour").attr('disabled',false);
			$("#end-time-min").attr('disabled',false);
			$("#end-time-ampm").attr('disabled',false);
		}
	}

	// if event repeats, enable #event-freq
	$("#event-hasfreq").on('change', () => {
		if($("#event-hasfreq").prop('checked')) {
			toggleEventFrequency(true);
			toggleEndDate(true);
		}
		else toggleEventFrequency(false);
	});
	
	function toggleEventFrequency(enabled) {
		if(!enabled) {
			$("#event-freq").attr('disabled',true);
			$("#event-daypicker").css('display','none');
		} else {
			$("#event-freq").attr('disabled',false);
			if($("#event-freq").val()=="weekdays") $("#event-daypicker").css('display','block');
		}
	}

	$("#event-freq").on('change', () => {
		if($("#event-freq").val()=="weekdays") $("#event-daypicker").css('display','block');
		else $("#event-daypicker").css('display','none');
	});

	// STARTUP

	function initCalendar(day) {

		$("#calendar tbody").empty();

		var theMonth = new Month(months[day.getMonth()], day.getFullYear());

		$("#month").text(theMonth.name);
		$("#year").text(day.getFullYear());

		var theCalendar = new Calendar(theMonth);
		theCalendar.writeLayout();
	}

	function getEvents(month, year) {
		$.get('/events', (data) => {
			// put events on the month's calendar
		});
	}

	toggleEventFrequency(false);

	initCalendar(today);
	loadDatePickers($("#start-month-picker"), $("#start-day-picker"), $("#start-year-picker"), "start");

	// load tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
});