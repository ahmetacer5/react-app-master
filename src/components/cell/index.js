import React, {Component} from 'react';
import classnames from 'classnames';
import './index.css';
import PropTypes from "prop-types";

class Cell extends Component {
    static propTypes = {
        pressed: PropTypes.func.isRequired,
        player: PropTypes.string,
        position: PropTypes.shape({y: PropTypes.number, x: PropTypes.number}).isRequired
    };

    render() {
        const {player, position, pressed} = this.props;

        const classNames = classnames({
            'board-cell': true,
            'player--red': (player === 'Acer'),
            'player--blue': (player === 'Cognite')
        });

        return (
            <div className={classNames} onClick={() => pressed({player, position})}>
            </div>
        );
    }
}

export default Cell;
