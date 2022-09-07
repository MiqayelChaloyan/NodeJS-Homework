const BASE_URL = "http://localhost:3000";


const getAllCarsBtn = document.getElementById("getAllCars");
const getAllBrandsBtn = document.getElementById("getAllBrands");
const carsContainer = document.getElementById("carsContainer");
const brandsContainer = document.getElementById("brandsContainer")
const addCarBtn = document.getElementById("addCar")
const addBrandBtn = document.getElementById("addBrand")
const filterInp = document.getElementById('filter')
const editCarContainer = document.getElementById('editCarContainer')

const removeBtn = document.getElementById('remove')
removeBtn.addEventListener("click", () => editCar())

const pageNumber = document.getElementById('page')
const limit = document.getElementById('limit')

const nameInp = document.getElementById("nameCar");
const colorInp = document.getElementById("colorCar");
const yearInp = document.getElementById("yearCar");
const brandInp = document.getElementById("brandIdCar");

const addCarDiv = document.getElementById('addCarDiv')
const nameBrandInp = document.getElementById("nameBrand");
const search = document.getElementById("search");

getAllCarsBtn.addEventListener("click", () => getAllCars());
getAllBrandsBtn.addEventListener("click", () => getAllBrands());
addCarBtn.addEventListener("click", () => addCar());
addBrandBtn.addEventListener("click", () => addBrand());
search.addEventListener("click", () => getAllCarsSearch());




async function getAllCars(d = '') {

    const r = await fetch(`${BASE_URL}/cars`);
    const data = await r.json();
    console.log(data);
    carsContainer.innerHTML = "";

    data.forEach((car) => {

        const rowWrapper = document.createElement("div");
        rowWrapper.classList.add("rowWrapper");
        Object.keys(car).forEach((field) => {
            if (typeof car[field] == "object") {
                const div = document.createElement("div");
                div.classList.add("field");
                div.append(car[field].brand);
                rowWrapper.append(div);
            }
            else {
                const div = document.createElement("div");
                div.classList.add("field");
                div.append(car[field]);
                rowWrapper.append(div);
            }
        });
        rowWrapper.classList.add("button");
        const buttonDel = document.createElement("button");
        const buttonEdit = document.createElement("button");
        const changeEdit = document.createElement("button");
        rowWrapper.append(buttonDel, buttonEdit, changeEdit);
        buttonDel.innerHTML = "Delete";
        buttonDel.addEventListener("click", () => deleteCar(car.id))
        buttonEdit.innerHTML = "Update";
        buttonEdit.addEventListener("click", () => ubdateCar(car.id))
        changeEdit.innerHTML = "Edit";
        changeEdit.addEventListener("click", () => editCar())

        carsContainer.append(rowWrapper);
    })
}



async function getAllCarsSearch() {

    const r = await fetch(`${BASE_URL}/cars/?filter=${filterInp.value}`);
    const data = await r.json();
    console.log(data);
    carsContainer.innerHTML = "";

    data.forEach((car) => {
        const rowWrapper = document.createElement("div");
        rowWrapper.classList.add("rowWrapper");
        Object.keys(car).forEach((field) => {
            const div = document.createElement("div");
            div.classList.add("field");
            div.append(car[field]);
            rowWrapper.append(div);
        });
        rowWrapper.classList.add("button");
        const buttonDel = document.createElement("button");
        const buttonEdit = document.createElement("button");
        const changeEdit = document.createElement("button");
        rowWrapper.append(buttonDel, buttonEdit, changeEdit);
        buttonDel.innerHTML = "Delete";
        buttonDel.addEventListener("click", () => deleteCar(car.id))
        buttonEdit.innerHTML = "Update";
        buttonEdit.addEventListener("click", () => ubdateCar(car.id))
        changeEdit.innerHTML = "Edit";
        changeEdit.addEventListener("click", () => editCar())
        carsContainer.append(rowWrapper);
    })
}


async function getAllBrands() {
    const r = await fetch(`${BASE_URL}/brands`, {
        method: 'GET'
    });
    const data = await r.json();

    brandsContainer.innerHTML = "";
    data.forEach((brand) => {

        const rowWrapper = document.createElement("div");
        rowWrapper.classList.add("rowWrapper");

        Object.keys(brand).forEach((field) => {
            const div = document.createElement("div");
            div.classList.add("field");
            div.append(brand[field]);
            rowWrapper.append(div);
        });

        const buttonDel = document.createElement("button");
        rowWrapper.append(buttonDel);
        buttonDel.innerHTML = "Delete";
        buttonDel.addEventListener("click", () => deleteBrand(brand.id))
        brandsContainer.append(rowWrapper);
    })
}

async function deleteCar(id) {
    const r = await fetch(`${BASE_URL}/cars/${id}`, {
        method: 'DELETE'
    });
    const data = await r.json();
    getAllCars()
}

async function deleteBrand(id) {
    const r = await fetch(`${BASE_URL}/brands/${id}`, {
        method: 'DELETE'
    });
    const data = await r.json();
    deleteCar()
    getAllBrands()
}




async function addCar() {
    const r = await fetch(`${BASE_URL}/cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInp.value,
            color: colorInp.value,
            year: yearInp.value,
            brandId: brandInp.value
        })
    });
    const data = await r.json();
    getAllCars()
}




async function addBrand() {
    const r = await fetch(`${BASE_URL}/brands`, {
        method: "POST",
        body: JSON.stringify({
            brand: nameBrandInp.value,
        })
    });
    const data = await r.json();
    getAllBrands()
}

async function ubdateCar(id) {
    console.log(id)
    const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black']
    editCarContainer.innerHTML = "";
    const rowWrapper = document.createElement("div");
    const editName = document.createElement('input')
    editName.placeholder = 'name'
    const editColor = document.createElement('select');
    editColor.classList = "select"
    for (let i = 0; i < colors.length; i++) {
        const option = document.createElement('option')
        option.value = colors[i]
        option.text = colors[i]
        editColor.append(option)
    }
    const editYear = document.createElement('input')
    editYear.placeholder = 'year'
    const editBrand = document.createElement('input')
    editBrand.placeholder = 'brand ID'
    rowWrapper.classList.add("rowWrapper");

    const buttonSave = document.createElement("button");

    rowWrapper.append(editName, editColor, editYear, editBrand, buttonSave);
    buttonSave.innerHTML = "SAVE";
    buttonSave.classList = 'saveUbdate'
    buttonSave.addEventListener("click", () => saveEdits(id, editName, editColor, editYear, editBrand))
    editCarContainer.append(rowWrapper)
}

async function saveEdits(id, editName, editColor, editYear, editBrand) {
    const r = await fetch(`${BASE_URL}/cars/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: editName.value,
            color: editColor.value,
            year: editYear.value,
            brandId: editBrand.value
        })
    });
    const data = await r.json();
    getAllCars()
    editCarContainer.innerHTML = ''
}



async function editCar() {
    if (addCarDiv.style.display === 'block') {
        addCarDiv.style.display = 'none'
    } else {
        addCarDiv.style.display = 'block'
    }
}


