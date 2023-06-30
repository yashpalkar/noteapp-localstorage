const addButton=document.getElementById("add");

const updateLSData=()=>{
    const textAreaData=document.querySelectorAll("textarea");
    const notes=[];
    console.log(textAreaData);

    textAreaData.forEach((note)=>
    {   if(note.value){
        return notes.push(note.value);
    }
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}


const addNewNotes=(text='')=>{
    const note=document.createElement("div");
    note.classList.add("note");

    const htmlData=`     <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
</div>
<div class="main ${text ? "" :"hidden"}"></div>
<textarea class="${text ? "hidden" :""}" ></textarea>`;

note.insertAdjacentHTML(
    "afterbegin",htmlData
);
const editButton=note.querySelector(".edit");
const deleteButton=note.querySelector(".delete");
const mainDiv=note.querySelector(".main");
const textaArea=note.querySelector("textarea");

//deleting the node

deleteButton.addEventListener('click',() => {
    note.remove();
    updateLSData();
})

// toggle using editbtn

textaArea.value=text;
mainDiv.innerHTML=text;

editButton.addEventListener("click",()=>{
    mainDiv.classList.toggle('hidden');
    textaArea.classList.toggle('hidden');
}
)

textaArea.addEventListener('change',(event)=>{
const tempvalue=event.target.value;

mainDiv.innerHTML=tempvalue;

//update text to local storage
updateLSData()
});

// console.log(note);
document.body.appendChild(note)
// document.getElementById("note").appendChild(note);
// document.querySelector("main").classList.add('hidden');

}

// fetch data from local

const fetchdata=JSON.parse(localStorage.getItem("notes"))

if(fetchdata){
    fetchdata.forEach((str_note)=>{
        if(str_note){
        addNewNotes(str_note);
        }
    });
}

addButton.addEventListener("click",()=>{
addNewNotes()

}

)