function insertListItem(task) {
  const newItem = document.createElement('div');
  newItem.classList.add('list_item-container');
  newItem.innerHTML = `<li class="list_element list_element-completed">${task}</li><span>X</span>`;
 
  console.log(newItem);
  const list = document.querySelector('ul');
  list.appendChild(newItem);
  markItemAsCompletedListener(newItem);
  deleteItemListener(element);
}

function markItemAsCompletedListener(element){
  element.addEventListener('click', function(event){
    const element = event.target;
    element.classList.toggle('list_element-completed');
  });
};

function deleteItemListener(element) {
  element.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();
  });
};

window.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#todo_form');
  const textInput = document.querySelector("input[type='text']");
  const listItem = document.querySelectorAll('.list_element');
  const deleteElements = document.querySelectorAll('.list_item-container span');

  listItem.forEach(function(element){
    markItemAsCompletedListener(element);
  });

  deleteElements.forEach(function (element) {
    deleteItemListener(element);
  });

  form.addEventListener('submit', function () {
    insertListItem(textInput.value);
    textInput.value = '';
    event.preventDefault();
  });
});