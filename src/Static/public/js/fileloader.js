
const fileContainer = document.querySelector('.files');
const searchBar = document.querySelector('.searchbar');
const navBar = document.querySelector('.navbar');
const fileDSP = document.querySelector('.fileDSP');
const fFRAME = document.querySelector('.fLOADER');
const lCONTAINER = document.querySelector('.loader');
const backBTN = document.getElementById('backBTN');
const fullSCRN = document.getElementById('fullSCRN');

// Function to toggle visibility of elements
const toggleElementVisibility = (element, isVisible) => {
    if (isVisible) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
};

// Function to handle file search
const handleSearch = () => {
    const query = searchBar.value.trim().toLowerCase();
    for (let file of fileContainer.children) {
        if (file instanceof Element) {
            const fileName = file.querySelector('span').innerText.trim().toLowerCase();
            const isVisible = fileName.includes(query) || !query;
            toggleElementVisibility(file, isVisible);
        }
    }
};

// Event listener for search bar input
searchBar.addEventListener('input', handleSearch);

// Fetch files and create file elements
fetch("/json/files.json")
    .then(response => response.json())
    .then(files => {
        files.forEach(file => {
            const fileName = file.name;

            const fileEl = document.createElement('div');
            fileEl.className = "file";
            fileEl.innerHTML = `
                <img src="${"../assets/imgs/g/" + file.img}" />
                <div class="overlay" />
                <span class="fileName">${file.name}</span>
            `;
            
            fileContainer.appendChild(fileEl);

            // Event listener for file click
            fileEl.addEventListener('click', () => {
                fileDSP.innerText = file.name;
                fileContainer.style.display = "none";
                navBar.classList.add('hidden');
                searchBar.classList.add('hidden');
                const source = `../assets/g/${file.link}`;
                fFRAME.src = source;
                lCONTAINER.classList.remove('hidden');
            });
        });
    });

// Event listener for back button
backBTN.addEventListener('click', () => {
    fileDSP.innerText = '';
    fileContainer.style.display = "flex";
    navBar.classList.remove('hidden');
    searchBar.classList.remove('hidden');
    fFRAME.src = '';
    lCONTAINER.classList.add('hidden');
});

// Event listener for fullscreen button
fullSCRN.addEventListener('click', () => {
    fFRAME.requestFullscreen();
});

// Function to request game
function requestGame() {
    const url = "https://forms.gle/BZSMU46ZVqM54SRGA";
    const win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    win.document.head.innerHTML = `<title>Dashboard</title><br><link rel="icon" type="image/x-icon" href="https://assets.huntfiles.tech/imgs/canvas-logo.ico">`;
    win.document.body.appendChild(iframe);
}

