import React from 'react';
import classes from './ToolBar.css'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const ToolBar = () => {
    return (
        <header className={classes.ToolBar}>
            <div>MENU</div>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    )
};

export default ToolBar;
