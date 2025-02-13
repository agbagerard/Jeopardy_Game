//INITIALIZE THE GAME BOARD ON PAGE LOAD
initCategoryRow()
initBoard()

document.querySelector('button').addEventListener('click', buildCategories)

//CREATE CATEGORY ROW
function initCategoryRow() {
  let categoryRow = document.getElementById('category-row')

  //GENERATE 6 BOXES

  for (let i = 0; i < 6; i++) {
    let box = document.createElement('div')
    box.className = 'category-box'
    categoryRow.appendChild(box)
  }
}

//CREATE CLUE BOARD
function initBoard() {
  let board = document.getElementById('clue-board')

  //GENERATE 5 ROWS, THEN PLACE 6 BOXES IN EACH ROW

  for (let i = 0; i < 5; i++) {
    let row = document.createElement('div')
    let boxValue = 200 * (i + 1)
    row.className = 'clue-row'

    for (let j = 0; j < 6; j++) {
      let box = document.createElement('div')
      box.className = 'clue-box'
      box.textContent = '$' + boxValue
      box.addEventListener('click', getClue, false)
      row.appendChild(box)
    }

    board.appendChild(row)
  }
}

//CALL API AND STORE DATA IN AN ARRAY
let categoryArray = []

function buildCategories() {
  const fetchReq1 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=2`
  ).then((res) => res.json())

  const fetchReq2 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=3`
  ).then((res) => res.json())

  const fetchReq3 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=4`
  ).then((res) => res.json())

  const fetchReq4 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=8`
  ).then((res) => res.json())

  const fetchReq5 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=9`
  ).then((res) => res.json())

  const fetchReq6 = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=10`
  ).then((res) => res.json())

  const allData = Promise.all([
    fetchReq1,
    fetchReq2,
    fetchReq3,
    fetchReq4,
    fetchReq5,
    fetchReq6,
  ])

  allData.then((res) => {
    console.log(res)
    categoryArray = res
    setCategories(categoryArray)
  })
}

//LOAD CATEGORIES TO THE BOARD
function setCategories(categoryArray) {
  let element = document.getElementById('category-row')
  let children = element.children
  for (let i = 0; i < children.length; i++) {
    children[i].innerHTML = categoryArray[i].title
  }
}

//GET CLUES AND FIGURE OUT WHICH ITEM WAS CLICKED
function getClue(event) {
  let child = event.currentTarget
  child.classList.add('clicked-box')
  let boxValue = child.innerHTML.slice(1)
  let parent = child.parentNode
  let index = Array.prototype.findIndex.call(
    parent.children,
    (c) => c === child
  )
  let cluesList = categoryArray[index].clues
  let clue = cluesList.find((obj) => {
    return obj.value == boxValue
  })
  console.log(clue)
  showQuestion(clue, child, boxValue)
}
