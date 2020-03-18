import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {generateBoard, checkWinner} from "../../utils";
import Cell from "../cell";
import './index.css';

class Board extends Component {

    static propTypes = {
        boardSize: PropTypes.shape({height: PropTypes.number, width: PropTypes.number}).isRequired,
    };

    initialState = {
        board: [],
        player1: 'Acer',
        player2: 'Cognite',
        currentPlayer: 'Acer',
    };

    state = {...this.initialState};

    componentDidMount() {
        this.restartGame();
    }

    getNextPlayer() {
        return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
    }

    boardDOM = () => {
        const {board} = this.state;

        return board.map((column, y) => (
            <div className="board-column" key={`column-${y}`}>
                {
                    column.map((row, x) => (
                        <Cell key={`cell-${y}-${x}`}
                              position={{y, x}} p
                              player={board[y][x].player}
                              pressed={this.handleCellClick}/>))
                }
            </div>
        ));
    };

    handleCellClick = (cell) => {
        const {board, currentPlayer} = this.state;
        const {boardSize} = this.props;
        const emptyColumnSpot = this.findEmptySpotInTheColumn(cell.position.x);

        if (!Number.isInteger(emptyColumnSpot)) {
            alert('This column is full!');
            return;
        }


        let targetCell = {...board[emptyColumnSpot][cell.position.x]};

        targetCell.player = currentPlayer;
        board[emptyColumnSpot][cell.position.x] = targetCell;

        this.setState({board, currentPlayer: this.getNextPlayer()}, () => {
            const winner = checkWinner(boardSize, board);

            if (winner) {
                alert(`Winner is ${winner.player}\nClick Okay to restart the game.`);
                this.restartGame();
            }
        });


    };

    findEmptySpotInTheColumn = (rowIndex) => {
        const {board} = this.state;

        for (let y = board.length - 1; y >= 0; --y) {
            const cell = board[y][rowIndex];
            if (!cell.player) {
                return y;
            }

        }

        return null;
    };

    restartGame = () => {
        const {boardSize} = this.props;

        this.setState({...this.initialState, board: generateBoard(boardSize)});
    };

    render() {
        const {currentPlayer} = this.state;

        const classNames = classnames({
            'player-indicator': true,
            'player--red': (currentPlayer === 'Acer'),
            'player--blue': (currentPlayer === 'Cognite')
        });
        return (
            <>
                <h4 className={classNames}>Current Player : {currentPlayer}</h4>
                <div className="board-wrapper">{this.boardDOM()}</div>
            </>
        );
    }
}

export default Board;
