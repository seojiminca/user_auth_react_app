//rccp
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: '',
            nationality: '',
            gender: '',
            age: '',
            location: '',
            travelStyle: '',
            introduction: '',
            travelHistory: '',
            loading: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    //button
    onSubmit(e) {
        e.preventDefault();
        const newProfile = {
            language: this.state.language,
            nationality: this.state.nationality,
            gender: this.state.gender,
            age: this.state.age,
            location: this.state.location,
            travelStyle: this.state.travelStyle,
            introduction: this.state.introduction,
            travelHistory: this.state.travelHistory,
        }
        console.log(newProfile)

        //네트워크태우기.
        this.props.createProfile(newProfile, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }



    render() {
        const languageOpt = [
            {label: '* Select Language', value: 0},
            {label: 'Korean', value: 'Korean'},
            {label: 'English', value: 'English'},
            {label: 'Chinese', value: 'Chinese'},
            {label: 'Spanish', value: 'Spanish'},
        ];

        const nationalityOpt = [
            {label: '* Select nationality', value: 0},
            {label: 'Korean', value: 'Korean'},
            {label: 'English', value: 'English'},
            {label: 'Chinese', value: 'Chinese'},
        ]

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                {/*<TextFieldGroup*/}
                                {/*    onChange={this.onChange}*/}
                                {/*    value={this.state.language}*/}
                                {/*    name="language"*/}
                                {/*    placeholder="language"*/}
                                {/*/>*/}
                                <SelectListGroup
                                    options={languageOpt}
                                    onChange={this.onChange}
                                    name="language"
                                    value={this.state.language}
                                />
                                <SelectListGroup
                                    options={nationalityOpt}
                                    onChange={this.onChange}
                                    name="nationality"
                                    value={this.state.nationality}
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.gender}
                                    name="gender"
                                    placeholder="gender"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.age}
                                    name="age"
                                    placeholder="age"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.location}
                                    name="location"
                                    placeholder="location"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.travelStyle}
                                    name="travelStyle"
                                    placeholder="travelStyle"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.introduction}
                                    name="introduction"
                                    placeholder="introduction"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    value={this.state.travelHistory}
                                    name="travelHistory"
                                    placeholder="travelHistory"
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
