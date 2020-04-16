const addBtn = document.querySelector('.add-btn');
const submitBtn = document.querySelector('.submit-btn');

//Make Add book button disapear when clicked
addBtn.addEventListener('click', hideBtn);
function hideBtn(e) {
    const form = document.querySelector('.form');
    addBtn.style.display = 'none';
    form.classList.add('open-form')
}


//Book Class: Represents a book
class Book {
    constructor(title, author, pages, isbn, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isbn = isbn;
    }
}

//UI Class: Handles UI dispays and tasks
class UI {

    static displayBooks() {
        const library = Store.getBooks();
        library.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox" class="check-box read"></td>
        <td>${book.isbn}</td>
        <td><a href"#" class="delete-btn delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Successfully Removed', 'rgb(184, 161, 206)');
        }
    }

    //Create an alert element
    static showAlert(message, color) {
        const div = document.createElement('div');
        div.className = 'alert';
        div.style.backgroundColor = color;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const addBtn = document.querySelector('.add-btn');
        container.insertBefore(div, addBtn);

        //Alert vanishes in 3s seconds
        setTimeout(() => document.querySelector('.alert').remove(),
        3000)

    }

    static clearFields() {
        //Removes form after submitting book
        const form = document.querySelector('.form');
        form.classList.remove('open-form');

        addBtn.style.display = 'inline';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: Handles Storage
class Store {
    static getBooks() {
        let library;
        if(localStorage.getItem('library') === null) {
            library = [];
        } else {
            library = JSON.parse(localStorage.getItem('library'));
        }

        return library;
    }

    static addBook(book) {
        const library = Store.getBooks();
        library.push(book);
        localStorage.setItem('library', JSON.stringify(library));
    }

    static removeBook(isbn) {
        const library = Store.getBooks();
        library.forEach((book, index) => {
            if(book.isbn === isbn) {
                library.splice(index, 1);
            }
        });
        localStorage.setItem('library', JSON.stringify(library));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book
document.querySelector('.form').addEventListener('submit', (e)=> {
    //Prevent actual Submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isbn = document.querySelector('#isbn').value;

    //Validation
    if(title === '' ||author === '' || pages === '' || isbn === '') {

        
        UI.showAlert('Please fill all fields', 'red');

    } else {

        const book = new Book(title, author, pages, isbn);

        //Add book
        UI.addBookToList(book);

        //Success message: Book added
        UI.showAlert('Book Added', 'rgb(91, 146, 7)');

        //Clear fields
        UI.clearFields();

        //Store book
        Store.addBook(book)

    }
});

//Event: Remove/delete a book
document.querySelector('#book-list').addEventListener('click', (e)=> {

    //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})







