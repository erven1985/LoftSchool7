/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie 
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = document.cookie, 
    arr = [],
    fragment = document.createDocumentFragment();

cookies.split(';').forEach( (cookie) => arr.push(cookie.split('=')) )

arr.map((el) => {
  createRow(el);
})

listTable.appendChild(fragment);

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let term = filterNameInput.value.toUpperCase(),
        rows = document.getElementsByClassName('rows');

    for(var i=0; i<rows.length; i++) {
      let name = rows[i].childNodes[0].textContent, 
          value = rows[i].childNodes[1].textContent;
      if(isMatching(name, term) || 
        isMatching(value, term)) {
          rows[i].style.display = 'table-row'
      } else {
        rows[i].style.display = 'none'
      }
    }
});

addButton.addEventListener('click', (e) => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
  e.preventDefault();
  let newCookie = [addNameInput.value, addValueInput.value],
      allrows = document.getElementsByClassName('rows');
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  addNameInput.value = '';
  addValueInput.value = '';
  for(var i=0; i<allrows.length; i++) {
      let name = allrows[i].childNodes[0].textContent, 
          value = allrows[i].childNodes[1].textContent;
    if(isMatching(name, newCookie[0])) {
      allrows[i].childNodes[1].textContent = newCookie[1];
      return;
    }    
  }
  createRow(newCookie);
  listTable.appendChild(fragment);
});

function isMatching(row, term) {
  let substring = term.toUpperCase(), 
      string = row.toUpperCase()
  return string.includes(substring);
}

function createRow(el) {
  let tr = document.createElement('tr'),
      td_0 = document.createElement('td'),
      td_1 = document.createElement('td'),
      td_2 = document.createElement('td'),
      button = document.createElement('button');
  
  td_2.appendChild(button)
  tr.appendChild(td_0)
  tr.appendChild(td_1)
  tr.appendChild(td_2)
  tr.classList.add('rows')
  
  td_0.innerText = el[0]
  td_1.innerText = el[1]
  button.textContent = 'Удалить'
  button.addEventListener('click', () => {
    let parentElement = button.parentNode.parentNode;
    document.cookie = `${parentElement.childNodes[0].textContent} = ${parentElement.childNodes[1].textContent}; expires = ${new Date(-1)}`;
    parentElement.remove();
  });
  fragment.appendChild(tr)
}