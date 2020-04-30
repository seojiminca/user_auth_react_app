import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Navbar extends Component {
    render() {
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
                        <span className="nav-bar-toggler-icon" />
                    </button>
                </div>

                {/*반응형위한 부분. 위에랑 같은 id를 주어야한다.*/}
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className='nav-link' to="/">
                                Developers
                            </Link>
                        </li>
                    </ul>
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
                </div>
            </nav>
        );
    }
}

export default Navbar;