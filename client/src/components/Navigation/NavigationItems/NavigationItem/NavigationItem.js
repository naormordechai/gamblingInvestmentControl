import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationItem = (props) => {
    return (
    <Link to={props.to} className={props.className}>{props.children}</Link>
    )
}
