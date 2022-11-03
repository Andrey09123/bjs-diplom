'Use strict'

const UserForm = new UserForm();
UserForm.loginFormCallback = data => {
	ApiConnector.login(data, response => {
		response.success ? location.reload() : UserForm.setLoginErrorMessage(response.error);
	});
};

UserForm.registerFormCallback = data => {
	ApiConnector.login(data, response => {
		response.success ? location.reload() : UserForm.setRegisterinErrorMessage(response.error);
	});
};