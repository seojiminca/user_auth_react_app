import React, {Component} from 'react';
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/authActions";
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null, //null은 내용이 아예 없음.
            errors: {} //리셋.
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(loginUser);
        //console.log(loginUser);

        // axios
        //     .post('users/login', loginUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({errors: err.response.data}))
    }

    render() {

        const {email, password, errors} = this.state;
        const {user} = this.props.auth;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Login</h1>
                            <p className="lead text-center">
                                login your account
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>

                                {/*<div className="form-group">*/}
                                {/*    <input*/}
                                {/*        type="email"*/}
                                {/*        className="form-control form-control-lg"*/}
                                {/*        placeholder="Email"*/}
                                {/*        name="email"*/}
                                {/*        value={email} //사용자입력값*/}
                                {/*        onChange={this.onChange}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    onChange={this.onChange}
                                    value={email}
                                    name="email"
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="password"
                                    onChange={this.onChange}
                                    value={password}
                                    name="password"
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

//상태를 속성으로 던져주는 함수.
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));