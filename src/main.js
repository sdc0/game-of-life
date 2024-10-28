var cells = [];
var cells_wide = 0;
var cells_tall = 0;
var playing = false;

function setup(passed_cells_wide, passed_cells_tall) {
    var container = document.getElementById("game");

    cells_wide = passed_cells_wide;
    cells_tall = passed_cells_tall;

    var width = 100 / cells_wide;
    var height = 100 / cells_tall;

    for (var i = 0; i < cells_tall; i++) {
        cells[i] = [];
        for (var j = 0; j < cells_wide; j++) {
            var element = document.createElement("div");
            
            element.setAttribute("class", "cell");
            element.setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%;");

            element.setAttribute("data-x", j.toString());
            element.setAttribute("data-y", i.toString());

            container.appendChild(element);

            cells[i][j] = [0, 0, element];
        }
    }
}

function clickBoard(event) {
    if (event.target.className == "cell" && (event.buttons === 1 || event.type === 'click')) {
        let row = event.target.dataset.y;
        let col = event.target.dataset.x;

        var width = 100 / cells_wide;
        var height = 100 / cells_tall;

        if (cells[row][col][0] == 0) {
            cells[row][col][0] = 1;
            cells[row][col][2].setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%; background-color: rgb(175, 175, 175);");
        }else {
            cells[row][col][0] = 0;
            cells[row][col][2].setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%;");
        }
    }
}

function updateNeighbors(x, y) {
    let sum = 0;

    sum += cells[((y - 1) + cells_tall) % cells_tall][((x - 1) + cells_wide) % cells_wide][0];
    sum += cells[((y - 1) + cells_tall) % cells_tall][x][0];
    sum += cells[((y - 1) + cells_tall) % cells_tall][(x + 1) % cells_wide][0];
    sum += cells[y][((x - 1) + cells_wide) % cells_wide][0];
    sum += cells[y][(x + 1) % cells_wide][0];
    sum += cells[(y + 1) % cells_tall][((x - 1) + cells_wide) % cells_wide][0];
    sum += cells[(y + 1) % cells_tall][x][0];
    sum += cells[(y + 1) % cells_tall][(x + 1) % cells_wide][0];

    cells[y][x][1] = sum;
}

function updateSquare(x, y) {
    var width = 100 / cells_wide;
    var height = 100 / cells_tall;

    if (cells[y][x][1] < 2 || cells[y][x][1] > 3) {
        cells[y][x][0] = 0;
        cells[y][x][2].setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%;");
    }else if (cells[y][x][1] == 3 && cells[y][x][0] == 0) {
        cells[y][x][0] = 1;
        cells[y][x][2].setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%; background-color: rgb(175, 175, 175);");
    }
}

function updateBoard() {
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            updateNeighbors(j, i);
        }
    }

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            updateSquare(j, i);
        }
    }
}

function pressPlay() {
    playing = !playing;
    document.getElementById("play-button-icon").setAttribute("src", playing ? "./assets/pause-button.png" : "./assets/play-button.png");
}

function clearBoard() {
    var width = 100 / cells_wide;
    var height = 100 / cells_tall;

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j][0] = 0;
            cells[i][j][1] = 0;
            cells[i][j][2].setAttribute("style", "width:" + width.toString() + "%; height:" + height.toString() + "%;");
        }
    }
}