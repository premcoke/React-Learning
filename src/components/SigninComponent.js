import React, { useState, useContext } from 'react';

const SignInContext = React.createContext();

const Login = () => {
    const { email, setEmail, pass, setPass } = useContext(SignInContext);
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPassChange = (e) => {
        setPass(e.target.value);
    };
    return (
        <>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input type="email" value={email} autoComplete="off" onInput={onEmailChange} className="form-control" id="emailInput" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" autoComplete="off" value={pass} onInput={onPassChange} className="form-control" id="passwordInput" placeholder="Password" />
            </div>
        </>
    );
};

const SignUp = () => {
    const { mobile, setMobile, name, setName } = useContext(SignInContext);
    const mobileChange = (e) => {
        setMobile(e.target.value);
    };
    const nameChange = (e) => {
        setName(e.target.value);
    };
    return (
        <>
            <div className="form-group">
                <label htmlFor="nameInput">Name</label>
                <input type="text" autoComplete="off" value={name} onInput={nameChange} className="form-control" id="nameInput" placeholder="Name" />
            </div>
            <div className="form-group">
                <label htmlFor="mobileInput">Mobile Number</label>
                <input type="text" minLength="10" maxLength="10" autoComplete="off" value={mobile} onInput={mobileChange} className="form-control" id="mobileInput" placeholder="Mobile number" />
            </div>
        </>
    );
};

const SigninComponent = ({ UpdateLogInDetails }) => {
    const UpdateDetails = UpdateLogInDetails;
    const [isSignUp, setIsSignUp] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const updateType = (e) => {
        setType(e.target.value);
    };
    const updateSignUp = (signUpValue) => {
        setIsSignUp(signUpValue);
    };
    const loginClick = async (e) => {
        setIsError(false);
        e.preventDefault();
        if (!isSignUp) {
            const data = {
                email: email
            }
            const result = await fetch('http://localhost:5000/api/loginDetails', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).catch((err) => {
                setIsError(true);
                setError(err.toString());
            });
            if (result != null && result.error) {
                setIsError(true);
                setError(result.error);
            }
            else {
                if (result == null) {
                    setIsError(true);
                    setError('Unknown error occurred please try again');
                }
                else if (result != null && result.loginDetails === null) {
                    setIsError(true);
                    setError('Email id not registered');
                }
                else if (result != null && result.loginDetails.passWord.toString() !== pass.toString()) {
                    setIsError(true);
                    setError('Invalid Credentials');
                }
                else {
                    setEmail('');
                    setPass('');
                    UpdateDetails(result.loginDetails);
                }
            }
        }
        else {
            const phoneValidate = /^\d{10}$/;
            if (name.length === 0) {
                setIsError(true);
                setError('Enter a name');
            }
            else if (mobile.length === 0 || !mobile.match(phoneValidate)) {
                setIsError(true);
                setError('Enter a valid mobile number');
            }
            else if (email.length === 0) {
                setIsError(true);
                setError('Enter a valid mail id');
            }
            else if (pass.length === 0) {
                setIsError(true);
                setError('Enter a valid pass');
            }
            else {
                const data = {
                    details: {
                        name: name,
                        mobile: mobile,
                        isVerified: false,
                        passWord: pass,
                        email: email
                    }
                };
                const result = await fetch('http://localhost:5000/api/addUser', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).catch((err) => {
                    setIsError(true);
                    setError(err.toString());
                });
                if (result.error) {
                    setIsError(true);
                    setError(result.error.toString());
                }
                else {
                    setIsSignUp(false);
                    setEmail('');
                    setMobile('');
                    setPass('');
                    setName('');
                }
            }
        }
    };
    return (
        <div className="show fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-light">{isSignUp ? 'Registration Form' : 'Login Form'}</h5>
                        <div>
                            <button type="button" className="btn btn-link text-light" aria-label="SigUp" onClick={() => updateSignUp(!isSignUp)}>
                                {isSignUp ? 'Login' : "Register"}
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form>
                            <SignInContext.Provider value={{ email, setEmail, pass, setPass, mobile, setMobile, name, setName }}>
                                {isSignUp && <SignUp />}
                                <Login />
                                {isSignUp &&
                                    <div className="form-group">
                                        <label htmlFor="typeInput">Role</label>
                                        <div>
                                            <select id="typeInput" style={{width:'100%'}} value={type} className="form-select" onChange={updateType} aria-label="Role">
                                                <option value="jobseeker">Job Seeker</option>
                                                <option value="employer">Employer</option>
                                            </select>
                                        </div>
                                    </div>
                                }
                                 {isError && <div className='text-danger'>{error}</div>}
                                <div className="justify-content-center" style={{ display: 'flex' }}>
                                    <button type="submit" onClick={loginClick} className="btn btn-primary">{!isSignUp ? 'Login' : "Registration"}</button>
                                </div>
                            </SignInContext.Provider>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninComponent;