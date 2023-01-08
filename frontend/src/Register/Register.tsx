import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Register.css"

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@# %^&*? ]).{8,24}$/;


const Register = () =>{
    
    const submit = gql`
    mutation addUser($userInfo: UserInput!) {
        addUser(userInfo: $userInfo) {
            _id
            name
            email
            password
            country
        }
        }
    `;

    const [register, { data, loading, error }] = useMutation(submit);

    const userRef = useRef<any>()
    const errRef = useRef<any>()

    const [user, setUser] = useState("");
    const [validName,setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("")
    
    const [phone, setPhone] = useState("")

    const [country,setCountry] = useState("")


    const [password, setPassword] = useState("");
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword]= useState("");
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate()

    useEffect(()=>{
        if(userRef.current)
            userRef.current.focus()
    }, [])

    useEffect(()=>{
        // const result = USER_REGEX.test(user);
        const result = true
        setValidName(result);
    }, [user])

    useEffect(()=>{
        // const result = PWD_REGEX.test(password);
        const result = true
        setValidPassword(result)
        const isMatch = password == matchPassword;
        setValidMatch(isMatch)
    }, [password, matchPassword])

    useEffect(()=>{
        setErrMsg('');
    }, [user,password,matchPassword])

    useEffect(() =>{
        if(success)
            navigate("/");
    }, [success])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log(user,password,email,phone,country)

        let data = {
            name: user,
            password,
            email,
            phone,
            country
        }

        setSuccess(true)

        // register({variables:{userInfo: data}}).then(()=>{
        //     setSuccess(true)
        // })
    }

    
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
                        <div className="card" style={{maxWidth: "500px", width: "100%"}}>
                            <div className="card-body">
                                <h3 className="card-title">Register Yourself</h3>
                                
                                <form 
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                        <div className='mb-3'>
                                            <label htmlFor='username' className='form-label'>Username<span className='required'>*</span></label>
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
                                                onBlur={() => setUserFocus(true)}
                                            />
                                            <p id="uidnote" className={userFocus && user && !validName ? "instructions":"offscreen"}>Error</p>
                                        </div>
                                        
                                        <div className='mb-3'>
                                            <label htmlFor='email' className='form-label'>Email<span className='required'>*</span></label>
                                            <input 
                                                type='email' 
                                                className='form-control' 
                                                id='email' 
                                                placeholder='Enter your email'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                // aria-invalid={validMatch ? "false" : "true"}
                                                // aria-describedby="uidnote"
                                                // onFocus={() => setMatchFocus(true)}
                                                // onBlur={() => setMatchFocus(true)}
                                            />
                                            {/* <p id="uidnote" className={!validMatch && matchPassword && password? "instructions":"offscreen"}>Password Not Match!</p> */}
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='phone' className='form-label'>Phone<span className='required'>*</span></label>
                                            <input 
                                                type='phone' 
                                                className='form-control' 
                                                id='phone' 
                                                placeholder='Enter your phone'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                // aria-invalid={validMatch ? "false" : "true"}
                                                // aria-describedby="uidnote"
                                                // onFocus={() => setMatchFocus(true)}
                                                // onBlur={() => setMatchFocus(true)}
                                            />
                                            {/* <p id="uidnote" className={!validMatch && matchPassword && password? "instructions":"offscreen"}>Password Not Match!</p> */}
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='email' className='form-label'>Country<span className='required'>*</span></label>
                                            <input 
                                                type='country' 
                                                className='form-control' 
                                                id='country' 
                                                placeholder='Enter your country'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setCountry(e.target.value)}
                                                required
                                                // aria-invalid={validMatch ? "false" : "true"}
                                                // aria-describedby="uidnote"
                                                // onFocus={() => setMatchFocus(true)}
                                                // onBlur={() => setMatchFocus(true)}
                                            />
                                            {/* <p id="uidnote" className={!validMatch && matchPassword && password? "instructions":"offscreen"}>Password Not Match!</p> */}
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='password' className='form-label'>Password<span className='required'>*</span></label>
                                            <input 
                                                type='password' 
                                                className='form-control' 
                                                id='password' 
                                                placeholder='Enter your password'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                aria-invalid={validPassword ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setPasswordFocus(true)}
                                                onBlur={() => setPasswordFocus(true)}
                                            />
                                            <p id="uidnote" className={passwordFocus && password && !validPassword ? "instructions":"offscreen"}>Error</p>
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='comfirm_password' className='form-label'>Comfirm Password<span className='required'>*</span></label>
                                            <input 
                                                type='password' 
                                                className='form-control' 
                                                id='comfirm_password' 
                                                placeholder='Enter your password'
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setMatchPassword(e.target.value)}
                                                required
                                                aria-invalid={validMatch ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setMatchFocus(true)}
                                                onBlur={() => setMatchFocus(true)}
                                            />
                                            <p id="uidnote" className={!validMatch && matchPassword && password? "instructions":"offscreen"}>Password Not Match!</p>
                                        </div>

                                        <Button 
                                            disabled={
                                                validMatch && validPassword && validName 
                                                && user && password && matchPassword
                                                ? false:true 
                                            } 
                                            type="submit">
                                                Register
                                        </Button>
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