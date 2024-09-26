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
    const decreaseDayButton = document.getElementById('decreaseDayButton');

    let daysInCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // Полное количество дней в текущем месяце
    let remainingDaysInMonth = daysInCurrentMonth; // Переменная для отслеживания оставшихся дней

    // Функция для форматирования числа с разделением тысячных разрядов
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Форматирование с пробелами
    }

    // Функция для проверки, является ли год високосным
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Основная функция для расчета процентов
    function calculateInterest() {
        const amount = parseFloat(amountInput.value.replace(/\s+/g, '')); // Убираем пробелы перед расчетом
        const rate = parseFloat(rateInput.value.replace(/\s+/g, ''));
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
            let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            if (i === 0) {
                daysInMonth = remainingDaysInMonth; // Используем оставшиеся дни в текущем месяце
            }

            // Рассчет процентов без капитализации (на фиксированную сумму)
            nonCompoundedInterest += dailyInterestRate * daysInMonth;

            // Рассчет процентов с капитализацией (на сумму с учетом ранее начисленных процентов)
            const monthlyInterestCalculated = (compoundedAmount / daysInYear) * (rate / 100) * daysInMonth;
            compoundedAmount += monthlyInterestCalculated;

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        capitalizationMonths.textContent = months;
        capitalizationMonths2.textContent = months;

        const dailyInterest = dailyInterestRate;
        const fullMonthlyInterest = dailyInterestRate * daysInCurrentMonth; // Процент за весь месяц

        dailyInterestOutput.value = formatNumber(dailyInterest.toFixed(2)) + ' руб.';
        monthlyInterestOutput.value = formatNumber(fullMonthlyInterest.toFixed(2)) + ' руб.'; // Процент за весь месяц
        nonCompoundedInterestOutput.value = formatNumber(nonCompoundedInterest.toFixed(2)) + ' руб.';
        compoundedInterestOutput.value = formatNumber((compoundedAmount - amount).toFixed(2)) + ' руб.';
    }

    // Обработчик кнопки для уменьшения дня
    decreaseDayButton.addEventListener('click', function() {
        if (remainingDaysInMonth > 1) {
            remainingDaysInMonth -= 1;
            const amount = parseFloat(amountInput.value.replace(/\s+/g, ''));
            const rate = parseFloat(rateInput.value.replace(/\s+/g, ''));
            const daysInYear = isLeapYear(new Date().getFullYear()) ? 366 : 365;
            const dailyInterestRate = (amount / daysInYear) * (rate / 100);

            const updatedMonthlyInterest = dailyInterestRate * remainingDaysInMonth; // Обновляем процент за оставшиеся дни
            monthlyInterestOutput.value = formatNumber(updatedMonthlyInterest.toFixed(2)) + ' руб.'; // Обновленный процент
        }
    });

    // Обработчики для ввода данных с форматированием
    amountInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, ''); // Убираем все не цифры
        this.value = formatNumber(this.value);
        calculateInterest();
    });

    rateInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, ''); // Убираем все не цифры
        this.value = formatNumber(this.value);
        calculateInterest();
    });

    monthsInput.addEventListener('input', calculateInterest);

    calculateInterest(); // Инициализация значений при загрузке страницы
});
