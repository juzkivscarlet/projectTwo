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
		this.numDays = this.numberOfDays(name);
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
		// console.log(this);
	};

	// Get correct number of days in said month
	Month.prototype.numberOfDays = function(name) {
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
			if(new Date().getFullYear()%4==0) days = 29;
			else days = 28;
		}
		return days;
	};

	// ON-CLICK FUNCTIONS FOR CALENDAR (Navigation)

	$("#month-prev").on('click', () => {
		changeMonth("prev");
	});

	$("#month-next").on('click', () => {
		changeMonth("next");
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
	
	// STARTUP

	function initCalendar(day) {

		$("#calendar tbody").empty();

		var theMonth = new Month(months[day.getMonth()], day.getFullYear());

		$("#month").text(theMonth.name);
		$("#year").text(day.getFullYear());

		var theCalendar = new Calendar(theMonth);
		theCalendar.writeLayout();
	}

	initCalendar(today);
	
});