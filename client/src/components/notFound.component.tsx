import React, { Component } from "react";
import { Dimmer, Loader} from 'semantic-ui-react'

class NotFound extends Component{
    render(){
        return(
            <Dimmer active>
                <Loader indeterminate>Preparing Files</Loader>
            </Dimmer>
        );
    }
}

export default NotFound