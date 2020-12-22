const newBook = document.querySelector("#new-book");
const bookForm = document.querySelector(".book-form");
const form = document.getElementById("form");
const shelf = document.querySelector(".shelf");
let library;
let formOpen = false;
const DEFAULT_DATA = [
    { title: "The Alchemist", author: "Paulo Coelho",num:208, status: "Read" },
    {
      title: "Alice in Wonderland",
      author: "Lewis Caroll",
      num: 200,
      status: "Not Read",
    },
  ];

function formOpenClose(){
    console.log("button clicked");
    console.log(formOpen);
    if(formOpen){
        newBook.innerHTML ="&plus;";
        bookForm.style.transform = "scale(0)";
        form.reset();
        formOpen = false;
        //shelf.style.filter = "blur(0)";
        shelf.style.filter = "opacity(100%)";
    }
    else{
        newBook.innerHTML = "&times;";
        bookForm.style.transform = "scale(1)";
        formOpen = true;
        //shelf.style.filter = "blur(2px)";
        shelf.style.filter = "opacity(20%)";
    }
}
class Book{
    constructor(title, author, num, status){
    this.title = title;
    this.author = author;
    this.num = num;
    this.status = status;
}
}

function addBookToLibrary(){
    console.log("addBookToLibrary()");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const num = document.getElementById("num");
    var statuses = document.getElementsByName("status");
    var status;
    for(var i=0;i<statuses.length;i++){
        if(statuses[i].checked){
            status = statuses[i];
        }
    }

   const book = new Book(title.value,author.value,num.value,status.value);
   library.push(book);
   updateLocalStorage();
   formOpenClose();
   form.reset();
}
function changeStatus(curBook){
    if(library[curBook].status == 'Read'){
        library[curBook].status = 'Not Read';
    }
    else{
        library[curBook].status = 'Read';
    }
}

function updateLocalStorage(){
    localStorage.setItem("library",JSON.stringify(library));
}

function checkLocalStorage(){
    if (localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getItem("library"));
      } else {
        library = DEFAULT_DATA;
      }
}

function getBooks(){
    shelf.innerHTML = "";
    checkLocalStorage();
    updateLocalStorage();
    library.forEach((book)=>{
        let bookNode = document.createElement("div");
        bookNode.classList.add("book-card");
        bookNode.classList.add("col-md-5");
        let titleNode = document.createElement("h2");
        titleNode.innerHTML = `Title : ${book.title}<hr>`;
        let authorNode = document.createElement("h3");
        authorNode.innerHTML = `Author : ${book.author}`;
        let numNode = document.createElement("h4");
        numNode.innerHTML = `Pages : ${book.num}`;
        let statusNode = document.createElement("h4");
        statusNode.innerHTML = `Status : ${book.status}`;
        let deleteNode = document.createElement("button");
        deleteNode.classList.add("delete-book","btn");
        deleteNode.innerHTML = `Delete`;
        let updateNode = document.createElement("button");
        updateNode.classList.add("change-status","btn");
        updateNode.innerHTML="Change read status";

        bookNode.appendChild(titleNode);
        bookNode.appendChild(authorNode);
        bookNode.appendChild(numNode);
        bookNode.appendChild(statusNode);
        bookNode.appendChild(deleteNode);
        bookNode.appendChild(updateNode);
        shelf.appendChild(bookNode);
    })
}
function findBook(libraryArray, title) {
    if (libraryArray.length === 0 || libraryArray === null) {
      return;
    }
    for (book of libraryArray)
      if (book.title === title) {
        return libraryArray.indexOf(book);
      }
  }

function deleteBook(delbook){
    library.splice(delbook,1);
    updateLocalStorage();
}

window.onload = function(){
getBooks();   
newBook.addEventListener("click", formOpenClose);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addBookToLibrary();
    getBooks();
});
shelf.addEventListener("click",(e)=>{
    const curtarget = e.target.parentNode.childNodes[0].innerText;
    console.log(curtarget);
    if(e.target.classList.contains("delete-book")){
        if(confirm(`Do you really want to delete ${curtarget.slice(8,curtarget.length+1)}?`)){
            deleteBook(findBook(library,curtarget.slice(8,curtarget.length+1)));
            getBooks();
        }
    }
    if(e.target.classList.contains("change-status")){
        changeStatus(findBook(library,curtarget.slice(8,curtarget.length+1)));
        updateLocalStorage();
        getBooks();
    }
})
}
