import React from 'react';
import classes from './Burger.css'
import Ingredient from './Ingredient/Ingredient'
const burger = () => {
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"></Ingredient>
            <Ingredient type="cheese"></Ingredient>
            <Ingredient type="meat"></Ingredient>
            <Ingredient type="salad"></Ingredient>
            <Ingredient type="bread-bottom"></Ingredient>

        </div>
    )

};


export default burger;