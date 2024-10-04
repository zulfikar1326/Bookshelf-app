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
};

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(storageKey);
    let book = JSON.parse(serializedData);

    if (book !== null) {
        for (const index of book) {
            DataBuku.push(index);

        }
    }

    document.dispatchEvent(new Event(evencreateElement));
};

function saveData() {
    if (storageBrowserSupport()) {
        const data = JSON.stringify(DataBuku);
        localStorage.setItem(storageKey, data);
        
        document.dispatchEvent(new Event(eventSave));
    }
};

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
};

function deleteBook(book){
    outputcocokkanId = CocokkanId(book)

    if (outputcocokkanId == -1)return;
    DataBuku.splice(outputcocokkanId, 1)

    saveData()
    document.dispatchEvent(new Event(evencreateElement));
};

function find_ID(book){
    for (item in DataBuku){
        if (DataBuku[item] == book){
            return item;
        }
    }
    return null
};
function BookSwapNoComplete(book){
    outputCariId = find_ID(book)

    if (outputCariId == null)return;
    book.isComplete = false;

    document.dispatchEvent(new Event(evencreateElement));
    saveData();
};

function BookSwapComplete(book){
    const outputCariId = find_ID(book)


    if (outputCariId == null)return;
    book.isComplete = true;

    saveData();
    document.dispatchEvent(new Event(evencreateElement))
};

function createElement(bookitem){
    const containerInformasiBook = document.createElement('div');
    containerInformasiBook.setAttribute('data-bookid',bookitem.id);
    containerInformasiBook.setAttribute('data-testid','bookItem');

    const elementJudulBook = document.createElement('h3');
    elementJudulBook.setAttribute('data-testid',"bookItemTitle");
    elementJudulBook.innerText = bookitem.title;

    const elementPenulisBook = document.createElement('p');
    elementPenulisBook.setAttribute('data-testid',"bookItemAuthor")
    elementPenulisBook.innerText = `PENULIS : ${bookitem.author}`;

    const elementTahunBook = document.createElement('p');
    elementTahunBook.setAttribute('data-testid',"bookItemYear")
    elementTahunBook.innerText = `TAHUN : ${bookitem.year}`;
    
    const createContainerButton = document.createElement('div'); 
    containerInformasiBook.append(elementJudulBook,elementPenulisBook,elementTahunBook,createContainerButton);
    
    let elementButtonIsComplete = document.createElement('button');
    elementButtonIsComplete.setAttribute('data-testid','bookItemIsCompleteButton');
    
    let elementButtonDel = document.createElement('button');
    elementButtonDel.setAttribute('data-testid',"bookItemDeleteButton");
    elementButtonDel.innerText = "Hapus Buku";
    
    let elementButtonEdit = document.createElement('button');
    elementButtonEdit.setAttribute('data-testid',"bookItemEditButton");
    elementButtonEdit.innerText = "Edit Buku";
    
    createContainerButton.append(elementButtonIsComplete,elementButtonDel,elementButtonEdit);

    if (bookitem.isComplete == true){
        elementButtonIsComplete.innerText = 'Buku Belum Dibaca';

        elementButtonIsComplete.addEventListener('click', function(){
            BookSwapNoComplete(bookitem);
        })
        elementButtonDel.addEventListener('click', function(){
            deleteBook(bookitem)
        })
        
    }else{
        elementButtonIsComplete.innerText = 'Buku Sudah Dibaca';

        elementButtonIsComplete.addEventListener('click', function(){
            BookSwapComplete(bookitem);
        })
        elementButtonDel.addEventListener('click', function(){
            deleteBook(bookitem)
        })

    }
    return containerInformasiBook
};

function randomId(){
    return +new Date()
};

function toObjek(id,title,author,year,isComplete){
    return{
        id,
        title,
        author,
        year,
        isComplete
    }
};

function tambahBuku(){
    console.log('Fungsi Tambah Buku Berjalan')
    const judulBuku = document.getElementById('bookFormTitle').value;
    const penulisBuku = document.getElementById('bookFormTitle').value;
    const tahunBuku = document.getElementById('bookFormYear').value;
    const iscomplete = document.getElementById('bookFormIsComplete').checked;
    
    const idcustom = randomId()
    const addobjek = toObjek(idcustom,judulBuku,penulisBuku,tahunBuku,iscomplete)
    DataBuku.push(addobjek)

    saveData();
    document.dispatchEvent(new Event(evencreateElement));
};

document.addEventListener(evencreateElement ,function(){
    
    const elementNoComplete = document.getElementById('incompleteBookList');
    elementNoComplete.innerHTML = '';

    const elementComplete = document.getElementById('completeBookList');
    elementComplete.innerHTML = '';

    for (item of DataBuku){
        let outputCreateElement = createElement(item);

        if (item.isComplete === true){
            elementComplete.append(outputCreateElement);
            
        }else{
            elementNoComplete.append(outputCreateElement)
        }

    }

});

document.addEventListener(textiscomplete, function(ev){
    const iscomplete = document.getElementById('bookFormIsComplete');
    const indentitasTextiscomplete = document.querySelector('.israk');
    
    iscomplete.addEventListener('click', function(){
        if (iscomplete.checked) return; 
        indentitasTextiscomplete.innerText = 'Belum Dibaca';
    })
    
    iscomplete.addEventListener('click', function(){
        if (!iscomplete.checked)return ;
        indentitasTextiscomplete.innerText = 'Sudah Dibaca';
    });
});


document.addEventListener('DOMContentLoaded', function(){
    if (storageBrowserSupport()){
        loadDataFromStorage()
    }

    document.dispatchEvent(new Event(textiscomplete));

    const selectorFormInputBuku = document.getElementById('bookForm');
    selectorFormInputBuku.addEventListener('submit', function(ev){
        
        tambahBuku();
        ev.preventDefault();
    });
});

