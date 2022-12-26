import React, { useEffect, useRef, useState } from "react";
import "./Register.css"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@# %^&*? ]).{8,24}$/;


const Register = () =>{

    const userRef = useRef<any>()
    const errRef = useRef<any>()

    const [user, setUser] = useState("");
    const [validName,setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword]= useState("");
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    

    useEffect(()=>{
        if(userRef.current)
            userRef.current.focus()
    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result)
        console.log(user)
        setValidName(result);
    }, [user])

    useEffect(()=>{
        const result = PWD_REGEX.test(password);
        console.log(result)
        console.log(password)
        const isMatch = password == matchPassword;
        setValidMatch(isMatch)
    }, [password, matchPassword])

    useEffect(()=>{
        setErrMsg('');
    }, [user,password,matchPassword])

    
    return(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="loginSection section">
                <div className="loginContainer container">
                    <div className="loginLeft">
                        <h1 className="loginTitle" >Find Your Item</h1>
                        <img className="loginLogo" src="https://img.icons8.com/pastel-glyph/512/000000/box--v1.png"/>
                    </div>
                    <div className="loginRight">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Register Yourself</h3>
                                
                                <form action="signUp.php" method="post" encType="multipart/form-data">
                                        <div className='mb-3'>
                                            <label htmlFor='username' className='form-label'>Username<span>*</span></label>
                                            <input 
                                                type='text' 
                                                className='form-control' 
                                                id='username' 
                                                placeholder='Enter your username'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setUser(e.target.value)}
                                                required
                                                aria-invalid={validName ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setUserFocus(true)}
                                                onBlur={() => setUserFocus(false)}
                                            />
                                            <p id="uidnote" className={userFocus && user && !validName ? "instructions":"offscreen"}>Error</p>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Register;