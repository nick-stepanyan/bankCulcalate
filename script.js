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
        let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let nonCompoundedInterest = 0;
        let compoundedAmount = amount;

        for (let i = 0; i < months; i++) {
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const daysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
            const monthlyInterest = (compoundedAmount * (rate / 100)) / daysInYear * daysInMonth;
            nonCompoundedInterest += (amount * (rate / 100)) / daysInYear * daysInMonth;
            compoundedAmount += monthlyInterest;
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        capitalizationMonths.textContent = months;
        capitalizationMonths2.textContent = months;

        const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const daysInCurrentYear = isLeapYear(now.getFullYear()) ? 366 : 365;
        const dailyInterest = (amount * (rate / 100)) / daysInCurrentYear;
        const monthlyInterest = dailyInterest * daysInCurrentMonth;

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