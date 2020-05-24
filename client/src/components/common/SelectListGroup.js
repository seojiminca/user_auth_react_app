
//rscp
import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({name, value, onChange, options}) => {
    //options 이 array니까 mapping 하기.
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))

    return (
        <div className="form-group">
            <select
                className='form-control form-control-lg'
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectListGroup;
