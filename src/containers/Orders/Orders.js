import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from './../../axios-order'
import withErrorHandler from './../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
    state ={
        orders : [],
        loading : true
    }


    componentDidMount() {
        axios.get('/orders.json').then(response => {
                let orders =[];
                Object.keys(response.data).map(key => {
                    orders.push({
                        ...response.data[key],
                        key: key
                    }
                    );

                })
                this.setState({ orders : orders , loading:false})
            }
        )
            .catch(error => {
                this.setState({ loading:false})
                console.log('error: ', error);
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map( order => <Order
                    key={order.key}
                ingredients = {order.ingredients}
                price = {order.price}/>)}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);