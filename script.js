const myLibrary = [];

class Book{
  constructor(title,author,pages,readPages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;

  }
  getTitle(){
    return this.title;
  }
  getAuthor(){
    return this.author
  }
  getPages(){
    return this.pages;
  }
  getReadPages(){
    return this.readPages;
  }
  setTitle(title){
    this.title = title;
  }
  setAuthor(author){
    this.author = author;
  }
  setPages(pages){
    this.pages = pages;
  }
  setReadPages(readPages){
    this.readPages = readPages;
  }

}

(function addBookToLibrary() {
  // do stuff here
  const addBookClick = document.querySelector(".add-book div");
  addBookClick.onclick =  renderDialog;
  function renderDialog(){
    const dialog = document.querySelector("#dialog")
    dialog.showModal()
    validations()

  }
  function validations(){
    const dialog = document.querySelector("#dialog");
    const buttonSubmit = document.querySelector(".create");
    const buttonCancel = document.querySelector(".cancel");
    const titleElement = document.querySelector("#title");
    const authorElement = document.querySelector("#author");
    const pagesElement = document.querySelector("#pages");
    const readPagesElement = document.querySelector("#read");
    const warningEL = document.querySelector(".pages-read-field div");
    let zeroFirstCheckOne = [];
    pagesElement.addEventListener("input", () => {
      currentPageValue = pagesElement.value
      zeroFirstCheckOne=[];
      zeroFirstCheckOne = pagesElement.value.split("");
      if (zeroFirstCheckOne[0] == 0 && zeroFirstCheckOne.length > 1){
        pagesElement.value = 0;
      }
      readingValidations(readPagesElement.value, pagesElement.value)
    })
    let zeroFirstCheckTwo = [];
    readPagesElement.addEventListener("input",()=>{
      zeroFirstCheckTwo = [];
      zeroFirstCheckTwo = readPagesElement.value.split("");
      if (zeroFirstCheckTwo[0] == 0 && zeroFirstCheckTwo.length > 1){
        readPagesElement.value = 0;
      }
      readingValidations(readPagesElement.value, pagesElement.value);
    })
    function readingValidations(readPages, bookPages){
      if(parseInt(readPages) > parseInt(bookPages)){
        warningEL.textContent = "The number of read pages cannot exceed the book.";
        warningEL.classList.add("padding")
      }else{
        warningEL.classList.remove("padding");
        warningEL.textContent = "";
      }
    }
    buttonSubmit.addEventListener("click", () => {
      event.preventDefault();
      if (titleElement.value != '' && authorElement != '' && pagesElement.value >= 0 && readPagesElement.value >=0 && pagesElement.value != '' && readPagesElement != ''){
        if (parseInt(readPagesElement.value) <= parseInt(pagesElement.value)){
          let newObj = new Book(titleElement.value, authorElement.value, pagesElement.value, readPagesElement.value);
          myLibrary.push(newObj);
          resetDialog()
          dialog.close();
          addBook()
        }else{
          dialog.showModal();
        }

      }
    })
    buttonCancel.addEventListener("click",()=>{
      event.preventDefault();
      dialog.close()
    })
  }
  function addBook(){
    myLibrary.forEach((element,index) => {
      renderBookDOM(element, index);
    });
  }
  function renderBookDOM(element,index){
    const booksContainer = document.querySelector(".books");
    const newBook = document.createElement("div");
    const titleEl = document.createElement("div");
    const authorEl = document.createElement("div");
    const pagesEl = document.createElement("div");
    newBook.classList.add("new-book");
    titleEl.textContent = `${element.getTitle()}`;
    titleEl.style.cssText = "font-size:20px; font-weight:bold; text-decoration: underline;"
    authorEl.textContent = `By ${element.getAuthor()}`;
    authorEl.style.cssText = "font-size:15px;";
    pagesEl.textContent = `${element.getPages()} pages`;
    booksContainer.appendChild(newBook);
    newBook.appendChild(titleEl);
    newBook.appendChild(authorEl);
    newBook.appendChild(pagesEl);
  }
  function resetDialog(){
    const titleElement = document.querySelector("#title");
    const authorElement = document.querySelector("#author");
    const pagesElement = document.querySelector("#pages");
    const readPagesElement = document.querySelector("#read")
    titleElement.value = '';
    authorElement.value = '';
    pagesElement.value = 0;
    readPagesElement.value = 0;
  }

})()
