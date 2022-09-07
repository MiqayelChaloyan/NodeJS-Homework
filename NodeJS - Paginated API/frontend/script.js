const BASE_URL = "http://localhost:3000";


const page = document.getElementById("page");
const usersContainer = document.getElementById("carsContainer");
const getAllUsersBtn = document.getElementById("getAllUsers");
const nextBtn = document.getElementById("next1");
const prevBtn = document.getElementById("prev");
const pageNum = document.getElementById("pageNum");

// //Next Button
nextBtn.addEventListener("click", async () =>  {
    const r = await fetch(`${BASE_URL}/usersCount`);
    const {usersCount} = await r.json();
    if (usersCount <= Number(pageNum.innerHTML) * page.value ) {
        return
    }
    getUsers(Number(pageNum.innerHTML) + 1)
});

// //Previous Button
prevBtn.addEventListener("click", async () => {
    if (Number(pageNum.innerHTML) == 1) {
        return
    }
    getUsers(Number(pageNum.innerHTML) - 1)
});

page.addEventListener("click", () => getUsers(pageNum.innerHTML));

getUsers(1);





async function getUsers(pageNumValue) {
    pageNum.innerText = `${pageNumValue}`
    const r = await fetch(`${BASE_URL}/users?page=${pageNumValue}&limit=${page.value}`);
    const data = await r.json();
    usersContainer.innerHTML = "";

    data.forEach((user) => {

        const rowWrapper = document.createElement("div");
        rowWrapper.classList.add("rowWrapper");

        Object.keys(user).forEach((field) => {

            const div = document.createElement("div");
            div.classList.add("field");
            div.append(user[field]);
            rowWrapper.append(div);

        });
        // rowWrapper.classList.add("button");
        // const buttonDel = document.createElement("button");
        // buttonDel.classList = 'buttonDel'
        // const buttonEdit = document.createElement("button");
        // buttonEdit.classList = 'buttonEdit'
        // const changeEdit = document.createElement("button");
        // changeEdit.classList = 'changeEdit'
        // rowWrapper.append(buttonDel, buttonEdit, changeEdit);

        // buttonDel.innerHTML = "Delete";
        // buttonDel.addEventListener("click", () => deleteCar(car.id))
        // buttonEdit.innerHTML = "Update";
        // buttonEdit.addEventListener("click", () => ubdateCar(car.id))
        // changeEdit.innerHTML = "Edit";
        // changeEdit.addEventListener("click", () => editCar())

        usersContainer.append(rowWrapper);
    })
}