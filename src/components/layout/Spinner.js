//rafc -- arrow function snippet

import React, {Fragment} from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="loading ..." style={{display:'block', width:"60px", margin:"10px auto"}} />
        </Fragment>
    )
}

export default Spinner
