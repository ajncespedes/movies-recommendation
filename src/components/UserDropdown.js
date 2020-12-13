import React, {useState} from 'react';
import { useHistory  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserDropdown = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { currentUsername, logout } = useAuth();

    const history = useHistory();

    const onClick = () => {
        setCollapsed(!collapsed);
    }


    const onLogout = async () => {
        await logout();
        history.push('/signin');
    };
    
    if(currentUsername) {
        return (
            <div className = {"dropdown" + (collapsed ? "" : " is-active")}>
                <div className = "dropdown-trigger">
                    <button className = "button is-black" aria-haspopup = "true" aria-controls = "dropdown-menu" onClick={() => onClick()}>
                        <span>{currentUsername}</span>
                        <span className = "icon is-small">
                            <i className = "fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className = "dropdown-menu" id = "dropdown-menu" role = "menu">
                    <div className = "dropdown-content has-background-black">
                        <button className = "link-button dropdown-item has-text-white" onClick={onLogout}>
                            <i className="fa fa-sign-out"></i>
                            <span className="ml-1">Sign out</span>
                        </button>
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