import React, {Component} from 'react';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            error: {}
        };

        //데이터를 받아오기만 하는것이 아니라 사용자 입력값이 있으면 나머지 함수를 바인딩시킨다.
        //지금 상태를 항상 onChange함수에 업데이트하기위한 부분.
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //수정을 위해서. 이것과 윗부분의 바인딩이 있어야 입력창에 입력이 가능함.
    onChange(e) { //e는 임의의 사용자 입력값. 그게 name 혹은 다른 email 일지 모르니까.
        this.setState({ [e.target.name]: e.target.value });
    }

    //send버튼. API태우기.
    onSubmit(e) {
        //input btn 기본 함수.
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser); //회원가입하고 개발자옵션에서 로그확인.
    }

    render() {

        const {name, email, password, password2, error} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Name"
                                        name="name"
                                        value={name} //사용자입력값
                                        onChange={this.onChange}
                                    />
                                </div>
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
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm password"
                                        name="password2"
                                        value={password2} //사용자입력값
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

export default Register;