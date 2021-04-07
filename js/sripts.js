function insertListItem(task, completed = false, isSavedItem = false) {
  const newItem = document.createElement('li');
  const newItemDeleteButton = document.createElement('span');
  const newItemCheckbox = document.createElement('input');

  newItem.dataset.completed = completed;
  newItem.dataset.text = task;

  newItemDeleteButton.textContent = '❌';
  newItem.classList.add('list_element');
  newItem.innerHTML = `${task}`;

  newItemCheckbox.type = 'checkbox';
  newItemCheckbox.checked = completed;

  const list = document.querySelector('ul');
  list.appendChild(newItem);

  newItem.prepend(newItemCheckbox);
  newItem.appendChild(newItemDeleteButton);
  deleteItemListener(newItemDeleteButton);

  if (!isSavedItem) {
    saveElement({
      'text': task,
      'completed': false,
    });
  };
}

function deleteItemListener(element) {
  element.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();
    deleteElement(element);
  });
}

function toggleElementAsCompleted(element) {
  const elements = getElements();
  const isCompleted = element.dataset.completed;
  const itemText = element.dataset.text;
  element.classList.toggle('list_element-completed');
  element.dataset.completed = (isCompleted === 'true') ? 'false' : 'true';

  const savedElement = elements.items.find(arrayElement => arrayElement.text === itemText);
  savedElement.completed = isCompleted === 'true' ? false : true;
  saveElements({
    items: elements.items
  });
}

function saveElement(newElement) {
  const elements = getElements();
  elements.items.push(newElement);
  saveElements(elements)
}

function saveElements(elements) {
  localStorage.setItem('items', JSON.stringify(elements));
}

function deleteElement(element) {
  const elements = getElements();
  const item = element.closest('li');
  const text = item.dataset.text;
  const completed = item.dataset.completed;

  const filteredItems = elements.items.filter(savedItems => savedItems.text !== text && savedItems.completed !== completed);
  saveElements({
    items: filteredItems
  });
}


function getElements() {
  return JSON.parse(localStorage.getItem('items'));
}

window.addEventListener('DOMContentLoaded', function() {
  const savedItems = getElements();
  if (!savedItems) saveElements({
    "items": []
  });

  savedItems.items.forEach(function (item) {
    insertListItem(item.text, item.completed, true);
  });

  const form = document.querySelector('#todo_form');
  const textInput = document.querySelector('input[type="text"]');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const deleteElements = document.querySelectorAll('.list_element');

  checkboxes.forEach(function (element) {
    element.addEventListener('change', function () {
      toggleElementAsCompleted(element.parentElement);
    });
  });

  deleteElements.forEach(function (element) {
    const deleteItemButton = element.querySelector('span');
    deleteItemListener(deleteItemButton);
  })

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    insertListItem(textInput.value);
    textInput.value = '';
  });
});