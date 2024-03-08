import React, { useState } from 'react'
import Gender from './Gender'
import { Link } from 'react-router-dom'
import UseSingUp from '../../hooks/UseSingUp'

function Signup() {

    const [inputs,setinputs] = useState({
        fullname:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:'',
    })

    const {loading,signup} = UseSingUp()

    const handlecheckbox = (gender) =>{
        setinputs({...inputs,gender});
    }

    const handlesubmit = async (e) =>{
        e.preventDefault();
       //console.log(inputs);
       await signup(inputs)
    }



  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up
            <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handlesubmit}>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>full Name</span>
                </label>
                <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10' 
                       value={inputs.fullname}
                       onChange={(e)=> setinputs({...inputs,fullname:e.target.value})}
                />
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type='text' placeholder='username' className='w-full input input-bordered h-10' 
                       value={inputs.username}
                       onChange={(e)=> setinputs({...inputs,username:e.target.value})}
                />
            </div>
            <div>
                <label className='label'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' 
                       value={inputs.password}
                       onChange={(e)=> setinputs({...inputs,password:e.target.value})}
                />
            </div>
            <div>
                <label className='label'>
                    <span className='text-base label-text'>Confirm Password</span>
                </label>
                <input type='password' placeholder='Confirm password' className='w-full input input-bordered h-10' 
                       value={inputs.confirmPassword}
                       onChange={(e)=> setinputs({...inputs,confirmPassword:e.target.value})}
                />
            </div>

            <Gender oncheckbox={handlecheckbox} selectedGender = {inputs.gender}/>

            <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                Already have an account?
            </Link>

            <div>
                <button className='btn btn-block btn-sm mt-2'
                 disabled={loading}   
                >
                    {loading?<span className='loading loading-spinner'></span>:"Sign Up"}
                </button>
            </div>

        </form>
    </div>
      
  </div>
}

export default Signup
