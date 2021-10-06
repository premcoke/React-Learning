import React, { useState } from 'react';
import FrontPage from './FrontPage';
import SigninComponent from './SigninComponent';
import Header from './Header';

const SignInPage = () => {
    const [isLoggedIn, updateIsLoggedIn] = useState(false);
    const [userData, updateUserData] = useState(null);
    const UpdateLogInDetails = (data) => {
        updateUserData(data);
        updateIsLoggedIn(true);
    };
    return (
        <>
            <Header data={userData} />
            {
                !isLoggedIn ? <SigninComponent UpdateLogInDetails={UpdateLogInDetails} /> : <FrontPage data={userData} />
            }
        </>
    )
};

export default SignInPage;