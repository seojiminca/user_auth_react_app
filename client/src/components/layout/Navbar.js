import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";


class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            //{{}} 스타일 바로 적용.
                            style={{width: '25px', marginRight: '5px'}}
                            title='You must have a Gravatar connected to your email to display an image'
                        />{' '}
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className='nav-link' to="/register">
                        Sign up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to="/login">
                        Log in
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        // 반응형(mobile)위한 부분. Bootstrap이랑 동일한 classname을 사용해야 Bootstrap이랑 연결이된다.
                        data-target="#mobile-nav"
                    >
                        {/*리액트에서는 className. html에서는 class*/}
                        <span className="nav-bar-toggler-icon"/>
                    </button>
                </div>

                {/*반응형위한 부분. 위에랑 같은 id를 주어야한다.*/}
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">
                                {' '}
                                Developers
                            </Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);