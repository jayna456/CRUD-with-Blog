import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const callSignup = async (event) => {
        event.preventDefault();
        const dataToPass = {
            email,
            password,
            username
        };
        const response = await axios.post('http://localhost:3000/signup', dataToPass);
        if (response.data.code === 200) {
            localStorage.setItem('token',response.data.authToken);
            navigate('/single-blog', { state: { key: "add" } });
        }
    }

  return (
    <>
        <div className='container justify-content-center'>
            <form onSubmit={callSignup}>
                <div className='card'>
                    <div className='card-body'>
                        <h3>Sign Up</h3>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Enter Email</label>
                            <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput1" className="form-label">Enter username</label>
                            <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter username" required onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Enter password</label>
                            <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter Password" required minLength={5} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <p className='text-end'>Already have account? <Link to={'/'}>Sign In</Link></p>
                        </div>
                        <div className='mb-3 text-end'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default SignUp