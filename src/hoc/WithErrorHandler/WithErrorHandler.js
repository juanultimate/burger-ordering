import React from 'react';
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    //this returns a functional component
    return (props) => {
        return (
            <Aux>
                <Modal show>
                    Something did not work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>

        )
    }
};

export default withErrorHandler;
