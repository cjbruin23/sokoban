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

         if (map[i][j] === 'W') {
            let cell = document.createElement("div");
            cell.className = 'wall mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         } else if (map[i][j] === ' ') {
            let cell = document.createElement("div");
            cell.className = 'mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         } else if (map[i][j] === 'S') {
            let cell = document.createElement("div");
            cell.className = 'start mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);

            // Appending the starting cursor to the starting div
            let cursor = document.createElement('div');
            cursor.className = 'cursor';
            cell.appendChild(cursor);
         } else if (map[i][j] === 'B') {
            let cell = document.createElement("div");
            cell.className = 'box mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         } else if (map[i][j] === 'O') {
            let cell = document.createElement("div");
            cell.className = 'empty mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         } else {
            let cell = document.createElement("div");
            cell.className = 'finish mazeBlock';
            cell.id = String(i) + 'c' + String(j);
            row.appendChild(cell);
         }
      }
   }
}

function moveCursor() {

   // take class cursor away from current div
   let neededId = String(currentPos[0]) + 'c' + String(currentPos[1])

   var toCancelClass = document.getElementById(neededId);
   toCancelClass.removeChild(toCancelClass.childNodes[0]);

   // move class cursor to new div
   neededId = String(newPosition[0]) + 'c' + String(newPosition[1])
   const moveCursorTo = document.getElementById(neededId);
   let newCursor = document.createElement("div");
   newCursor.className = 'cursor';
   moveCursorTo.appendChild(newCursor);

   currentPos = newPosition;

   return true;
}

function moveBox(positionToMoveTo) {
   // Find out which direction the box needs to move to
   // Find out if it can move
   // Grab the box item
   // Move it one div the appropriate way
   switch (positionToMoveTo) {
      case 'right':
         console.log('right')

         let colToMoveBoxTo = newPosition[1] + 1
         console.log(colToMoveBoxTo);

         if (map[newPosition[0]][colToMoveBoxTo] === 'W' || map[newPosition[0]][colToMoveBoxTo] === 'B') {
            alert('Preventing Move')
            break;
         } else {
            console.log('Can Move');
            moveCursor();
         }

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
         moveBox('left');
         moveCursor();
      default:
         moveCursor();
   }
}

function checkRight() {
   columnToMoveTo = currentPos[1] + 1
   newPosition = [currentPos[0], columnToMoveTo];

   let itemInNextSpot = map[currentPos[0]][columnToMoveTo]

   switch (itemInNextSpot) {
      case 'W':
         return false;
      case 'B':
         moveBox('right');
      default:
         moveCursor();
   }

}

function checkUp() {

   rowToMoveTo = currentPos[0] - 1;
   console.log('Row to move to ' + rowToMoveTo);
   newPosition = [rowToMoveTo, currentPos[1]];

   let itemInNextSpot = map[rowToMoveTo][currentPos[1]]
   console.log('Items in next spot ' + itemInNextSpot)

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

function checkDown() {
   rowToMoveTo = currentPos[0] + 1;
   console.log('Row to move to ' + rowToMoveTo);
   newPosition = [rowToMoveTo, currentPos[1]];

   let itemInNextSpot = map[rowToMoveTo][currentPos[1]]
   console.log('Items in next spot ' + itemInNextSpot)

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
