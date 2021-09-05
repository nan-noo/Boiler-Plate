import React from 'react';
import {Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
    const user = useSelector(state => state.user); // a hook to access redux store's state // 여기선 root의 user에 access
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser())
            .then(response => {
                if(response.payload.logoutSuccess){
                    props.history.push("/login");
                }
                else{
                    alert('Failed to log out');
                }
            })
    }

    if(user.userData && !user.userData.isAuth){
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="login">
                    <a href="/login">Sign in</a>
                </Menu.Item>
                <Menu.Item key="register">
                    <a href="/register">Sign up</a>
                </Menu.Item>
            </Menu>
        )
    }
    else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Log out</a>
                </Menu.Item>
            </Menu>
        )
    }     
}

export default withRouter(RightMenu);
