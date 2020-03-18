import React, {Component} from 'react';
import logo from './logo.svg';
import Board from './components/board';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Cognite interview boilerplate</h1>
                </header>
                <Board boardSize={{height: 7, width: 6}}/>
            </div>
        );
    }
}

export default App;
