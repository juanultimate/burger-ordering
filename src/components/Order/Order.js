import React from 'react';
import classes from './Order.css'
const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>


            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
};

export default Order;
