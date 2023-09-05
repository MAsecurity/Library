const addABookBtn = document.querySelector(".add-a-book");
const dialog = document.querySelector("#dialog");
const cancelBtn = document.querySelector(".cancelbtn");
const submitBtn = document.querySelector(".submitbtn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readOrNot = document.querySelector("#read-or-not");
const readIt = document.querySelector("#read-it");
const notRead = document.querySelector("#not-read");
const listOfBooks = document.querySelector(".list-of-books");


const myLibrary = [];

function Book(title, author, pages, readOrNot) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readOrNot = readOrNot;
  
}

function addBookToLibrary() {
  addABookBtn.addEventListener("click", () => {
    dialog.showModal();
  
  
  })
  
  cancelBtn.addEventListener("click",() => {
    event.preventDefault();
    dialog.close();
  })
  
  submitBtn.addEventListener("click", () => {
    event.preventDefault();
    let titleValue = title.value;
    let authorValue = author.value;
    let pagesValue = pages.value;
    let readItValue = readIt.value;
    let notReadValue = notRead.value;
    console.log()
    if(titleValue !== '' && authorValue !== '' && pagesValue !== '') {
      dialog.close();
      if(readIt.checked) {
        newAddedBook = new Book(titleValue,authorValue,pagesValue,readItValue);
        myLibrary.push(newAddedBook);
        addToDisplay(titleValue, authorValue,pagesValue,readItValue);
        
      }else if (notRead.checked) {
        newAddedBook = new Book(titleValue,authorValue,pagesValue,notReadValue);
        myLibrary.push(newAddedBook);
        addToDisplay(titleValue, authorValue, pagesValue, notReadValue);
  
      }
    };
    
   });

   function addToDisplay(titleValue, authorValue, pagesValue, readOrNotValue) {
    //Collect the current index relevant for creating an attribute
    let theIndex = myLibrary.length - 1;
    console.log(myLibrary)

    //Create the DOM elements and its relevant classes and set the index attribute to the required elements
    let cardDiv = document.createElement('div');
    cardDiv.classList.add("card");
    cardDiv.setAttribute("card-index", `${theIndex}`);
    
    let detailsDiv = document.createElement('div');
    detailsDiv.classList.add("details");
    let pTitle = document.createElement('p');
    pTitle.textContent = `Title: ${titleValue}`
    let pAuthor = document.createElement('p');
    pAuthor.textContent = `Author: ${authorValue}`
    let pPages = document.createElement('p');
    pPages.textContent = `Pages: ${pagesValue}`;
    let pReadOrNot = document.createElement('p');
    pReadOrNot.textContent = `Have you read it? ${readOrNotValue}`;
    pReadOrNot.setAttribute("index", `${theIndex}`);

    let buttonsBookDiv = document.createElement('div');
    buttonsBookDiv.classList.add("buttons-book");
    let readOrNotButton = document.createElement('button');
    readOrNotButton.classList.add('read-or-not-button');
    readOrNotButton.setAttribute("index", `${theIndex}`);
    if(readOrNotValue === "yes") {
      readOrNotButton.textContent = `Unread`;
    }else if (readOrNotValue === "no") {
      readOrNotButton.textContent = `Read`;
    }

    let removeButton = document.createElement('button');
    removeButton.classList.add("remove-button");
    removeButton.textContent = `Remove`;
    removeButton.setAttribute("index", `${theIndex}`);

    //Append the divs to their parent divs in order
    listOfBooks.append(cardDiv);
    cardDiv.append(detailsDiv);
    cardDiv.append(buttonsBookDiv);
    detailsDiv.append(pTitle);
    detailsDiv.append(pAuthor);
    detailsDiv.append(pPages);
    detailsDiv.append(pReadOrNot);
    buttonsBookDiv.append(readOrNotButton);
    buttonsBookDiv.append(removeButton);

    readOrNotButton.addEventListener("click", ()=>{
      //Grab index of current button and update library array as well as display
       let currentIndex = readOrNotButton.getAttribute("index");
      if(currentIndex == pReadOrNot.getAttribute("index")){
        if (readOrNotButton.textContent === "Read") {
          readOrNotButton.textContent = "Unread";
          myLibrary[currentIndex].readOrNot = "yes"
          pReadOrNot.textContent = "Have you read it? yes";
        }else if (readOrNotButton.textContent === "Unread"){
          readOrNotButton.textContent = "Read";
          myLibrary[currentIndex].readOrNot = "no";
          pReadOrNot.textContent = "Have you read it? no";
         }  
      } 
     
    });

    removeButton.addEventListener("click", () => {  
    let currentIndex = removeButton.getAttribute("index");
    if(currentIndex == cardDiv.getAttribute("card-index")){
      cardDiv.remove();
      myLibrary.splice(currentIndex,currentIndex);
    }

    console.log(myLibrary);
    

   });
}}

addBookToLibrary();








