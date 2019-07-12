import React, { Component } from 'react'; //rce snippet
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            text :""
        }
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,        
        });
        this.props.setAlert(null, null);

    }

    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter something!', 'danger');
        }else{
            this.props.searchUsers(this.state.text); // passing up the state
            this.setState({ text: "" });
            this.props.setAlert(null, 'danger');
        }
        
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.submitHandler}>
                    <input type="text" name="text" placeholder="Search users..." onChange={this.changeHandler} value={this.state.text} />
                    <button className='btn btn-dark btn-block'>Search</button>
                </form>
                {this.props.showClear && (
                    <button className='btn btn-light btn-block' onClick={this.props.clearUsers}>Clear</button>      
                )}
                         
            </div>

        )
    }
}

export default Search
