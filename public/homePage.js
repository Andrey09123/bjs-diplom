const logoutButton = new logoutButton();
logoutButton.action = () => {
	ApiConnector.logout(callback => {
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
const ratesBoard = new ratesBoard();
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

const MoneyManager = new MoneyManager();
MoneyManager.addMoneyCollback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if(response.success) {
			profileWidget.showProfile(response.data);
			MoneyManager.setMessage(false, `Успешное пополнение баланса`);
		} 
		else {
			MoneyManager.setMessage(true, response.data);
		}
	});
}

MoneyManager.conversionMoneyCollback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if(response.success) {
			profileWidget.showProfile(response.data);
			MoneyManager.setMessage(false, `Успешная конвертация`);
		} 
		else {
			MoneyManager.setMessage(true, response.data);
		}
	});
}

MoneyManager.sendMoneyCollback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		console.log(response);
		if(response.success) {
			profileWidget.showProfile(response.data);
			MoneyManager.setMessage(false, `Успешный перевод`);
		} 
		else {
			MoneyManager.setMessage(true, response.data);
		}
	});
}

//Работа с Избранным

const FavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(function(response) {
	if(response.success) {
		console.log(response);
		favorite.clearTable();
		favorite.fillTable(response.data);
		MoneyManager.updateUserList(response.data);
	}
});

favorite.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if(response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			MoneyManager.updateUserList(response.data);
			MoneyManager.setMessage(false, `Успешное добавление`);
		}
		else {
			MoneyManager.setMessage(true, response.data);
		}
	});
}

favorite.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if(response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			MoneyManager.updateUserList(response.data);
			favorite.setMessage(false, `Успешное удаление`);
		}
		else {
			favorite.setMessage(true, response.data);
		}
	});
}