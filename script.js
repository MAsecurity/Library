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
  getPercentage(){
    if (this.readPages == 0){
      return 0;
    }
    return parseInt((this.readPages / this.pages) * 100);

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
    pagesElement.addEventListener("input", () => {
      let zeroFirstCheckOne = pagesElement.value.split("");
      if (zeroFirstCheckOne[0] == 0 && zeroFirstCheckOne.length > 1){
        pagesElement.value = 0;
      }
      readingValidations(readPagesElement.value, pagesElement.value)
    })
    readPagesElement.addEventListener("input",()=>{
      let zeroFirstCheckTwo = readPagesElement.value.split("");
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
      if (titleElement.value != '' && authorElement != '' && pagesElement.value >= 1 && readPagesElement.value >=0 && pagesElement.value != '' && readPagesElement != ''){
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
    clearContents();
    addBookDefault();
    myLibrary.forEach((element,index) => {
      renderBookDOM(element, index);
    });
    updateStatus()
  }
  function updateStatus(){
    const booksFinished = document.querySelector(".books-finished span");
    const booksNotRead = document.querySelector(".books-not-read span");
    const booksInProgress = document.querySelector(".books-in-progress span")
    let booksFinishedCount = 0;
    let booksNotReadCount =0;
    let booksInProgressCount = 0;
    myLibrary.forEach(element => {
      if (element.getReadPages() == element.getPages()){
        booksFinishedCount++;
      }
      if(element.getReadPages() == 0){
        booksNotReadCount++;
      }
      if((element.getReadPages() > 0) && (element.getReadPages() < element.getPages())){
        booksInProgressCount++;
      }
    })
    booksFinished.textContent = `${booksFinishedCount}`;
    booksInProgress.textContent = `${booksInProgressCount}`;
    booksNotRead.textContent = `${booksNotReadCount}`;
  }
  function renderBookDOM(element,index){
    const booksContainer = document.querySelector(".books");
    const newBook = document.createElement("div");
    const titleEl = document.createElement("div");
    const authorEl = document.createElement("div");
    const pagesEl = document.createElement("div");
    const progressContainer = document.createElement("div");
    const progress = document.createElement("progress");
    const buttonsContainer = document.createElement("div");
    const buttonEditProgress = document.createElement("button");
    const buttonRemove = document.createElement("button");
    Object.assign(progress,{
      value: `${element.getPercentage()}`,
      max: `${100}`
    })

    newBook.classList.add("new-book");
    titleEl.textContent = `${element.getTitle()}`;
    titleEl.style.cssText = "font-size:20px; font-weight:bold; text-decoration: underline; text-align: center;"
    authorEl.textContent = `By ${element.getAuthor()}`;
    authorEl.style.cssText = "text-align: center; font-size: 16px !important;"
    pagesEl.textContent = `${element.getPages()} pages`;
    pagesEl.style.cssText = "text-align: center; font-size: 16px !important;";
    buttonsContainer.classList.add("buttons-container");
    buttonEditProgress.classList.add("edit-progress");
    buttonEditProgress.textContent = "Edit progress";
    buttonEditProgress.setAttribute("index", `${index}`)
    buttonEditProgress.onclick = () => {
      renderUpdateDialog(buttonEditProgress.getAttribute("index"));
    }
    buttonRemove.classList.add("removeBtn");
    buttonRemove.textContent = "Remove";
    buttonRemove.setAttribute("index", `${index}`)
    buttonRemove.onclick = () =>{
      removeBook(buttonRemove.getAttribute("index"));
    }
    booksContainer.appendChild(newBook);
    newBook.appendChild(titleEl);
    newBook.appendChild(authorEl);
    newBook.appendChild(pagesEl);
    newBook.appendChild(progressContainer);
    progressContainer.appendChild(progress);
    newBook.appendChild(buttonsContainer);
    buttonsContainer.appendChild(buttonEditProgress);
    buttonsContainer.appendChild(buttonRemove);
  }
  function renderUpdateDialog(index){
    const updateDialog = document.createElement("dialog");
    updateDialog.setAttribute("id","update-dialog");
    const formEL = document.createElement("form");
    const titleElDiv = document.createElement("div");
    titleElDiv.textContent = `Update number of read pages for ${myLibrary[index].getTitle()}`
    titleElDiv.classList.add("title");
    const updateInputContainer = document.createElement("div");
    updateInputContainer.classList.add("update-pages-read-field");
    const labelEL = document.createElement("label");
    labelEL.setAttribute("for","update-read");
    labelEL.textContent = `/${myLibrary[index].getPages()}`;
    const updateInput = document.createElement("input");
    Object.assign(updateInput,{
      type: "number",
      id: "update-read",
      value: `${myLibrary[index].getReadPages()}`,
      required: "required"
    });
    const validationDIV = document.createElement("div");
    let bookPages = myLibrary[index].getPages();
    updateInput.oninput = () =>{
      let zeroCheck = updateInput.value.split("");
      if(parseInt(zeroCheck[0]) == 0 && zeroCheck.length > 1){
        updateInput.value = 0;
      }
      if(parseInt(updateInput.value) > parseInt(bookPages)){
        validationDIV.textContent = "The number of read pages cannot exceed the book.";
        validationDIV.classList.add("padding")
      }else{
        validationDIV.classList.remove("padding");
        validationDIV.textContent = "";
      }
    }
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("update-buttons-flex");
    const updateBtn = document.createElement("button");
    updateBtn.classList.add("updateBtn");
    updateBtn.textContent = "Update";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("closeBtn")
    cancelBtn.textContent = "Cancel";

    document.body.appendChild(updateDialog);
    updateDialog.appendChild(formEL);
    formEL.appendChild(titleElDiv);
    formEL.appendChild(updateInputContainer);
    updateInputContainer.appendChild(labelEL);
    updateInputContainer.appendChild(updateInput)
    updateInputContainer.appendChild(validationDIV);
    formEL.appendChild(buttonContainer);
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(updateBtn);
    updateDialog.showModal()
    updateBtn.onclick = () => {
      event.preventDefault()
      if (updateInput.value >= 0 && updateInput.value <= myLibrary[index].getPages()){
        myLibrary[index].setReadPages(updateInput.value);
        addBook()
        updateDialog.close();
        clearUpdateDialog()

      }
    }
    cancelBtn.onclick = () => {
      event.preventDefault()
      updateDialog.close()
      updateDialog.remove()
    }
  }
  function clearUpdateDialog(){
    const theUpdateDialog = document.querySelector("#update-dialog");
    theUpdateDialog.remove();
  }
  function removeBook(index){
    myLibrary.splice(index,1);
    addBook();
  }
  function addBookDefault(){
    const booksEl = document.querySelector(".books");
    const addABook = document.createElement("div");
    addABook.classList.add("add-book");
    const plusSign = document.createElement("div");
    plusSign.textContent = "+";
    plusSign.onclick = renderDialog;
    booksEl.appendChild(addABook);
    addABook.appendChild(plusSign);
  }
  function clearContents(){
    const books = document.querySelector(".books")
    while(books.firstElementChild){
      books.firstElementChild.remove()
    }
  }
  function resetDialog(){
    const titleElement = document.querySelector("#title");
    const authorElement = document.querySelector("#author");
    const pagesElement = document.querySelector("#pages");
    const readPagesElement = document.querySelector("#read")
    titleElement.value = '';
    authorElement.value = '';
    pagesElement.value = 1;
    readPagesElement.value = 0;
  }

})()
