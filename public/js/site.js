$(document).ready(function() {

	// add on 'hover' listener to Account Button dropdown menu, with sliding animations.
	$("#nav-dropdown-btn").hover(() => {
		$("#nav-dropdown-content").slideDown(500);
	});
	$("#nav-dropdown-content").mouseleave(() => {
		$("#nav-dropdown-content").slideUp(500);
	});

	// show modals
	$("#login-modal").on('shown.bs.modal', () => {
		$("#login-modal").trigger('focus');
	});

	$("#signup-modal").on('shown.bs.modal', () => {
		$("#signup-modal").trigger('focus');
	});

	// Login & Signup btns: onclick functions

	$("#login-btn").on('click', (e) => {
		e.preventDefault();
	});

	$("#signup-btn").on('click', (e) => {
		e.preventDefault();

		// sample registration
		// var formData = {
		// 	username: "bobrossYo",
		// 	email: 'juskiwmatt@gmail.com',
		// 	password: '123456',
		// 	confirmPassword: '123456',
		// 	firstName: 'Bob',
		// 	lastName: 'Ross'
		// };

		var formData = {
			firstName: $("#firstName").val(),
			lastName: $("#lastName").val(),
			email: $("#email").val(),
			password: $("#password").val(),
			confirmPassword: $("#confirmPassword").val()
		};

		if(validateSignup(formData)) {

			formData.firstName[0] = formData.firstName[0].toUpperCase();
			formData.lastName[0] = formData.lastName[0].toUpperCase();

			var submittedInfo = {
				name: [formData.firstName,formData.lastName].join(" "),
				email: formData.email,
				password: formData.password
			};

			$.ajax({
				type: 'POST',
				url: '/signup',
				data: submittedInfo,
				dataType: 'json'
			}).done((data) => {
				console.log(data);
			});
		} else {
			$("#signup-modal").animate({
				top: '-5%',
				opacity: '0.4'
			},500);

			setTimeout(() => {
				$("#signup-modal").animate({
					top: '0%',
					opacity: '1.0'
				},1000);
			},500);
		}

	});

	var errors = [];

	var validateSignup = (form) => {

		errors = [];

		$("#signup-errors").empty();

		if(form.username==='') {
			errors.push("Username is required");
		}

		if(form.email=='') {
			errors.push('Email is required');
		}

		if(form.firstName=='' || form.lastName=='') {
			errors.push("Full name is required.");
		}

		if(form.password.length < 8 || form.password.length > 20) {
			errors.push("Password must be between 8 and 20 characters");
		}

		if(form.password!=form.confirmPassword) {
			errors.push("Password & confirm password must be identical.");
		}

		validateInputs(form);

		if(errors.length > 0) {
			var errorsList = $("<ul>");
			for(var i=0; i<errors.length; i++) {
				errorsList.append($("<li>").text(errors[i]).addClass("font-italic"));
			}
			$("#signup-errors").append(errorsList);
			return false;
		} else {
			return true;
		}
	};

	var validateInputs = (form) => {
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)==false){
			errors.push("Email must be valid");
		}

		if(form.password.match(/[^(a-z|A-Z|0-9)]/)) {
			errors.push("Passwords may only contain letters (uppercase or lowercase) and numbers");
		}

		if(form.firstName.match(/[^(a-z|A-Z)]/) || form.lastName.match(/[^(a-z|A-Z)]/)) {
			errors.push("Names can only contain uppercase and lowercase letters.")
		}
		
	};
});