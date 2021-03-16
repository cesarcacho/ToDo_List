function insertListItem() {
  const items = document.querySelectorAll('li');
  const numberOfItems = items.length;
  const lastItems = items[numberOfItems - 1];
  lastItems.insertAdjacentHTML('afterend','<li>nuevo elemento</li>');
  debugger;  
};


document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed");
  const form = document.querySelector('#todo_form');
  form.addEventListener('submit', function() {
    insertListItem();
  });
});