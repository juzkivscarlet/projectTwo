$(document).ready(function() {

	// add on 'hover' listener to Account Button dropdown menu, with sliding animations.
	$("#nav-dropdown-btn").hover(() => {
		$("#nav-dropdown-content").slideDown(500);
	});
	$("#nav-dropdown-content").mouseleave(() => {
		$("#nav-dropdown-content").slideUp(500);
	});

	// highlight active navbar link
	if(window.location.pathname=='/' || window.location.pathname=='/dashboard') $(".nav-link:contains('dashboard')").addClass('active');
	else if(window.location.pathname=='/amusing') $(".nav-link:contains('amuse')").addClass('active');
	else if(window.location.pathname=='/interesting') $(".nav-link:contains('interest')").addClass('active');

	// show modals
	$("#login-modal").on('shown.bs.modal', () => {
		$("#login-modal").trigger('focus');
	});

	$("#signup-modal").on('shown.bs.modal', () => {
		$("#signup-modal").trigger('focus');
	});

	// Login & Signup btns (from respective modals): onclick functions

	$("#login-btn").on('click', (e) => {
		e.preventDefault();
		gatherLoginForm();
		// gatherLoginForm() function definition in ./login.js
	});

	$("#signup-btn").on('click', (e) => {
		e.preventDefault();
		registerUser();
		// registerUser() function definition in ./signup.js
	});
});