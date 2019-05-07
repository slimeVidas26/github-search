import React, {Component} from 'react';
import {connect} from 'react-redux'
import {thunk_action_creator} from './actions/fetchAction';
import UserInfo from './UserInfo';

class App extends Component {

    handelChange = (e) => {
        return e.target.value
    }

    displayLoader = () => {
        console.log("<h3>loading...</h3>")
        return <h3>loading...</h3>

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const username = this.getUsername.value;
        this
            .props
            .showUsername(username)
        console.log(username)
        this.getUsername.value = ""
    }
    render() {
        // console.log(this.props.data)
        // console.log(Object.keys(this.props.data.userData))
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="form">
                    <h2 className="title">Enter the Github Username</h2>
                    <input
                        onChange={this.handelChange}
                        type="text"
                        placeholder="Enter Github Username"
                        required
                        ref={input => (this.getUsername = input)}/>
                    <button className="button">Submit</button>
                </form>
                {this.props.data.isFetching? this.displayLoader() : null}
                {this.props.data.isError? (
                 <h3 className="error">No such user exists.</h3>) : null}

               
                {Object.keys(this.props.data.userData).length > 0? (
                        <UserInfo user = {this.props.data.userData}/>
                    ): null}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showUsername: (username) => {
            dispatch(thunk_action_creator(username))
        }
    }
}

const mapStateToProps = (state) => {
    return {data: state}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
