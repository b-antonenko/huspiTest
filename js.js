const div = document.querySelector('.working_div');
const input = document.querySelector('input');
const modal = document.querySelector('.modal');
const cancel = document.getElementById('cancel');
const save = document.getElementById('save');
const table = createCalendar("calendar", 2019, 6);
let target;
/*const buttonDiv = document.querySelector('.buttons');
[-1,1].forEach(n => {
    let button = document.createElement('button');
    button.addEventListener('click', () => createCalendar(id, year, month + n));
    buttonDiv.append(button)
});*/


table.addEventListener('click', openModal);
save.addEventListener('click', saveModal);
cancel.addEventListener('click', returnTable);

function createCalendar(id, year, month) {
    const table = document.createElement('table');
    const header = document.createElement('tr');
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const daysInMonth = new Date(year, month, 0).getDate();
    for (const day of daysOfWeek)
        header.insertAdjacentHTML('beforeend', `<th>${day}</th>`)
    table.append(header);
    let firstDay = (new Date(year, month - 1).getDay() + 6) % 7;
    let nextDayToAdd = 1 - firstDay;
    while (nextDayToAdd <= daysInMonth) {
        const week = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const day = document.createElement('td');
            if (nextDayToAdd > 0 && nextDayToAdd <= daysInMonth)
                day.innerHTML = nextDayToAdd;
            nextDayToAdd++;
            week.append(day);
        }
        table.append(week);
    }
    div.append(table);
    return table;
}

function openModal(event) {
    target = event.target;
    const td = target.closest('td');
    input.value = '';
    if (target.tagName != 'TD')
        return;
    if (!td)
        return;
    table.style.display = 'none';
    modal.style.display = 'block';
    document.body.style.backgroundColor = '#93978F';
}

function returnTable() {
    table.style.display = 'inline';
    modal.style.display = 'none';
    document.body.style.backgroundColor = 'white';
}

function saveModal() {
    event.preventDefault()
    table.style.display = 'inline';
    modal.style.display = 'none';
    document.body.style.backgroundColor = 'white';
    let closestTd = target.closest('TD');
    let p = document.createElement('p');
    p.textContent = `${input.value}`;
    closestTd.append(p);
}
