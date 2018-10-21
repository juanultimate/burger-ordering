import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import axios from './../../../axios-order'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state={
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your e-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                    ,
                    value: ''
                },
            }
        },
        loading:false
    }
    orderHandler = (event) =>{
        event.preventDefault();
        console.log('this.props.ingredients: ', this.props.ingredients);
        this.setState({loading:true});
        const formData = {}
        Object.keys(this.state.orderForm).map(formElementId =>{
            formData[formElementId] = this.state.orderForm[formElementId].value
        });

        const order = {
            ingredients : this.state.ingredients,
            price : this.props.totalPrice,
            orderData:formData


        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading:false, purchasing :false})
                this.props.history.push('/')
            })
            .catch(error =>{
                console.log(error);
                this.setState({loading:false, purchasing : false})

            })
    };

    onChangeHandler = (event, inputId)=> {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;

        updatedOrderForm[inputId] = updatedFormElement;
        this.setState({orderForm : updatedOrderForm})
    }





    render() {
        const formElementsArray = [];
        Object.keys(this.state.orderForm).map(key =>{
            console.log('key: ', key);
            formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        })
        console.log('formElementsArray: ', formElementsArray);

        let form  =   (<form action="" onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement =>{
                return ( <Input
                    key={formElement.id}
                    type={formElement.config.elementType}
                    elementConfig ={formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed ={(event) => this.onChangeHandler(event, formElement.id)}

                />)
            })}

            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>

        </form>)
        if (this.state.loading){
            form = <Spinner/>
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;