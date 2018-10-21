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
                value: '',
                validation:{
                    required :true
                },
                valid : false,
                touched : false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation:{
                    required :true
                },
                valid : false,
                touched : false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation:{
                    required :true,
                    minLength : 6
                },
                valid : false,
                touched : false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required :true
                },
                valid : false,
                touched : false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation:{
                    required :true
                },
                valid : false,
                touched : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                    ,
                    value: '',
                    validation:{}
                },
                valid:true
            }
        },
        loading:false,
        formIsValid:false
    }
    orderHandler = (event) =>{
        event.preventDefault();
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation );
        updatedFormElement.touched = true;

        updatedOrderForm[inputId] = updatedFormElement;

        const invalidKeys = Object.keys(updatedOrderForm).filter( key =>{
            console.log('key,invalid: ', key, !updatedOrderForm[key].valid);
            return !updatedOrderForm[key].valid
        });
        console.log('invalidKeys: ', invalidKeys);
        let updatedFormIsValid = true
        if(invalidKeys.length>0){
            updatedFormIsValid = false
        }
        console.log('updatedFormIsValid: ', updatedFormIsValid);
        this.setState({orderForm : updatedOrderForm, formIsValid:updatedFormIsValid})

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim()!== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }





    render() {
        const formElementsArray = [];
        Object.keys(this.state.orderForm).map(key =>{
            formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        })

        let form  =   (<form action="" onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement =>{
                return ( <Input
                    key={formElement.id}
                    type={formElement.config.elementType}
                    elementConfig ={formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed ={(event) => this.onChangeHandler(event, formElement.id)}
                    valid = {formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched ={formElement.config.touched}

                />)
            })}

            <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>

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