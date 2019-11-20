function gatherLoginForm() {
    var formData = {
        username: $("#login-username").val().trim(),
        password: $("#login-password").val().trim()
    };

    userLogin(formData.username, formData.password);
    $("#login-username").val("");
    $("#login-password").val("");
}

function userLogin(user,pass) {
    $.post("/login", {
        username: user,
        password: pass
    }).then(() => {
        window.location.replace("/");
    }).catch((err) => {
        throw err;
    });
}