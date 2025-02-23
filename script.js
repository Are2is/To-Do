const taskInput = document.getElementById('taskInput');
const charCount = document.getElementById('charCount');

function updateCharCount() {
    const currentLength = taskInput.value.length;
    const maxLength = taskInput.maxLength;
    charCount.textContent = `${currentLength}/${maxLength}`;
}

taskInput.addEventListener('input', updateCharCount);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText.length > 50) {
        alert('Die Aufgabe darf maximal 50 Zeichen lang sein.');
        return;
    }

    if (taskText === '') {
        alert('Bitte gib eine Aufgabe ein.');
        return;
    }

    const maxColumns = 4;
    const maxRowsPerColumn = 5;
    const taskList = document.getElementById('taskList');
    const currentColumns = taskList.getElementsByClassName('task-column').length;

    if (currentColumns >= maxColumns && allColumnsFull(taskList, maxRowsPerColumn)) {
        alert('Maximale Anzahl an Spalten und Aufgaben erreicht!');
        return;
    }

    let currentColumn = null;
    for (let column of taskList.getElementsByClassName('task-column')) {
        if (column.children.length < maxRowsPerColumn) {
            currentColumn = column;
            break;
        }
    }

    if (!currentColumn) {
        currentColumn = document.createElement('div');
        currentColumn.classList.add('task-column');
        taskList.appendChild(currentColumn);
    }

    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('taskText');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✘';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function () {
        li.remove();
    };

    const checkButton = document.createElement('button');
    checkButton.textContent = '✓';
    checkButton.classList.add('check-button');
    checkButton.onclick = function () {
        if (checkButton.classList.contains('checked-button')) {
            checkButton.classList.remove('checked-button');
            checkButton.style.backgroundColor = '';
            checkButton.style.color = '';
            checkButton.style.border = '';
            taskSpan.classList.remove('checked');
        } else {
            checkButton.classList.add('checked-button');
            checkButton.style.backgroundColor = 'rgb(7, 165, 28)';
            checkButton.style.color = 'rgb(255, 255, 255)';
            checkButton.style.border = '1px solid rgb(58, 255, 64)';
            taskSpan.classList.add('checked');
        }
    };

    li.appendChild(checkButton);
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);

    const noteInput = document.createElement('input');
    noteInput.classList.add('note-input');
    noteInput.placeholder = 'Notiz hinzufügen...';
    noteInput.maxLength = 50;

    noteInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && noteInput.value.trim() !== '') {
            const noteText = noteInput.value.trim();
            noteInput.value = '';
            const noteDisplay = document.createElement('span');
            noteDisplay.classList.add('note-text');
            noteDisplay.textContent = noteText;
            noteDisplay.addEventListener('click', function() {
                noteDisplay.remove();
            });
            li.appendChild(noteDisplay);
        }
    });

    li.appendChild(noteInput);
    currentColumn.appendChild(li);

    taskInput.value = '';
    updateCharCount();
}

function allColumnsFull(taskList, maxRowsPerColumn) {
    const columns = taskList.getElementsByClassName('task-column');
    for (let column of columns) {
        if (column.children.length < maxRowsPerColumn) {
            return false;
        }
    }
    return true;
}

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

updateCharCount();

function updateDateTime() {
    const now = new Date();
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const monthsOfYear = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${dayOfWeek}, ${month} ${year} | ${hours}:${minutes} Uhr`;
    document.getElementById("date-time").textContent = formattedDate;
}

updateDateTime();
setInterval(updateDateTime, 1000);
