import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./global.css"

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@# %^&*? ]).{8,24}$/;


const Login = () =>{
    
    const getUser = gql`
        query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                _id
                name
                email
            }
        }
    `;

    const [login ,{ data, loading, error }] = useLazyQuery(getUser);

    const userRef = useRef<any>()
    const errRef = useRef<any>()

    // const [user, setUser] = useState("");
    // const [validName,setValidName] = useState(false);
    // const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("");
    const [validPassword,setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate()

    useEffect(()=>{
        if(userRef.current)
            userRef.current.focus()
    }, [])

    // useEffect(()=>{
    //     // const result = USER_REGEX.test(user);
    //     const result = true
    //     setValidName(result);
    // }, [user])

    useEffect(()=>{
        // const result = PWD_REGEX.test(password);
        const result = true
        setValidPassword(result)
    }, [password])


    // useEffect(() =>{
    //     if(success)
    //         navigate("/");
    // }, [success])

    // useEffect(() =>{
    //     console.log("hI")
    // },[])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log(email,password)

        setSuccess(true)

        login({variables:{email: email, password: password}}).then((res)=>{
            console.log(res)
        })

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
                        <div className="card" style={{width: "500px"}}>
                            <div className="card-body">
                                <form 
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                        {/* <div className='mb-3'>
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
                                        </div> */}
                                        
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

                                        <Button 
                                            disabled={
                                                email && password? false:true 
                                            } 
                                            type="submit">
                                                Login
                                        </Button>
                                </form>

                                <div className="registerButton text-center d-flex flex-column">
                                    <button type="button" className="btn btn-link">Forgotten password?</button>
                                </div>
                                <div className="container">
                                    <hr className="bg-dark border-2 border-top border-dark"/>
                                </div>
                                <div className="container text-center d-flex justify-content-center">
                                    <button type="button" onClick={()=>{navigate("/register")}} className="btn btn-success btn-lg">Create an account</button>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Login;