$(document).ready(function() {
	$.ajax({
		url: "https://icanhazdadjoke.com",
		dataType: 'json'
	}).then((data) => {
		$("#dad-joke").text(data.joke);
	});
});