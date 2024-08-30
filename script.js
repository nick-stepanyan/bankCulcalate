document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const monthsInput = document.getElementById('months');
    const dailyInterestOutput = document.getElementById('dailyInterest');
    const monthlyInterestOutput = document.getElementById('monthlyInterest');
    const nonCompoundedInterestOutput = document.getElementById('nonCompoundedInterest');
    const compoundedInterestOutput = document.getElementById('compoundedInterest');
    const capitalizationMonths = document.getElementById('capitalizationMonths');
    const capitalizationMonths2 = document.getElementById('capitalizationMonths2');

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function calculateInterest() {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value);
        const months = parseInt(monthsInput.value, 10);

        if (isNaN(amount) || isNaN(rate) || isNaN(months) || months < 1) {
            dailyInterestOutput.value = '';
            monthlyInterestOutput.value = '';
            nonCompoundedInterestOutput.value = '';
            compoundedInterestOutput.value = '';
            return;
        }

        const now = new Date();
        const daysInYear = isLeapYear(now.getFullYear()) ? 366 : 365;
        const dailyInterestRate = (amount / daysInYear) * (rate / 100); // сумма в рублях за один день

        let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let nonCompoundedInterest = 0;
        let compoundedAmount = amount;

        for (let i = 0; i < months; i++) {
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const monthlyInterest = dailyInterestRate * daysInMonth; // проценты за месяц на текущую сумму
            nonCompoundedInterest += dailyInterestRate * daysInMonth; // проценты без капитализации
            compoundedAmount += monthlyInterest; // добавляем проценты к сумме для следующего месяца
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        capitalizationMonths.textContent = months;
        capitalizationMonths2.textContent = months;

        const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const dailyInterest = dailyInterestRate; // сумма за один день
        const monthlyInterest = dailyInterestRate * daysInCurrentMonth; // сумма за текущий месяц

        dailyInterestOutput.value = dailyInterest.toFixed(2) + ' руб.';
        monthlyInterestOutput.value = monthlyInterest.toFixed(2) + ' руб.';
        nonCompoundedInterestOutput.value = nonCompoundedInterest.toFixed(2) + ' руб.';
        compoundedInterestOutput.value = (compoundedAmount - amount).toFixed(2) + ' руб.';
    }

    amountInput.addEventListener('input', calculateInterest);
    rateInput.addEventListener('input', calculateInterest);
    monthsInput.addEventListener('input', calculateInterest);

    calculateInterest(); // Инициализация значений при загрузке страницы
});
