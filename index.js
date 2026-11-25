let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		const tasksArray = JSON.parse(savedTasks);
		return tasksArray;
	}
	return items;
}

function createItem(itemText) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener('click', (event) => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	duplicateButton.addEventListener('click', (event) => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	})

	editButton.addEventListener('click', (event) => {
		textElement.contentEditable = true;
		textElement.focus();
	})

	textElement.addEventListener('blur', (event) => {
		textElement.contentEditable = false;
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	})

	textElement.textContent = itemText;
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach((item) => {
		const text = item.textContent;
		tasks.push(text);
	})
	return tasks;
}

function saveTasks(tasks) {
	const stringOfTasks = JSON.stringify(tasks);
	localStorage.setItem('tasks', stringOfTasks);
}

items = loadTasks();
items.forEach(item => {
	const itemElement = createItem(item);
	listElement.appendChild(itemElement);
})

formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = inputElement.value;
	const item = createItem(text);
	listElement.prepend(item);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";
})