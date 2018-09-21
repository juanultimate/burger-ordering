import React from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import ToolBar from "../Navigation/ToolBar/ToolBar";

const layout = ( props ) => (
    <Aux>
        <div><ToolBar/></div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;