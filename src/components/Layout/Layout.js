import React from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.css'

const layout = ( props ) => (
    <Aux>
        <div>menu 1, menu 2 menu 3</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;