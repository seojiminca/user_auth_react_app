import React, {Component} from 'react';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            error: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(newUser);
    }

    render() {

        const {email, password} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Login</h1>
                            <p className="lead text-center">
                                login your account
                            </p>

                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        name="email"
                                        value={email} //사용자입력값
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={password} //사용자입력값
                                        onChange={this.onChange}
                                    />
                                </div>

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