$(document).ready(function() {
	$("#login-modal").on('shown.bs.modal', function() {
		$("#login-modal").trigger('focus');
	});

	$("#signup-modal").on('shown.bs.modal', function() {
		$("#signup-modal").trigger('focus');
	});
});