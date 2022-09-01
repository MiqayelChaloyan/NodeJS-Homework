const container = document.getElementById('container');
const users = document.getElementById('users');

const BASE_URL = 'http://localhost:3000';

const user = document.querySelector("#user");
const inputEl = document.querySelector("#userInput");
const sortBtn = document.querySelector("#sortBtn");


sortBtn.addEventListener("click", () => {
	if (inputEl.value) {
		sortUsersById();
	}
});


users.addEventListener('click', () => {
	getUsers();
});


user.addEventListener("click", () => {
	if (inputEl.value) {
		getSearch();
	}
});




async function sortUsers() {
	const response = await fetch(`${BASE_URL}/user/sorted`)
	const userData = await response.json();
	titleUsers();
	drawUsers(userData);
}


async function getUsers() {
	const response = await fetch(`${BASE_URL}/users`)
	const userData = await response.json();
	titleUsers();
	drawUsers(userData);
}


//Create todos users
function drawUsers(data) {
	container.innerHTML = '';

	data.forEach(({ id, name, email, address, phone }, index) => {
		setTimeout(() => {
			const frameEl = document.createElement("div");
			frameEl.setAttribute("class", "userFrame");

			const idEl = document.createElement("div");
			idEl.setAttribute("class", "userAge");
			idEl.innerText = id;

			const nameEl = document.createElement("div");
			nameEl.setAttribute("class", "userName");
			nameEl.innerText = name;

			const emailEl = document.createElement("div");
			emailEl.setAttribute("class", "userSocial");
			emailEl.innerText = email;

			const addressEl = document.createElement("div");
			addressEl.setAttribute("class", "userSocial");
			addressEl.innerText = address;

			const phoneEl = document.createElement("div");
			phoneEl.setAttribute("class", "userSocial");
			phoneEl.innerText = phone;

			frameEl.append(idEl, nameEl, emailEl, addressEl, phoneEl);

			container.append(frameEl)
		}, index)
	});
}


//Create title todos
function titleUsers() {
	container.innerHTML = '';
	setTimeout(() => {
		const frameEl = document.createElement("div");
		frameEl.setAttribute("class", "title");

		const idEl = document.createElement("div");
		idEl.setAttribute("class", "userAge");
		idEl.innerText = 'id';

		const nameEl = document.createElement("div");
		nameEl.setAttribute("class", "userName");
		nameEl.innerText = 'name';

		const emailEl = document.createElement("div");
		emailEl.setAttribute("class", "userSocial");
		emailEl.innerText = 'email';

		const addressEl = document.createElement("div");
		addressEl.setAttribute("class", "userSocial");
		addressEl.innerText = 'address';

		const phoneEl = document.createElement("div");
		phoneEl.setAttribute("class", "userSocial");
		phoneEl.innerText = 'phone';

		frameEl.append(idEl, nameEl, emailEl, addressEl, phoneEl);

		container.append(frameEl)
	})
}


//Sort by ID users
async function sortUsersById() {
	const response = await fetch(`${BASE_URL}/users`)
	const userData = await response.json()
	const value = inputEl.value.toLowerCase();

	const filterUser = userData.filter(user => {

		let id = String(user.id);

		if (id.search(value) > -1) {
			const obj = { ...user }
			return obj
		}

	})
	titleUsers()
	drawUsers(filterUser);
}


//Sort by input value
async function getSearch() {
	const response = await fetch(`${BASE_URL}/users`)
	const userData = await response.json()
	const value = inputEl.value.toLowerCase();

	const filterUser = userData.filter(user => {

		let id = String(user.id);
		let name = user.name.toLowerCase();
		let email = user.email.toLowerCase();
		let address = user.address.toLowerCase();

		let phone = user.phone;
		if (id.search(value) > -1 || name.search(value) > -1 || email.search(value) > -1 || address.search(value) > -1 || phone.search(value) > -1) {
			const obj = { ...user }
			return obj
		}
	})

	titleUsers()
	drawUsers(filterUser);
}
