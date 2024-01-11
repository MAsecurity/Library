const myLibrary = [];

class Book{
  constructor(){

  }
  getTitle(){

  }
}

(function addBookToLibrary() {
  // do stuff here
  const addBookClick = document.querySelector(".add-book div");
  addBookClick.onclick =  renderDialog;
  function renderDialog(){
    const dialog = document.querySelector("#dialog")
    dialog.showModal()

  }
})()
