const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();


logoutButton.action = () => {
	ApiConnector.logout(collback => {
		if(collback.success) {
			location.reload();
		}
	});
};

//Информация о пользователе
ApiConnector.current(data => {
	if(data.success) {
		profileWidget(data.data);
	}
});

//Курс валют
function api() {
	ApiConnector.getStocks(data => {
		if(data.success) {
			ratesBoard.clearTable;
			ratesBoard.fillTable(data.data);
		}
	});
};

function apiPerMinute() {
	setInterval(api(), 60000);
}
apiPerMinute();

moneyManager.addMoneyCollback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if(response.success) {
			profileWidget.showProfile(response.data);
			moneyManager.setMessage(false, `Успешное пополнение баланса`);
		} 
		else {
			moneyManager.setMessage(true, response.data);
		}
	});
}

moneyManager.conversionMoneyCollback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if(response.success) {
			profileWidget.showProfile(response.data);
			moneyManager.setMessage(false, `Успешная конвертация`);
		} 
		else {
			moneyManager.setMessage(true, response.data);
		}
	});
}

moneyManager.sendMoneyCollback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		console.log(response);
		if(response.success) {
			profileWidget.showProfile(response.data);
			moneyManager.setMessage(false, `Успешный перевод`);
		} 
		else {
			moneyManager.setMessage(true, response.data);
		}
	});
}

//Работа с Избранным
ApiConnector.getFavorites(function(response) {
	if(response.success) {
		console.log(response);
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUserList(response.data);
	}
});

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUserList(response.data);
			moneyManager.setMessage(false, `Успешное добавление`);
		}
		else {
			moneyManager.setMessage(true, response.data);
		}
	});
}

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUserList(response.data);
			favoritesWidget.setMessage(false, `Успешное удаление`);
		}
		else {
			favoritesWidget.setMessage(true, response.data);
		}
	});
}