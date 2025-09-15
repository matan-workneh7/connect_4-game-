var player1 = prompt("Enter Player 1 Name: youll be Blue");
var player1color = "blue";

var player2 = prompt("Enter Player 2 Name: youll be Red");
var player2color = "red";

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}
 
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(202, 202, 202)') {
            return row
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(202, 202, 202)' && one !== undefined);
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('horizontal');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function gameEnd(winningPlayer) {
    $('h2, h3').hide();
    var playerColor = (winningPlayer === player1) ? player1color : player2color;
    $('h1').html('<span style="color: ' + playerColor + '">' + winningPlayer + '</span> has won!<br>Refresh your browser to play again!').css("font-size", "50px");
    game_on = false;
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h3').text(player1 + " it is your turn, pick a column to drop your blue chip.");

$('.board button').on('click', function() {
    if (game_on) {
        var col = $(this).closest('td').index();
        var bottomAvail = checkBottom(col);
        changeColor(bottomAvail, col, currentColor);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
            gameEnd(currentName);
        }

        currentPlayer = currentPlayer * -1;

        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text(currentName + " it is your turn.");
            currentColor = player1color;
        } else {
            currentName = player2;
            $('h3').text(currentName + " it is your turn.");
            currentColor = player2color;
        }
    }
});