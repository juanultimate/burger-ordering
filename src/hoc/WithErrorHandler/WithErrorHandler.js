import React, {Component} from 'react';
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    //this is an anonymous class
    return class extends Component {
        state = {
            error : null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState(
                    {error: false}
                );
                return request;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState(
                    {error: error}
                )
            });
        }
        errorConfirmedHandler = ()=>{
            this.setState(
                {error:null}
            )
        };

        componentWillUnmount() {
            console.log('Will unmount: ',this.reqInterceptor, this.resInterceptor );
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    };
};

export default withErrorHandler;
