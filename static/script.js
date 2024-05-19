const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseTitle = document.getElementById("expenseTitle").value;
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

    if (expenseTitle && !isNaN(expenseAmount)) {
        fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: expenseTitle,
                amount: expenseAmount
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadExpenses();
            }
        });

        document.getElementById("expenseTitle").value = "";
        document.getElementById("expenseAmount").value = "";
    }
});

function loadExpenses() {
    fetch('/expenses')
    .then(response => response.json())
    .then(data => {
        expenseList.innerHTML = '';
        data.forEach((expense, index) => {
            const expenseItem = document.createElement("li");
            expenseItem.classList.add("expense-item");
            expenseItem.innerHTML = `
                <span>${expense.title}</span>
                <span>$${parseFloat(expense.amount).toFixed(2)}</span>
                <button class="delete-button" onclick="removeExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });
    });
}

function removeExpense(index) {
    fetch(`/expenses/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadExpenses();
        }
    });
}

loadExpenses();
