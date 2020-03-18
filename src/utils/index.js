export const generateBoard = (size) => {
    const {height, width} = size;
    const board = new Array(height);


    for (let y = 0; y < height; ++y) {
        board[y] = [];

        for (let x = 0; x < width; ++x) {
            board[y].push({
                player: null,
                position: {x, y}
            });
        }
    }

    return board;
};

const checkVertical = (size, board) => {
    const {height, width} = size;

    for (let y = 3; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (board[y][x].player) {
                if (board[y][x].player === board[y - 1][x].player &&
                    board[y][x].player === board[y - 2][x].player &&
                    board[y][x].player === board[y - 3][x].player) {
                    return board[y][x];
                }
            }
        }
    }

    return null;
};

const checkHorizontal = (size, board) => {
    const {height, width} = size;

    for (let y = 0; y < height; ++y) {
        for (let x = 3; x < width; ++x) {
            if (board[y][x].player) {
                if (board[y][x].player === board[y][x - 1].player &&
                    board[y][x].player === board[y][x - 2].player &&
                    board[y][x].player === board[y][x - 3].player) {
                    return board[y][x];
                }
            }
        }
    }

    return null;
};

const checkDiagonalLeftToRight = (size, board) => {
    const {height, width} = size;

    for (let y = 3; y < height; ++y) {
        for (let x = 3; x < width; ++x) {
            if (board[y][x].player) {
                if (board[y][x].player === board[y - 1][x - 1].player &&
                    board[y][x].player === board[y - 2][x - 2].player &&
                    board[y][x].player === board[y - 3][x - 3].player) {
                    return board[y][x];
                }
            }
        }
    }
};

const checkDiagonalRightToLeft = (size, board) => {
    const {height, width} = size;

    for (let y = 0; y < height - 3; ++y) {
        for (let x = 3; x < width; ++x) {
            if (board[y][x].player) {
                if (board[y][x].player === board[y + 1][x - 1].player &&
                    board[y][x].player === board[y + 2][x - 2].player &&
                    board[y][x].player === board[y + 3][x - 3].player) {
                    return board[y][x];
                }
            }
        }
    }
};


export const checkWinner = (size, board) =>
    checkVertical(size, board) ||
    checkHorizontal(size, board) ||
    checkDiagonalLeftToRight(size, board) ||
    checkDiagonalRightToLeft(size, board);
