// Let JS create HTML layout ==================

let appDiv = document.getElementById('app')

let myDiv = document.createElement('div')
myDiv.className = "header"
myDiv.setAttribute('id', 'myDiv')

let myDivH2 = document.createElement('h1')
myDivH2.style.margin = "5px"
myDivH2.innerHTML = "My To Do List"

let myDivInput = document.createElement('input')
myDivInput.setAttribute('type', 'text')
myDivInput.setAttribute('id', 'myInput')
myDivInput.setAttribute('placeholder', 'Title...')

let myDivSpan = document.createElement('span')
myDivSpan.setAttribute('id', 'addBtn')
myDivSpan.className = "addBtn"
myDivSpan.addEventListener('click', addListItem)
myDivSpan.innerHTML = "Add"

let myUL = document.createElement('ul')
myUL.setAttribute('id', 'myUL')

myDiv.appendChild(myDivH2)
myDiv.appendChild(myDivInput)
myDiv.appendChild(myDivSpan)

appDiv.appendChild(myDiv)
appDiv.appendChild(myUL)

// ===========================================

// Retrieve and display list
document.getElementById("myUL").innerHTML = localStorage.getItem("storedList")

// Define list storing function
const storeList = () => {localStorage.setItem("storedList", document.getElementById("myUL").innerHTML)}

// Activate close buttons that remove list items
const activateCloseButtons = () => {
  const close = document.getElementsByClassName("close")
  for (let element of close) {
    element.onclick = function() {
      this.parentElement.remove()
      storeList()
    }
  }
}
activateCloseButtons()

// Create a new list item when clicking on the "Add" button
function addListItem() {
  let li = document.createElement("li")
  const inputValue = document.getElementById("myInput").value
  const t = document.createTextNode(inputValue)

  if (inputValue === '') {
    alert("You must write something!")
  } else {
    //add text to li
    li.appendChild(t)
    //add close button to li
    let span = document.createElement("SPAN")
    const txt = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(txt)
    li.appendChild(span)
    //add li to ul
    document.getElementById("myUL").appendChild(li)
  }
  document.getElementById("myInput").value = ""

  activateCloseButtons()
  storeList()
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul')
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked')
    storeList()
  }
}, false)

// Click the "Add" button when Enter key is pressed
const input = document.getElementById('myInput')
input.addEventListener("keyup", (ev) => {
  ev.preventDefault()
  if (event.keyCode === 13) {
      document.getElementById("addBtn").click()
  }
})

// Make the list sortable
const Sortable = require ('sortablejs')
const el = document.getElementById('myUL')
const sortable = Sortable.create(el)
