const cardsContainer = document.querySelector('.cards_container');
const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.button_search');
const clearButton = document.querySelector('.button_clear');
const countTotal = document.getElementById('press');
const sortByPrice = document.getElementById('sort_button');
const totalDiv = document.querySelector(".total-div");

let isFiltered = false;
let laptops = []
let filteredLaptops = [];
const returnCard = ({ id, model, screen_size, ram, storage, priceUAH }) => `
<div class="card">
    <img src="image/png-transparent-laptop-personal-computer-laptops-electronics-photography-computer-thumbnail-removebg-preview.png" class="laptop_img">
    <h4 class="heading">Laptop</h4>
    <p class="text"> 
        Model: ${model}
        <br>
        Screen Size: ${screen_size}
        <br>
        RAM: ${ram}
        <br>
        Storage: ${storage}
        <br>
        Price: ${priceUAH}
    </p>
    <button class="edit-button" data-id="${id}">Edit</button>
    <button class="delete-button" data-id="${id}">Delete</button>
</div>
`;


const clearContainer = () => {
    cardsContainer.innerHTML = '';
}

const clearInput = () => {
    searchInput.value = null;
}

function findLaptopByIndex(index , array) {
    for (let i = 0; i  < array.length; i ++) {
        if (array[i].id === index) {
            return array[i];
        }
    }

}

