$(document).ready(function() {
	$.ajax({
		url: "https://icanhazdadjoke.com",
		dataType: 'json'
	}).then((data) => {
		$("#dad-joke").text(data.joke);
	});

	$("#astro-btn").on('click', (e) => {
		e.preventDefault();
		
		$.get('/astrology/'+$("#astro-sign").val(), (data) => {
			$("#horoscope").html(data);
		});
	});
});