import React from 'react';
import Wrapper from '../../hoc/Aux'
import classes from './Layout.css'

const layout = ( props ) => (
    <Wrapper>
        <div>menu 1, menu 2 menu 3</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Wrapper>
);

export default layout;