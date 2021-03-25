function insertListItem(task) {
  const newItem = document.createElement('li');
  const newItemDeleteButton = document.createElement('span');

  newItemDeleteButton.textContent = 'X';
  newItem.classList.add('list_element');
  newItem.innerHTML = `${task}`;
  
 
  console.log(newItem);
  const list = document.querySelector('ul');
  list.appendChild(newItem);
  markItemAsCompletedListener(newItem);

  newItem.appendChild(newItemDeleteButton);
  deleteItemListener(newItemDeleteButton);
}

function markItemAsCompletedListener(element){
  element.addEventListener('click', function(event){
    const element = event.target;
    element.classList.toggle('list_element-completed');
  });
};

function deleteItemListener(element) {
  element.addEventListener('click', function(event) {
    const item = event.target;
    item.parentElement.remove();
  });
};

window.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#todo_form');
  const textInput = document.querySelector("input[type='text']");
  const listItem = document.querySelectorAll('.list_element');
  const deleteElements = document.querySelectorAll('.list_element');

  listItem.forEach(function(element){
    markItemAsCompletedListener(element);
  });

  deleteElements.forEach(function (element) {
    const deleteItemButton = element.querySelector('span');
    deleteItemListener(deleteItemButton);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    insertListItem(textInput.value);
    textInput.value = '';
  });
});