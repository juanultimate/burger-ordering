import React from 'react';
import classes from './Spinner.css';

const Spinner = () => {
    return (
        <div className={classes["lds-ripple"]}>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;
