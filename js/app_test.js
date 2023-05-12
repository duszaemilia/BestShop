// function updateSummary () {
//
//     const form = document.querySelector('form');
// //stałe z lewej strony kalkulatora wprowadzone przez usera
//     const productInput = document.getElementById('products');
//     const ordersInput = document.getElementById('orders');
//     const package = form.querySelector("#package");
//     const accounting = form.querySelector("#accounting");
//     const terminal = form.querySelector("#terminal");
//
// //stałe z prawej  strony calkulatora
//     const container = document.querySelector('#total-price');
//     const price = document.querySelector('.total__price');
//     const productsItem = document.querySelector('.list__item[data-id="products"]');
//
//     if (productInput > 0) {
//         productsItem.classList.add('open');
//         // productsItem.style.display = 'block';
//         const productPrice = productInput * 0.5;
//         productsItem.querySelector(('.item__calc').innerText = '${productInput} * $0.5');
//         productsItem.querySelector(('item__price')).innerText = '$${productPrice}';
//     } else {
//         productsItem.classList.remove('open');
//     }
// }




function updateSummary() {
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
        const productsPrice = productsValue * 0.5; // Cena za produkt - przykładowa wartość
        productsSummaryItem.querySelector('.item__calc').textContent = `${productsValue} * $0.5`;
        productsSummaryItem.querySelector('.item__price').textContent = `$${productsPrice}`;
    } else {
        productsSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla zamówień
    const ordersSummaryItem = document.querySelector('.list__item[data-id="orders"]');
    if (ordersValue) {
        ordersSummaryItem.classList.add('open');
        const ordersPrice = ordersValue * 0.5; // Cena za zamówienie - przykładowa wartość
        ordersSummaryItem.querySelector('.item__calc').textContent = `${ordersValue} * $0.5`;
        ordersSummaryItem.querySelector('.item__price').textContent = `$${ordersPrice}`;
    } else {
        ordersSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla wybranego pakietu
    const packageSummaryItem = document.querySelector('.list__item[data-id="package"]');
    if (packageValue) {
        packageSummaryItem.classList.add('open');
        packageSummaryItem.querySelector('.item__calc').textContent = packageValue;
        // Ustaw odpowiednią cenę dla wybranego pakietu
        let packagePrice = 0;
        if (packageValue === 'basic') {
            packagePrice = 10; // Cena dla pakietu "Basic"
        } else if (packageValue === 'professional') {
            packagePrice = 20; // Cena dla pakietu "Professional"
        } else if (packageValue === 'premium') {
            packagePrice = 30; // Cena dla pakietu "Premium"
        }
        packageSummaryItem.querySelector('.item__price').textContent = `$${packagePrice}`;
    } else {
        packageSummaryItem.classList.remove('open');
    }

    // Aktualizuj podsumowanie dla opcji "Accounting"
    const accountingSummaryItem = document.querySelector('.list__item[data-id="accounting"]');
    if (accountingChecked) {
        accountingSummaryItem.classList.add('open');
        accountingSummaryItem.querySelector('.item__price').textContent = '$10'; // Cena dla opcji "Accounting"
    } else {
        accountingSummaryItem.classList.remove('open');
    }

// Aktualizuj podsumowanie dla opcji "Terminal"
const terminalSummaryItem = document.querySelector('.list__item[data-id="terminal"]');
if (terminalChecked) {
    terminalSummaryItem.classList.add('open');
    terminalSummaryItem.querySelector('.item__price').textContent = '$20'; // Cena dla opcji "Terminal"
} else {
    terminalSummaryItem.classList.remove('open');
}

// Oblicz całkowitą cenę
let totalPrice = 0;
if (productsValue) {
    totalPrice += productsValue * 0.5; // Cena za produkt
}
if (ordersValue) {
    totalPrice += ordersValue * 0.5; // Cena za zamówienie
}
if (packageValue === 'basic') {
    totalPrice += 10; // Cena za pakiet "Basic"
} else if (packageValue === 'professional') {
    totalPrice += 20; // Cena za pakiet "Professional"
} else if (packageValue === 'premium') {
    totalPrice += 30; // Cena za pakiet "Premium"
}
if (accountingChecked) {
    totalPrice += 10; // Cena za opcję "Accounting"
}
if (terminalChecked) {
    totalPrice += 20; // Cena za opcję "Terminal"
}

// Aktualizuj całkowitą cenę w podsumowaniu
const totalPriceElement = document.querySelector('.total__price');
totalPriceElement.textContent = `$${totalPrice}`;

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
const selectInput = packageDropdown.querySelector('.select__input');
const selectDropdown = packageDropdown.querySelector('.select__dropdown');
const selectItems = packageDropdown.querySelectorAll('.select__dropdown li');
selectInput.addEventListener('click', () => {
    selectDropdown.classList.toggle('open');
});
selectItems.forEach((item) => {
    item.addEventListener('click', () => {
        const selectedValue = item.getAttribute('data-value');
        selectInput.textContent = item.textContent;
        selectDropdown.classList.remove('open');
        packageDropdown.dataset.value = selectedValue;
        updateSummary();
    });
});

// Obsługa zmiany stanu checkboxów
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        updateSummary();
    });
});








