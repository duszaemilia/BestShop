
function updateSummary() {
// Zdefiniowanie cen
   const prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };

    // Pobierz elementy formularza
    const productsInput = document.getElementById('products');
    const ordersInput = document.getElementById('orders');
    const packageDropdown = document.getElementById('package');
    const accountingCheckbox = document.getElementById('accounting');
    const terminalCheckbox = document.getElementById('terminal');

    // Pobierz wartości z pól formularza
    const productsValue = parseInt(productsInput.value);
    const ordersValue = parseInt(ordersInput.value);
    const packageValue = packageDropdown.dataset.value;
    const accountingChecked = accountingCheckbox.checked;
    const terminalChecked = terminalCheckbox.checked;

    // Aktualizuj podsumowanie dla produktów
    const productsSummaryItem = document.querySelector('.list__item[data-id="products"]');
    if (productsValue) {
        productsSummaryItem.classList.add('open');
        const productsPrice = productsValue * prices.products;
        productsSummaryItem.querySelector('.item__calc').innerText = `${productsValue} * $${prices.products}`;
        productsSummaryItem.querySelector('.item__price').innerText = `$${productsPrice}`;
    } else {
        productsSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla zamówień
    const ordersSummaryItem = document.querySelector('.list__item[data-id="orders"]');
    if (ordersValue) {
        ordersSummaryItem.classList.add('open');
        const ordersPrice = ordersValue * prices.orders;
        ordersSummaryItem.querySelector('.item__calc').innerText = `${ordersValue} * $${prices.products}`;
        ordersSummaryItem.querySelector('.item__price').innerText = `$${ordersPrice}`;
    } else {
        ordersSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla wybranego pakietu
    const packageSummaryItem = document.querySelector('.list__item[data-id="package"]');
    if (packageValue) {
        packageSummaryItem.classList.add('open');
        packageSummaryItem.querySelector('.item__calc').innerText = packageValue;
        // Ustaw odpowiednią cenę dla wybranego pakietu
        let packagePrice = 0;
        if (packageValue === 'basic') {
            packagePrice = `${prices.package.basic}`;
        } else if (packageValue === 'professional') {
            packagePrice = `${prices.package.professional}`;
        } else if (packageValue === 'premium') {
            packagePrice = `${prices.package.premium}`;
        }
        packageSummaryItem.querySelector('.item__price').innerText = `$${packagePrice}`;
    } else {
        packageSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla opcji "Accounting"
    const accountingSummaryItem = document.querySelector('.list__item[data-id="accounting"]');
    if (accountingChecked) {
        accountingSummaryItem.classList.add('open');
        accountingSummaryItem.querySelector('.item__price').innerText = `$${prices.accounting}`;
    } else {
        accountingSummaryItem.classList.remove('open');
    }

// Aktualizuj podsumowanie dla opcji "Terminal"
    const terminalSummaryItem = document.querySelector('.list__item[data-id="terminal"]');
    if (terminalChecked) {
        terminalSummaryItem.classList.add('open');
        terminalSummaryItem.querySelector('.item__price').innerText = `$${prices.terminal}`;
    } else {
        terminalSummaryItem.classList.remove('open');
    }

// Oblicz całkowitą cenę
    let totalPrice = 0;
    if (productsValue) {
        totalPrice += productsValue * `${prices.products}`;
    }
    if (ordersValue) {
        totalPrice += ordersValue * `${prices.orders}`;
    }
    if (packageValue === 'basic') {
        totalPrice += `${prices.package.basic}`;
    } else if (packageValue === 'professional') {
        totalPrice += `${prices.package.professional}`;
    } else if (packageValue === 'premium') {
        totalPrice += `${prices.package.premium}`;
    }
    if (accountingChecked) {
        totalPrice += `${prices.accounting}`;
    }
    if (terminalChecked) {
        totalPrice += `${prices.terminal}`;
    }

// Aktualizuj całkowitą cenę w podsumowaniu
    const totalPriceElement = document.querySelector('.total__price');
    totalPriceElement.innerText = `$${totalPrice}`;

// Sprawdź, czy wyświetlić podsumowanie
    const summaryItems = document.querySelectorAll('.list__item');
    const summaryTotal = document.querySelector('.summary__total');
    let hasVisibleItems = false;
    summaryItems.forEach((item) => {
        if (item.classList.contains('open')) {
            hasVisibleItems = true;
        }
    });
    if (hasVisibleItems) {
        summaryTotal.classList.add('open');
    } else {
        summaryTotal.classList.remove('open');
    }
}

// Obsługa zdarzeń

// Walidacja pól input type="number"
const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.classList.remove('error');
            updateSummary();
        } else {
            input.classList.add('error');
        }
    });
});


// Obsługa zmiany wartości dropdown
const packageDropdown = document.getElementById('package');
const selectInput = document.querySelector('.select__input');
const selectDropdown = document.querySelector('#dropdown1');

// Funkcja obsługująca wybór wartości z dropdown
function dropdownChange(selectedValue) {
    selectInput.innerText = selectedValue;
    selectDropdown.classList.remove('open');
    packageDropdown.dataset.value = selectedValue;
    updateSummary();
}

//NIE DZIAŁA!!!! NIE DODAJE SIE KLASA OPEN
selectInput.addEventListener('click', function () {
    // selectDropdown.classList.add('open');
    // selectDropdown.style.display = 'block';
    selectDropdown.classList.toggle('open');
    // console.log ("zyje");
});


// selectInput.addEventListener('click', () => {
//     if (selectDropdown.classList.contains('open')) {
//         selectDropdown.classList.remove('open');
//     } else {
//         selectDropdown.classList.add('open');
//     }
// });


//Obsługa kliknięcia na elementy dropdown
const selectItems = packageDropdown.querySelectorAll('.select__dropdown li');
selectItems.forEach((item) => {
    item.addEventListener('click', () => {
        const selectedValue = item.getAttribute('data-value');
        dropdownChange(selectedValue);
    });
});

// Obsługa zamykania dropdowna po kliknięciu poza nim
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.select__dropdown')) {
        selectDropdown.classList.remove('open');
    }
});




// Obsługa zmiany stanu checkboxów
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        updateSummary();
    });
});