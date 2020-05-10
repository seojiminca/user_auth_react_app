import React, {Component} from 'react';
import axios from 'axios';
import TextFieldGroup from "../common/TextFieldGroup";

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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };
        //console.log(loginUser);

        axios
            .post('users/login', loginUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors: err.response.data}))
    }

    render() {

        const {email, password, errors} = this.state;

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

export default Login;