import React from 'react';

export default ({children, label, ...rest}) => <button {...rest}>
    <span className="visually-hidden">{label}</span>
    <span aria-hidden="true">{children}</span>
</button>

