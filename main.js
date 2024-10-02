const DataBuku = []
const evencreateElement = 'EventCustom';
const textiscomplete = 'textcomplete';

const eventSave = 'save_event'; 
const storageKey = 'bookshelf-app-starter-project'; 



function storageBrowserSupport(){
    if (typeof (Storage) === undefined){
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(storageKey);
    let book = JSON.parse(serializedData);

    if (book !== null) {
        for (const index of book) {
            DataBuku.push(index);

        }
    }

    document.dispatchEvent(new Event(evencreateElement));
}


function saveData() {
    if (storageBrowserSupport()) {
        const data = JSON.stringify(DataBuku);
        localStorage.setItem(storageKey, data);
        
        document.dispatchEvent(new Event(eventSave));
    }
}

document.addEventListener(eventSave, function () {
    localStorage.getItem(storageKey)
});


function CocokkanId(book){
    for (let item in DataBuku){
        if (DataBuku[item].id === book.id){
            return item
        }
    }
    return -1
}


function deleteBook(book){
    outputcocokkanId = CocokkanId(book)

    if (outputcocokkanId == -1)return;
    DataBuku.splice(outputcocokkanId, 1)

    saveData()
    document.dispatchEvent(new Event(evencreateElement));
}


function find_ID(book){
    for (item in DataBuku){
        if (DataBuku[item] == book){
            return item;
        }
    }
    return null
}
function BookSwapNoComplete(book){
    outputCariId = find_ID(book)

    if (outputCariId == null)return;
    book.iscomplete = true;

    document.dispatchEvent(new Event(evencreateElement));
    saveData();
}

function BookSwapComplete(book){
    outputCariId = find_ID(book)

    if (outputCariId == null)return;
    book.iscomplete = false;

    document.dispatchEvent(new Event(evencreateElement))
}

function createElement(bookitem){

    const containerInformasiBook = document.createElement('div');
    containerInformasiBook.setAttribute('data-bookid',bookitem.id);
    containerInformasiBook.setAttribute('data-testid','bookItem');

    const elementJudulBook = document.createElement('h3');
    elementJudulBook.setAttribute('data-testid',"bookItemTitle");
    elementJudulBook.innerText = bookitem.judul;

    const elementPenulisBook = document.createElement('p');
    elementPenulisBook.setAttribute('data-testid',"bookItemAuthor")
    elementPenulisBook.innerText = `PENULIS : ${bookitem.penulis}`;

    const elementTahunBook = document.createElement('p');
    elementTahunBook.setAttribute('data-testid',"bookItemYear")
    elementTahunBook.innerText = `TAHUN : ${bookitem.tahun}`;
    
    const createContainerButton = document.createElement('div'); 
    containerInformasiBook.append(elementJudulBook,elementPenulisBook,elementTahunBook,createContainerButton);
    
    const elementButtonIsComplete = document.createElement('button');
    elementButtonIsComplete.setAttribute('data-testid','bookItemIsCompleteButton');
    
    const elementButtonDel = document.createElement('button');
    elementButtonDel.setAttribute('data-testid',"bookItemDeleteButton");
    elementButtonDel.innerText = "Hapus Buku";
    
    const elementButtonEdit = document.createElement('button');
    elementButtonEdit.setAttribute('data-testid',"bookItemEditButton");
    elementButtonEdit.innerText = "Edit Buku";
    
    createContainerButton.append(elementButtonIsComplete,elementButtonDel,elementButtonEdit)
    
    if (bookitem.iscomplete == true){
        console.log(`Kondisi Buku ${bookitem.iscomplete}`)   
        elementButtonIsComplete.innerText = "Buku Belum Dibaca"
        
        elementButtonIsComplete.addEventListener('click', function(){
            BookSwapComplete(bookitem)
        })

        elementButtonDel.addEventListener('click', function(){
            deleteBook(bookitem)
        })
        
    }
    
    if (bookitem.iscomplete == false){
        console.log(`Kondisi Buku ${bookitem.iscomplete}`)
        elementButtonIsComplete.innerText = "Buku Sudah Dibaca";
        
        elementButtonIsComplete.addEventListener('click', function(){
            BookSwapNoComplete(bookitem)
        })

        elementButtonDel.addEventListener('click', function(){
            deleteBook(bookitem)
        })
    }
    
    return containerInformasiBook
}


function randomId(){
    return +new Date()
}


function toObjek(id,judul,penulis,tahun,iscomplete){
    return{
        id,
        judul,
        penulis,
        tahun,
        iscomplete
    }
}

function tambahBuku(){
    const judulBuku = document.getElementById('bookFormTitle').value;
    const penulisBuku = document.getElementById('bookFormTitle').value;
    const tahunBuku = document.getElementById('bookFormYear').value;
    const iscomplete = document.getElementById('bookFormIsComplete').checked;
    
    const idcustom = randomId()
    const addobjek = toObjek(idcustom,judulBuku,penulisBuku,tahunBuku,iscomplete)
    DataBuku.push(addobjek)

    saveData()
    document.dispatchEvent(new Event(evencreateElement));
};





document.addEventListener(evencreateElement ,function(){
    const elementNoComplete = document.getElementById('incompleteBookList');
    elementNoComplete.innerHTML = '';

    const elementComplete = document.getElementById('completeBookList');
    elementComplete.innerHTML = '';

    for (item of DataBuku){
        outputElement = createElement(item)
        if (item.iscomplete){
            elementComplete.append(outputElement)
        }else{
            elementNoComplete.append(outputElement)
        }
    }

});

// EVENT CUSTOM (HANDLER)
document.addEventListener(textiscomplete, function(ev){
    const iscomplete = document.getElementById('bookFormIsComplete');
    const indentitasTextiscomplete = document.getElementById('israk');
    
    iscomplete.addEventListener('click', function(){
        if (iscomplete.checked) return; 
        indentitasTextiscomplete.innerText = 'Belum Dibaca';
    })
    
    iscomplete.addEventListener('click', function(){
        if (!iscomplete.checked)return ;
        indentitasTextiscomplete.innerText = 'Sudah Dibaca';
    });
});


/// DOM LOADED
document.addEventListener('DOMContentLoaded', function(){
    if (storageBrowserSupport()){
        loadDataFromStorage()
    }

    document.dispatchEvent(new Event(textiscomplete)); //Event Custom (Pemicu)

    const selectorFormInputBuku = document.getElementById('bookForm');
    selectorFormInputBuku.addEventListener('submit', function(ev){
        
        tambahBuku();
        ev.preventDefault();
    });
});

