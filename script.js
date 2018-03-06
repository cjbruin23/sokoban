// Possible refactoring
   // Just change current to a list of numbers and convert it to a string when needed
let currentPos = [2,2];
let newPosition;
const mazeContainer = document.getElementById('container');


const map = [
  "  WWWWW ",
  "WWW   W ",
  "WOSB  W ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
]

function createMaze() {
   for (let i = 0; i < map.length; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      mazeContainer.appendChild(row);
      for (let j = 0; j < map[i].length; j++) {

         // let madeId = String(i > 9 ? "" + i : "0" + i) + String(j > 9 ? "" + j : "0" + j)

         if (map[i][j] === 'W') {
            let cell = document.createElement("div");
            cell.className = 'wall mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         } else if (map[i][j] === ' ') {
            let cell = document.createElement("div");
            cell.className = 'mazeBlock';
            cell.id = String(i)+String(j);
            row.appendChild(cell);
         } else if (map[i][j] === 'S') {
            let cell = document.createElement("div");
            cell.className = 'start mazeBlock';
            cell.id = madeId;
            row.appendChild(cell);

            // Appending the starting cursor to the starting div
            let cursor = document.createElement('div');
            cursor.className = 'cursor';
            cell.appendChild(cursor);
         } else if (map[i][j] === 'B') {
            let cell = document.createElement("div");
            cell.className = 'box mazeBlock';
            cell.id = madeId;
            row.appendChild(cell);
         } else if (map[i][j] === 'O') {
            let cell = document.createElement("div");
            cell.className = 'empty mazeBlock';
            cell.id = madeId;
            row.appendChild(cell);
         } else {
            let cell = document.createElement("div");
            cell.className = 'finish mazeBlock';
            cell.id = madeId;
            row.appendChild(cell);
         }
      }
   }
}

function moveCursor() {

   // take class cursor away from current div
   var toCancelClass = document.getElementById(currentPos);
   toCancelClass.removeChild(toCancelClass.childNodes[0]);

   // move class cursor to new div
   const moveCursorTo = document.getElementById(newPosition);
   let newCursor = document.createElement("div");
   newCursor.className = 'cursor';
   moveCursorTo.appendChild(newCursor);

   currentPos = newPosition;

   return true;
}

function moveBox(positionToMoveTo, boxIdToMove) {
   // Find out which direction the box needs to move to
   // Grab the box item
   // Move it one div the appropriate way
   switch (positionToMoveTo) {
      case 'right':

         // Remove box class
         var removeBox = document.getElementById(boxIdToMove);
         removeBox.classList.remove('box');

         boxToMoveTo = Number(boxIdToMove) + 1;
         if (String(boxToMoveTo).length < 4) boxToMoveTo = '0' + String(boxToMoveTo);

         // Add box class
         let newBox = document.getElementById(boxToMoveTo);
         newBox.className = 'box';
   }
}

function checkLeft() {
   columnToMoveTo = currentPos[1] - 1
   newPosition = [currentPos[0], columnToMoveTo];

   let itemInNextSpot = map[currentPos[0]][columnToMoveTo]

   switch (itemInNextSpot) {
      case 'W':
         return false;
      case 'B':
         moveBox();
         moveCursor();
      default:
         moveCursor();
   }
}

function checkRight() {
   currentCol = Number(currentPos.substring(2, 4));
   columnToMoveTo = currentCol + 1

   if (columnToMoveTo < 10) columnToMoveTo = "0" + columnToMoveTo;
   newPosition = currentPos.substring(0, 2) + String(columnToMoveTo);

   let leftRightOptions = map[Number(currentPos.substring(0, 2))][Number(columnToMoveTo)]

   switch (leftRightOptions) {
      case 'W':
         return false;
      case 'B':
         moveBox('right', newPosition)
         moveCursor();
      default:
         moveCursor();
   }

}

function checkUp() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow - 1;

   if (rowToMoveTo < 10) rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   switch (upDownOptions) {
      case 'W':
         return false;
      default:
         moveCursor();
   }
}

function checkDown() {
   currentRow = Number(currentPos.substring(0, 2));
   rowToMoveTo = currentRow + 1;

   if (rowToMoveTo < 10) rowToMoveTo = "0" + rowToMoveTo;
   newPosition = String(rowToMoveTo) + currentPos.substring(2, 4);

   upDownOptions = map[Number(rowToMoveTo)][Number(currentPos.substring(2, 4))];

   switch (upDownOptions) {
      case 'W':
         return false;
      default:
         moveCursor();
   }
}

document.addEventListener('keydown', (event) => {
   const keyName = event.key;
   if (keyName === 'ArrowLeft') {
      checkLeft();
   };
   if (keyName === 'ArrowRight') {
      checkRight();
   };
   if (keyName === 'ArrowUp') {
      checkUp();
   };
   if (keyName === 'ArrowDown') {
      checkDown();
   }
});

createMaze();
