import React, {Component} from 'react'
import Burger from "../components/Burger/Burger"
import Aux from '../hoc/Aux/Aux'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from './../components/UI/Modal/Modal'
import OrderSummary from './../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../components/UI/Spinner/Spinner';

import axios from './../axios-order';
import withErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon : 0.4,
    meat : 0.7,
    cheese : 0.2
};
class BurgerBuilder extends Component{
    state= {
        ingredients :null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading :false,
        error: false
    };

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                if(response){
                    this.setState({
                        ingredients : response.data
                    })
                }
            } )
            .catch(error =>{
                this.setState({
                    error : true
                })
        })
    }

    updatePurchaseStatus = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map((ingredient) => {
                return ingredients[ingredient]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients)


    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{

        let queryParams =[];
        Object.keys(this.state.ingredients).map(ingredient => {
            queryParams.push(encodeURIComponent(ingredient)+'='+ encodeURIComponent(this.state.ingredients[ingredient]));
        });
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: `?${queryString}`
        });
    };

    render(){
        if(! this.state.ingredients || this.state.ingredients.length === 0){
            return (<p>Ingredients cannot be loaded</p>)
        }
        let orderSummary =   <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice ={this.state.totalPrice}
        />;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Aux>
        );
    }


}

export default withErrorHandler(BurgerBuilder,axios)