//INITIALIZE THE GAME BOARD ON PAGE LOAD
initCategoryRow()
initBoard()

function initCategoryRow() {
  let categoryRow = document.getElementById('category-row')

  //GENERATE 6 BOXES

  for (let i = 0; i < 6; i++) {
    let box = document.createElement('div')
    box.className = 'category-box'
    categoryRow.appendChild(box)
  }
}

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

function buildCategories() {
  const fetchReq = fetch(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=2`
  ).then((res) => res.json())

  const allData = Promise.all([fetchReq])

  allData.then((res) => {
    console.log(res)
  })
}

function getClue() {
  console.log('have a nice day')
}
