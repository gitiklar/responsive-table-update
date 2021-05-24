import React from 'react';
import { Link, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import logoImg from '../../styles/images/logo.jpg';
import TableContainer from '../components/tableContainer';

const Home = () => {

    return (
        <div className="homeContainer">
            <header id="header">
                <Link to="/"><img src={logoImg} alt="logo"/></Link>
                 <div className="divHello">
                    <span> &nbsp; &nbsp; Hello guest &nbsp;</span>
                 </div>
            </header>
            <div id="heading" >
                <div className="menuLine">
                    <Link to="/">Home</Link>
                    <Link to="/home/table">Responsive table</Link>
                </div>
            </div>
            <section id="main" className="wrapper">
                <div className="inner">
                    <Route path = "/home/table" component = { TableContainer }/>
                </div>
            </section>
        </div>
    );
};

export default Home;