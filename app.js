const addBtn = document.querySelector('.add-btn');
const submitBtn = document.querySelector('.submit-btn');

//Make Add book button disapear
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
        const books = [
            {
                title: 'Rich Dad Poor Dad',
                author: 'Robert Kiyasoki',
                pages: 300,
                isbn: 12345,
                read: 'yes'
            },
            {
                title: 'The Alchemist',
                author: 'Paul Couelo',
                pages: 300,
                isbn: 67899,
                read: 'no'
            }
        ];
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.isbn}</td>
        <td><input type="checkbox" class="check-box read"></td>
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

    static showAlert(message, color) {
        const div = document.createElement('div');
        div.className = 'alert';
        div.style.backgroundColor = color;
        div.style.color = 'white';
        div.style.height = '30px';
        div.style.padding = '3px';
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
    //const read = document.querySelector('#read').value;

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

    }
});

//Event: Remove/delete a book
document.querySelector('#book-list').addEventListener('click', (e)=> {

    //Remove book from UI
    UI.deleteBook(e.target);
})







