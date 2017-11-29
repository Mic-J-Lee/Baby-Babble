// Let JS create HTML layout ====================

let appDiv = document.getElementById('app')

let myDiv = document.createElement('div')
myDiv.className = "header"
myDiv.setAttribute('id', 'myDiv')

let myDivH2 = document.createElement('h2')
myDivH2.style.margin = "5px"
myDivH2.innerHTML = "My To Do List"

let myDivInput = document.createElement('input')
myDivInput.setAttribute('type', 'text')
myDivInput.setAttribute('id', 'myInput')
myDivInput.setAttribute('placeholder', 'Title...')

let myDivSpan = document.createElement('span')
myDivSpan.className = "addBtn"
myDivSpan.addEventListener('click', newElement)
myDivSpan.innerHTML = "Add"


myDiv.appendChild(myDivH2)
myDiv.appendChild(myDivInput)
myDiv.appendChild(myDivSpan)


let myUL = document.createElement('ul')
myUL.setAttribute('id', 'myUL')

appDiv.appendChild(myDiv)
appDiv.appendChild(myUL)

// ===========================================

// Retrieve and display list
document.getElementById("myUL").innerHTML = localStorage.getItem("storedList")

// Define list storing function
var storeList = () => {
  localStorage.setItem("storedList", document.getElementById("myUL").innerHTML)
}

// Create a function that appends a "close" button to a list item
var addCloseButton = () => {
  let myNodelist = document.getElementsByTagName("LI")
  for (let element of myNodelist) {
    let span = document.createElement("SPAN")
    let txt = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(txt)
    element.appendChild(span)
  }
}

// Create a function that removes a list item when its close button is clicked
var clickToClose = () => {
  let close = document.getElementsByClassName("close")
  for (let element of close) {
    element.onclick = function() {
      let div = this.parentElement
      div.remove()
      storeList()
    }
  }
}
clickToClose()

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul')
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked')
    storeList()
  }
}, false)

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li")
  let inputValue = document.getElementById("myInput").value
  let t = document.createTextNode(inputValue)

  if (inputValue === '') {
    alert("You must write something!")
  } else {
    li.appendChild(t)
    document.getElementById("myUL").appendChild(li)
  }
  document.getElementById("myInput").value = ""

  addCloseButton()
  clickToClose()
  storeList()
}
