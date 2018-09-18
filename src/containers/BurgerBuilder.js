import React, {Component} from 'react'
import Burger from "../components/Burger/Burger"
import Aux from './../hoc/Aux'
class BurgerBuilder extends Component{
    state= {
        ingredients :{
            salad: 1,
            bacon:2,
            chesse:1,
            meat:5
        }
    }
    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Ingredients</div>
            </Aux>
        );
    }



}

export default BurgerBuilder