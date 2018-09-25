import React, { Component} from 'react';
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
//This component should be a functional component, does not have to be a class
class  OrderSummary extends Component{

    componentWillUpdate() {
        console.log('[OrderSummary] componentWillUpdate')
    }
    render(){
        let ingredientSummary = [];
        if(this.props.ingredients){
            ingredientSummary =  Object.keys(this.props.ingredients)
                .map(igKey =>{
                    return (
                        <li key={igKey}>
                    <span style={{textTransform : 'capitalize'}}>{igKey}
                    </span>: {this.props.ingredients[igKey]}
                        </li>);
                });
        }


        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)} USD</strong></p>

                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;