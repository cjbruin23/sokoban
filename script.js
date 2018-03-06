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

         if (i === currentPos[0] && j === currentPos[1]) {
            let elementToAppendTo = document.getElementById(String(i) + 'c' + String(j))
            let cursor = document.createElement('div');
            cursor.className = 'cursor';
            elementToAppendTo.appendChild(cursor);
         }
      }
   }
}

function moveBox(positionToMoveTo) {
   // Find out which direction the box needs to move to
   // Find out if it can move
   // Grab the box item
   // Move it one div the appropriate way
   switch (positionToMoveTo) {
      case 'right':

         let colToMoveBoxTo = newPosition[1] + 1

         if (map[newPosition[0]][colToMoveBoxTo] === 'W' || map[newPosition[0]][colToMoveBoxTo] === 'B') {
            alert('Preventing Move')
            break;
         } else {

            // Break proper row string into list
            let rowArray = map[newPosition[0]].split("");
            rowArray[newPosition[1]] = ' ';
            rowArray[newPosition[1]+1] = 'B';

            // Revert array back into String
            let newString = rowArray.join("");
            // Place that string back into map
            map[newPosition[0]] = newString;

            document.getElementById('container').innerHTML = ''

            createMaze();

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
   console.log(itemInNextSpot);

   switch (itemInNextSpot) {
      case 'W':
         break;
      case 'B':
         moveBox('right');
         break;
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
