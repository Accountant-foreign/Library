let myLibrary=[];
var xImg=document.createElement('img'); xImg.src="./images/delete.png"; xImg.alt="delete.png"; xImg.id="img";
xImg.addEventListener('click', deletePopUp);

let cell=document.createElement('div'); cell.className="cell";
let title=document.createElement('div'); title.className="title";
let author=document.createElement('div'); author.className="author";
let pagesRead=document.createElement('div'); pagesRead.className="pages-read";
let read=document.createElement('button'); read.className="read"; 
let removeButton=document.createElement('button'); removeButton.className="remove"; removeButton.textContent="Remove";
read.setAttribute('onclick', 'toggleRead(this)');
removeButton.setAttribute('onclick', 'removeCell(this)');

function toggleRead(element){
    let authorToggleRead=element.previousElementSibling.previousElementSibling.textContent;
    if(element.className=="read"){
        element.textContent="Not Read";
        element.className="not-read";
    } else{
        element.textContent="Read";
        element.className="read";
    }
    let foundIndex=myLibrary.findIndex(x => x.author==authorToggleRead);
    myLibrary[foundIndex].read=element.textContent;
}

function removeCell(element){
    let parent=element.parentNode;
    let author=element.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let foundIndex=myLibrary.findIndex(x => x.author==author);
    myLibrary.splice(foundIndex, 1);
    parent.remove();
}

function popUp() {
    let popUpDiv=document.createElement('div');
    popUpDiv.className="pop-up";

    let form=document.createElement('form');
    let input1=document.createElement('input'); input1.type="text"; input1.className="pop-up-1 get-input"; input1.placeholder="Title*";
    let input2=document.createElement('input'); input2.type="text"; input2.className="pop-up-2 get-input"; input2.placeholder="Author*";
    let input3=document.createElement('input'); input3.type="number"; input3.className="pop-up-3 get-input"; input3.placeholder="Number of Pages*";
    
    let readInput=document.createElement('div'); readInput.className="pop-up-4";
    let h3=document.createElement('h3'); h3.textContent="Have you read it? \u00A0\u00A0"
    let input4=document.createElement('input'); input4.type="checkbox"; input4.name="read"; input4.id="read"; input4.className="get-input";
    readInput.append(h3, input4);
    let submit=document.createElement('button'); submit.textContent="Submit"; submit.id="submit";
    let span=document.createElement('span'); span.id="span"; span.style.color="red"; span.style.fontSize="10px";
    submit.addEventListener('click', (event) => {event.preventDefault(); newEntry();});
    form.append(input1, input2, input3, readInput, submit, span);
    popUpDiv.append(form);
    document.body.appendChild(popUpDiv);

    document.body.prepend(xImg);
}

function deletePopUp(){
    const elements = document.getElementsByClassName("pop-up");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
        console.log(elements[0]);
    }
    xImg.remove();
}

class Book{
    constructor(title, author, pages, read) {
        this.title="\""+title+"\"";
        this.author=author;
        this.pages=pages;
        if(read){
            this.read="Read"
        } else {
            this.read="Not Read";
        }
    }
}

function newEntry(){
    if(!validate()){
        document.getElementById('span').textContent="Some fields may not have been filled yet!"
        return;
    }
    let inputs=document.getElementsByClassName("get-input");
    document.getElementById('book-storage').textContent="";
    let newBook=new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
    myLibrary.push(newBook);
    for(let i=0; i<myLibrary.length; i++){
        let newCell=cell.cloneNode(true);
        let newTitle=title.cloneNode(true); newTitle.textContent=myLibrary[i].title;
        let newAuthor=author.cloneNode(true); newAuthor.textContent=myLibrary[i].author;
        let newPagesRead=pagesRead.cloneNode(true); newPagesRead.textContent=myLibrary[i].pages;
        let newRead=read.cloneNode(true);
        if(myLibrary[i].read=="Not Read"){
            newRead.className="not-read";
        }
        newRead.textContent=myLibrary[i].read;
        newCell.append(newTitle, newAuthor, newPagesRead, newRead, removeButton.cloneNode(true));
        document.getElementById('book-storage').append(newCell);
    }
    deletePopUp();
}

function validate(){
    document.getElementById('span').textContent="";
    let inputs=document.getElementsByClassName("get-input");
    let count=0;
    for(let i=0; i<inputs.length-1; i++){
        if(inputs[i].value.length>0){
            count++;
        }
    }
    if(count==3){
        return true;
    }
    return false;
}
