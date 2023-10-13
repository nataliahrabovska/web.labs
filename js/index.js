
const laptops = [
    {
        model: "HP",
        screen_size: 15.6,
        ram: 8,
        storage: "256GB SSD",
        priceUAH: 357
    },
    {
        model: "Dell",
        screen_size: 14,
        ram: 16,
        storage: "512GB SSD",
        priceUAH: 899
    },
    {
        model: "Lenovo",
        screen_size: 13.3,
        ram: 12,
        storage: "1TB HDD",
        priceUAH: 649
    },
    {
        model: "Lenovo",
        screen_size: 13.3,
        ram: 12,
        storage: "1TB HDD",
        priceUAH: 100
    },
    {
        model: "Lenovo",
        screen_size: 18,
        ram: 8,
        storage: "1TB HDD",
        priceUAH: 80
    },
];


const cardsContainer = document.querySelector('.cards_container');
const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.button_search');
const clearButton = document.querySelector('.button_clear');
const countTotal = document.getElementById('press')
const sortByPrice = document.getElementById('sort_button')
const totalDiv = document.querySelector(".total-div");

let isFiltered = false;
let filteredLaptops = [];

const returnCard = ({ model, screen_size, ram, storage, priceUAH }) => `
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
    <button class="edit-button">Edit</button>
</div>
`;

const clearContainer = () => {
    cardsContainer.innerHTML = null;
}

const clearInput = () => {
    searchInput.value = null;
}


const openEditModal = (index) => {
    console.log(index)
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');

    const laptop = isFiltered ? filteredLaptops[index] : laptops[index];
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
    })
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const editedLaptop = {
            model: document.getElementById('editModel').value,
            screen_size: parseFloat(document.getElementById('editScreenSize').value),
            ram: parseInt(document.getElementById('editRam').value),
            storage: document.getElementById('editStorage').value,
            priceUAH: parseFloat(document.getElementById('editPriceUAH').value),
        };

        if (
            !isNaN(index) &&
            index >= 0 &&
            (editedLaptop.priceUAH >= 0)  // Перевірка на від'ємну ціну
        ) {
            // Решта коду
        } else {
            alert("Ціна не може бути від'ємною або не є числом.");
        }

        if (!isNaN(index) && index >= 0) {
            if (isFiltered) {
                filteredLaptops[index] = editedLaptop;
                renderModelsOnLoad(filteredLaptops);
            } else {
                laptops[index] = editedLaptop;
                renderModelsOnLoad(laptops);
            }
        }


        editModal.classList.add('hidden-element');
    });
};



const renderModelsOnLoad = (laptop) => {
    clearContainer()
    laptop.forEach(laptop => {
        cardsContainer.innerHTML += returnCard(laptop);
    })
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => openEditModal(index));
    });
}

renderModelsOnLoad(laptops)

searchButton.addEventListener('click', (event) => {
    filteredLaptops.length = 0;
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log(searchTerm);
    filteredLaptops = laptops.filter(laptop => laptop.model.toLowerCase().includes(searchTerm));
    if (filteredLaptops.length !== 0) {
        isFiltered = true;
    } else {
        isFiltered = false;
    }
    console.log(filteredLaptops);
    clearContainer();
    renderModelsOnLoad(filteredLaptops);
});


clearButton.addEventListener('click', () => {
    searchInput.value = '';
    renderModelsOnLoad(laptops);
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
        renderModelsOnLoad(filteredLaptops);

    } else {
        laptops.sort((a, b) => a.priceUAH - b.priceUAH);
        clearContainer();
        renderModelsOnLoad(laptops);

    }
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => openEditModal(index));
    });
});

const createLaptop = (model, screen_size, ram, storage, priceUAH) => {
    if (
        isNaN(screen_size) ||
        isNaN(ram) ||
        isNaN(priceUAH) || 
        priceUAH < 0
    ) {
        alert("Ціна не може бути від'ємною або не є числом.");
        return;
    }

    // Create a new laptop object
    const newLaptop = {
        model,
        screen_size,
        ram,
        storage,
        priceUAH
    };

    laptops.push(newLaptop);
    clearContainer();
    renderModelsOnLoad(laptops);

    // Clear the input fields
    document.getElementById('model').value = '';
    document.getElementById('screen_size').value = '';
    document.getElementById('ram').value = '';
    document.getElementById('storage').value = '';
    document.getElementById('priceUAH').value = '';

    // Close the create modal (if desired)
    document.getElementById('createModal').style.display = 'none';
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


