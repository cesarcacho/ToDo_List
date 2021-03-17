function insertListItem(task) {
  const items = document.querySelectorAll('li.list_item-container');
  const numberOfItems = items.length;
  const lastItems = items[numberOfItems - 1];
  lastItems.insertAdjacentHTML('afterend', `<div class="list_item-container"><li class="li_element">${task}</li><span>X</span></div>`);
}


window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo_form');
  form.addEventListener('submit', function() {
    const text = document.querySelector("input[type='text']");
    const deleteElements = document.querySelectorAll('.list_item-container span');


    
    insertListItem(text.value);
    text.value = '';
    event.preventDefault();
  });
});