import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls =[
    {label:"Salad", type:'salad'},
    {label:"Bacon", type:'bacon'},
    {label:"Cheese", type:'cheese'},
    {label:"Meat", type:'meat'},
];
const builControls =(props) => {
    return <div className={classes.BuildControls}>
        <p><strong>Current price:{props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl key={control.label}
                          label={control.label}
                          added={() => props.ingredientAdded(control.type)}
                          removed={() => props.ingredientRemoved(control.type)}
                          disabled = {props.disabledInfo[control.type]}
                            />

            ))}
    </div>

};
export default builControls;