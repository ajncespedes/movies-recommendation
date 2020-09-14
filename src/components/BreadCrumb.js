import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = () => {
    return (
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><Link  to='/'>Home</Link></li>
                <li class="is-active">Movie detail</li>
            </ul>
        </nav>
    );
}

export default BreadCrumb;