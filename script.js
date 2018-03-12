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
   document.getElementById('container').innerHTML = ''
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

function moveCursor(whichWay) {
   switch (whichWay) {
      case 'up':
         currentPos = [currentPos[0]-1, currentPos[1]]
         createMaze();
         break;
      case 'left':
         currentPos = [currentPos[0], currentPos[1] -1]
         createMaze();
         break;
      case 'right':
         currentPos = [currentPos[0], currentPos[1] +1]
         createMaze();
         break;
      case 'down':
         currentPos = [currentPos[0] + 1, currentPos[1]]
         createMaze();
         break;
   }
}

function moveBox(positionToMoveTo) {
   let rowToMoveBoxTo;
   switch (positionToMoveTo) {
      case 'right':

         let colToMoveBoxTo = newPosition[1] + 1

         if (map[newPosition[0]][colToMoveBoxTo] === 'W' || map[newPosition[0]][colToMoveBoxTo] === 'B') {
            alert('Preventing Move')
            break;
         } else if (map[newPosition[0]][colToMoveBoxTo] === 'O' ) {
            console.log('Open!');
         } else {

            // Break proper row string into list
            let rowArray = map[newPosition[0]].split("");
            rowArray[newPosition[1]] = ' ';
            rowArray[newPosition[1]+1] = 'B';

            // Revert array back into String
            let newString = rowArray.join("");
            // Place that string back into map
            map[newPosition[0]] = newString;

            currentPos = newPosition;
            createMaze();
         }
         break;

         case 'left':

            let leftColToMoveBoxTo = newPosition[1] - 1

            if (map[newPosition[0]][leftColToMoveBoxTo] === 'W' || map[newPosition[0]][leftColToMoveBoxTo] === 'B') {
               alert('Preventing Move')
               break;
            } else {

               // Break proper row string into list
               let rowArray = map[newPosition[0]].split("");
               rowArray[newPosition[1]] = ' ';
               rowArray[newPosition[1]-1] = 'B';

               // Revert array back into String
               let newString = rowArray.join("");
               // Place that string back into map
               map[newPosition[0]] = newString;

               currentPos = newPosition;
               createMaze();
            }
            break;

      case 'up':
         rowToMoveBoxTo = newPosition[0] - 1

         if (map[rowToMoveBoxTo][newPosition[1]] === 'W' || map[rowToMoveBoxTo][newPosition[1]] === 'B') {
            alert('Preventing Move');
            break;
         } else {

            // Break proper row string into list; then will remove block
            let rowArrayToEraseFrom = map[newPosition[0]].split("");
            rowArrayToEraseFrom[newPosition[1]] = ' ';

            // Break proper row string into list; then will place block into
            let rowArrayToEnterInto = map[newPosition[0]-1].split("");
            rowArrayToEnterInto[newPosition[1]] = 'B';

            // Revert array back into String
            let newString1 = rowArrayToEraseFrom.join("");
            let newString2 = rowArrayToEnterInto.join("");

            // Place that string back into map
            map[newPosition[0]] = newString1;
            map[newPosition[0]-1] = newString2;

            currentPos = newPosition;

            createMaze();
         }
         break;

         case 'down':
            rowToMoveBoxTo = newPosition[0] + 1

            if (map[rowToMoveBoxTo][newPosition[1]] === 'W' || map[rowToMoveBoxTo][newPosition[1]] === 'B') {
               alert('Preventing Move');
               break;
            } else {

               // Break proper row string into list; then will remove block
               let rowArrayToEraseFrom = map[newPosition[0]].split("");
               rowArrayToEraseFrom[newPosition[1]] = ' ';

               // Break proper row string into list; then will place block into
               let rowArrayToEnterInto = map[newPosition[0]+1].split("");
               rowArrayToEnterInto[newPosition[1]] = 'B';

               // Revert array back into String
               let newString1 = rowArrayToEraseFrom.join("");
               let newString2 = rowArrayToEnterInto.join("");

               // Place that string back into map
               map[newPosition[0]] = newString1;
               map[newPosition[0]+1] = newString2;

               currentPos = newPosition;

               createMaze();
            }
            break;
   }
}

function checkLeft() {
   columnToMoveTo = currentPos[1] - 1
   newPosition = [currentPos[0], columnToMoveTo];

   let itemInNextSpot = map[currentPos[0]][columnToMoveTo]

   switch (itemInNextSpot) {
      case 'W':
         return false;
         break;
      case 'B':
         moveBox('left');
         break;
      default:
         moveCursor('left');
         break;
   }
}

function checkRight() {
   columnToMoveTo = currentPos[1] + 1
   newPosition = [currentPos[0], columnToMoveTo];

   let itemInNextSpot = map[currentPos[0]][columnToMoveTo]

   switch (itemInNextSpot) {
      case 'W':
         break;
      case 'B':
         moveBox('right');
         break;
      default:
         moveCursor('right');
   }

}

function checkUp() {

   rowToMoveTo = currentPos[0] - 1;
   newPosition = [rowToMoveTo, currentPos[1]];

   let itemInNextSpot = map[rowToMoveTo][currentPos[1]]

   switch (itemInNextSpot) {
      case 'W':
         return false;
         break;
      case 'B':
         moveBox('up');
         break;
      default:
         moveCursor('up');
   }

}

function checkDown() {
   rowToMoveTo = currentPos[0] + 1;
   newPosition = [rowToMoveTo, currentPos[1]];

   let itemInNextSpot = map[rowToMoveTo][currentPos[1]]

   switch (itemInNextSpot) {
      case 'W':
         return false;
         break;
      case 'B':
         moveBox('down');
         break;
      default:
         moveCursor('down');
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
