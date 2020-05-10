import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import {withRouter} from 'react-router-dom'; //axios 삭제하고 redux에 맞게 이걸로 변경.

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        //데이터를 받아오기만 하는것이 아니라 사용자 입력값이 있으면 나머지 함수를 바인딩시킨다.
        //지금 상태를 항상 onChange함수에 업데이트하기위한 부분.
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
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

        this.props.registerUser(newUser, this.props.history);
        //console.log(newUser); //회원가입하고 개발자옵션에서 로그확인.

        //axios 이용해서 api보낸다.
        // axios
        //     .post('users/signup', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({errors: err.response.data}))


    }

    render() {

        const {name, email, password, password2, errors} = this.state;
        const {user} = this.props.auth;

        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="name"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                    value={name}
                                    name="name"
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                    value={email}
                                    name="email"
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                {/*<small className="form-text text-muted">*/}
                                {/*    This site uses Gravatar so if you want a profile image, use*/}
                                {/*    a Gravatar email*/}
                                {/*</small>*/}

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    value={password}
                                    name="password"
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    value={password2}
                                    name="password2"
                                    error={errors.password2}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register)); //화면이동을 위해 withRouter 추가해줘.