const openEditModal = async (index) => {
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    
    try {
        const response = await fetch(`http://localhost:5000/laptops/${index}`, { method: 'GET' });

        if (response.ok) {
            const laptop = await response.json();
            document.getElementById('editIndex').value = index;
            document.getElementById('editModel').value = laptop.model;
            document.getElementById('editScreenSize').value = laptop.screen_size;
            document.getElementById('editRam').value = laptop.ram;
            document.getElementById('editStorage').value = laptop.storage;
            document.getElementById('editPriceUAH').value = laptop.priceUAH;

            if (editModal.classList.contains('hidden-element')) {
                editModal.classList.remove('hidden-element');
            }

            document.getElementById('closeEditModal').addEventListener('click', () => {
                editModal.classList.add('hidden-element');
            });

            editForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const editedLaptop = {
                    id: parseInt(index),
                    model: document.getElementById('editModel').value,
                    screen_size: parseFloat(document.getElementById('editScreenSize').value),
                    ram: parseInt(document.getElementById('editRam').value),
                    storage: document.getElementById('editStorage').value,
                    priceUAH: parseFloat(document.getElementById('editPriceUAH').value),
                };

                if (editedLaptop.priceUAH >= 0) {
                    try {
                        const response = await fetch(`http://localhost:5000/laptops/${index}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(editedLaptop)
                        });

                        if (response.ok) {
                            const updatedData = await response.json();
                            // Handle successful update, if needed
                            console.log('Laptop updated successfully', updatedData);
                            editModal.classList.add('hidden-element');

                            // Оновіть вміст відповідної картки
                            const card = document.querySelector(`.card[data-id="${index}"]`);
                            if (card) {
                                card.querySelector('.text').innerHTML = `
                                    Model: ${editedLaptop.model}
                                    <br>
                                    Screen Size: ${editedLaptop.screen_size}
                                    <br>
                                    RAM: ${editedLaptop.ram}
                                    <br>
                                    Storage: ${editedLaptop.storage}
                                    <br>
                                    Price: ${editedLaptop.priceUAH}
                                `;
                            }
                            window.location.reload();
                        } else {
                            // Handle errors here
                            console.error('Failed to update laptop');
                        }
                    } catch (error) {
                        // Handle network-related errors
                        console.error('Network error:', error);
                    }
                } else {
                    alert("Ціна не може бути від'ємною або не є числом.");
                }
            });
        } else {
            console.error('Failed to fetch laptop data');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};




const renderModels = (laptopsFunc) => {
    clearContainer();
    laptops = []; // Clear the laptops array
    laptopsFunc.forEach((laptop) => {
        cardsContainer.innerHTML += returnCard(laptop);
        laptops.push(laptop);
    });
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            openEditModal(id)
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-id');
            console.log(index + 'to delete');
            deleteLaptop(index);
        });
    });
};

const deleteLaptop = async (index) => {
    try {
        console.log('here delete');
        const laptop = isFiltered ? filteredLaptops[index] : laptops[index];
        const response = await fetch(`http://localhost:5000/laptops/${index}`, {
            method: 'DELETE',
        });
        console.log(response.status);
        if (response.ok) {
            console.log(4);
            if (isFiltered) {
                filteredLaptops.splice(index, 1);
                renderModels(filteredLaptops);
            } else {
                laptops.splice(index, 1);
                renderModels(laptops);
            }
            window.location.reload();
        } else {
            console.log('not ok status');
        }
    } catch (error) {
        console.error('Error deleting laptop:', error);
    }
};


const fetchLaptops = async () => {
    try {
        const response = await fetch('http://localhost:5000/laptops', { method: 'GET' });
        if (response.ok) {
            const laptops = await response.json();
            console.log(laptops)
            renderModels(laptops);
        } else {

        }
    } catch (error) {
        
    }
};

fetchLaptops();

searchButton.addEventListener('click', (event) => {
    filteredLaptops = []; // Clear the filteredLaptops array before adding new results
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log(searchTerm);
    filteredLaptops = laptops.filter(laptop => laptop.model.toLowerCase().includes(searchTerm));
    isFiltered = true; // Set isFiltered to true if there are search results
    console.log(filteredLaptops);
    clearContainer();
    renderModels(filteredLaptops);
});



clearButton.addEventListener('click', () => {
    searchInput.value = '';
    renderModels(laptops);
});

const calculateTotal = (laptops, field) => {
    return laptops.reduce((total, laptop) => total + laptop[field], 0);
};

countTotal.addEventListener('click', () => {
    let totalSum;
    if (isFiltered) {
        totalSum = calculateTotal(filteredLaptops, 'priceUAH');
    } else {
        totalSum = calculateTotal(laptops, 'priceUAH');
    }
    totalDiv.textContent = `Total: ${totalSum} UAH`;
});


sortByPrice.addEventListener('click', () => {
    if (isFiltered) {
        filteredLaptops.sort((a, b) => a.priceUAH - b.priceUAH);
        clearContainer();
        renderModels(filteredLaptops);
    } else {
        laptops.sort((a, b) => a.priceUAH - b.priceUAH);
        clearContainer();
        renderModels(laptops);
    }
});


const createLaptop = async (model, screen_size, ram, storage, priceUAH) => {
    console.log('work create start')
    if (
        isNaN(screen_size) ||
        isNaN(ram) ||
        isNaN(priceUAH) ||
        priceUAH < 0
    ) {
        alert("Ціна не може бути від'ємною або не є числом.");
        return;
    }

    const newLaptop = {
        model,
        screen_size,
        ram,
        storage,
        priceUAH
    };

    if (newLaptop.model && newLaptop.screen_size && newLaptop.ram && newLaptop.storage && newLaptop.priceUAH) {
        try {
            const response = await fetch('http://localhost:5000/laptops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLaptop)
            });

            if (response.ok) {
                const createdLaptop = await response.json();
                if (createdLaptop.model && createdLaptop.screen_size && createdLaptop.ram && createdLaptop.storage && createdLaptop.priceUAH) {
                    laptops.push(createdLaptop);
                    clearContainer();
                    renderModels(laptops);
                    window.location.reload()
                } else {
                    
                }
            } else {
                // Handle errors here
            }
        } catch (error) {
            // Handle network-related errors
        }
    }
};



const openCreateModal = () => {
    document.getElementById('createModal').style.display = 'block';
    const closeButton = document.getElementById('closeCreateModal');
    closeButton.addEventListener('click', () => {
        document.getElementById('createModal').style.display = 'none';
    });


    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const model = document.getElementById('model').value;
        const screen_size = parseFloat(document.getElementById('screen_size').value);
        const ram = parseInt(document.getElementById('ram').value);
        const storage = document.getElementById('storage').value;
        const priceUAH = parseFloat(document.getElementById('priceUAH').value);

        createLaptop(model, screen_size, ram, storage, priceUAH);

        document.getElementById('model').value = '';
        document.getElementById('screen_size').value = '';
        document.getElementById('ram').value = '';
        document.getElementById('storage').value = '';
        document.getElementById('priceUAH').value = '';
        document.getElementById('createModal').style.display = 'none';
    });

}

document.getElementById('openCreateModalButton').addEventListener('click', openCreateModal);

const screen_sizeInput = document.getElementById('screen_size');
screen_sizeInput.addEventListener('input', () => {
    if (screen_sizeInput.value < 0) {
        screen_sizeInput.value = 0;
    }
});

const ramInput = document.getElementById('ram');
ramInput.addEventListener('input', () => {
    if (ramInput.value < 0) {
        ramInput.value = 0;
    }
});

const editScreenSizeInput = document.getElementById('editScreenSize');
editScreenSizeInput.addEventListener('input', () => {
    if (editScreenSizeInput.value < 0) {
        editScreenSizeInput.value = 0;
    }
});

const editRamInput = document.getElementById('editRam');
editRamInput.addEventListener('input', () => {
    if (editRamInput.value < 0) {
        editRamInput.value = 0;
    }
});


