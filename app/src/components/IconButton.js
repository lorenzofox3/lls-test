import React from 'react';

export default ({children, label, className = '', ...rest}) => {
    return <button className={className + ' icon'} {...rest}>
        <span className="visually-hidden">{label}</span>
        <span aria-hidden="true">{children}</span>
    </button>;
}