//
// function updateSummary() {
//     // Pobierz wartości wprowadzone przez użytkownika
//     const productsQuantity = parseInt(document.getElementById('products').value);
//     const ordersQuantity = parseInt(document.getElementById('orders').value);
//     const packageSelection = document.getElementById('package').getAttribute('data-value');
//     const accountingChecked = document.getElementById('accounting').checked;
//     const terminalChecked = document.getElementById('terminal').checked;
//
//     // Aktualizuj podsumowanie dla pola "Products"
//     const productsItem = document.querySelector('.list__item[data-id="products"]');
//     const productsPrice = productsQuantity * 0.5;
//     if (productsQuantity > 0) {
//         productsItem.style.display = 'block';
//         productsItem.querySelector('.item__calc').textContent = `${productsQuantity} * $0.5`;
//         productsItem.querySelector('.item__price').textContent = `$${productsPrice}`;
//     } else {
//         productsItem.style.display = 'none';
//     }
//
//     // Aktualizuj podsumowanie dla pola "Orders"
//     const ordersItem = document.querySelector('.list__item[data-id="orders"]');
//     const ordersPrice = ordersQuantity * 0.5;
//     if (ordersQuantity > 0) {
//         ordersItem.style.display = 'block';
//         ordersItem.querySelector('.item__calc').textContent = `${ordersQuantity} * $0.5`;
//         ordersItem.querySelector('.item__price').textContent = `$${ordersPrice}`;
//     } else {
//         ordersItem.style.display = 'none';
//     }
//
//     // Aktualizuj podsumowanie dla pola "Package"
//     const packageItem = document.querySelector('.list__item[data-id="package"]');
//     if (packageSelection !== '') {
//         packageItem.style.display = 'block';
//         packageItem.querySelector('.item__calc').textContent = packageSelection;
//         // Ustaw odpowiednią cenę dla wybranego pakietu
//         let packagePrice = 0;
//         switch (packageSelection) {
//             case 'basic':
//                 packagePrice = 10;
//                 break;
//             case 'professional':
//                 packagePrice = 20;
//                 break;
//             case 'premium':
//                 packagePrice = 30;
//                 break;
//         }
//         packageItem.querySelector('.item__price').textContent = `$${packagePrice}`;
//     } else {
//         packageItem.style.display = 'none';
//     }
//
//     // Aktualizuj podsumowanie dla pola "Accounting"
//     const accountingItem = document.querySelector('.list__item[data-id="accounting"]');
//     const accountingPrice = accountingChecked ? 5 : 0;
//     accountingItem.querySelector('.item__price').textContent = `$${accountingPrice}`;
//     accountingItem.style.display = accountingChecked ? 'block' : 'none';
//
//     // Aktualizuj podsumowanie dla pola "Terminal"
//     const terminalItem = document.querySelector('.list__item[data-id="terminal"]');
//     const terminalPrice = terminalChecked ? 10 : 0;
//     terminalItem.querySelector('.item__price').textContent = `$${terminalPrice}`;
//     terminalItem.style.display = terminalChecked ? 'block' : 'none';
//
//     // Oblicz sumę wszystkich wartości
//     const totalPrice = productsPrice + ordersPrice + packagePrice + accountingPrice + terminalPrice;
//
//     // Aktualizuj podsumowanie całkowite
//     const totalElement = document.getElementById('total-price');
//     totalElement.querySelector('.total__price').textContent = `$${totalPrice}`;
// }
//
// // Dodaj nasłuchiwanie zdarzeń dla elementów formularza, które wywołują funkcję updateSummary przy zmianie wartości
//
// document.getElementById('products').addEventListener('change', updateSummary);
// document.getElementById('orders').addEventListener('change', updateSummary);
// document.getElementById('package').addEventListener('change', updateSummary);
// document.getElementById('accounting').addEventListener('change', updateSummary);
// document.getElementById('terminal').addEventListener('change', updateSummary);
//
// // Wywołaj funkcję updateSummary na starcie, aby zaktualizować podsumowanie na podstawie domyślnych wartości formularza
//
// updateSummary();