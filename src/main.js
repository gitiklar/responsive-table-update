import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/home';
import Entry from './pages/entry';
import store from './redux/store';
import '../styles/main.scss';

const App = () => {
    return (
        <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/home" component = {Home}/>
                        <Route path="/" component = {Entry}/>
                    </Switch>
                </Router>        
            </Provider>
    );
};

ReactDOM.render(<App/> , document.querySelector('main'));
