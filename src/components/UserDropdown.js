import React, {useState} from 'react';
import { useHistory  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserDropdown = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { currentUser, logout } = useAuth();

    const history = useHistory();

    const onClick = () => {
        setCollapsed(!collapsed);
    }


    const onLogout = async () => {
        await logout();
        history.push('/signin');
    };
    
    if(currentUser) {
        return (
            <div className = {"dropdown" + (collapsed ? "" : " is-active")}>
                <div className = "dropdown-trigger">
                    <button className = "button is-black" aria-haspopup = "true" aria-controls = "dropdown-menu" onClick={() => onClick()}>
                        <span>{currentUser.email.split('@')[0]}</span>
                        <span className = "icon is-small">
                            <i className = "fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className = "dropdown-menu" id = "dropdown-menu" role = "menu">
                    <div className = "dropdown-content has-background-black">
                        <a href className = "dropdown-item has-text-white" onClick={onLogout}>
                            <i className="fa fa-sign-out"></i>
                            <span className="ml-1">Sign out</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <button className = "button is-black" onClick={onLogout}>Login</button>
        );
    }
};

export default UserDropdown;