var inputName = document.getElementById("inputName");
var inputURL = document.getElementById("inputURL");
var Books = [];
if (localStorage.getItem('Books') !== null) {
    Books = JSON.parse(localStorage.getItem('Books'));
    display();
}

function addBook() {
    var bookObject = {
        name: inputName.value,
        URL: inputURL.value
    }
    if (isValidName() && isValidURL()) {
        Books.push(bookObject);
        console.log(Books);
        clear();
        display();
        localStorage.setItem('Books', JSON.stringify(Books))
    } else {

    }

}

function clear() {
    inputName.value = null
    inputURL.value = null
    inputName.classList.remove("is-valid")
    inputURL.classList.remove("is-valid")
}

function display() {
    var c = "";
    for (i = 0; i < Books.length; i++) {
        c += `
            <tr>
                        <td>
                            <h5 class="fs-6 fw-bold">${i+1}</h5>
                        </td>
                        <td>
                            <h5 class="fs-6 fw-bold">${Books[i].name}</h5>
                        </td>
                        <td>
                            <button class="btn btn-success"><a target="_blank" class="text-decoration-none text-light" href="${Books[i].URL}"><span><i class="fa-solid fa-eye me-1"></i></span> Visit</a></button>
                        </td>
                        <td>
                            <button onclick="deleteBook(${i})" class=" btn btn-danger"> <span><i class="fa-solid fa-trash me-1"></i></span>Delete</button>
                        </td>
                    </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = c;
}

function deleteBook(i) {
    Books.splice(i, 1);
    console.log(Books);
    display();
    localStorage.setItem('Books', JSON.stringify(Books))
}


function isValidName() {
    var regex = /[a-zA-Z]{4,}/;
    if (regex.test(inputName.value)) {
        inputName.classList.remove("is-invalid")
        inputName.classList.add("is-valid")
        return true
    } else {
        inputName.classList.remove("is-valid")
        inputName.classList.add("is-invalid")
        return false
    }
}

function isValidURL() {
    var regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w.-]*)*\/?$/i;;
    if (regex.test(inputURL.value)) {
        inputURL.classList.remove("is-invalid")
        inputURL.classList.add("is-valid")
        return true;
    } else {
        inputURL.classList.remove("is-valid")
        inputURL.classList.add("is-invalid")
        return false
    }
}