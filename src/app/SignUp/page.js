'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter()
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setname(e.target.value)
    }
    if (e.target.name === "email") {
      setemail(e.target.value)
    }
    if (e.target.name === 'password') {
      setpassword(e.target.value)
    }
  }

  const host = process.env.NEXT_PUBLIC_HOST || ''
  const signupUrl = host ? `${host.replace(/\/$/, '')}/api/signup` : '/api/signup'

  const handleClick = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch(signupUrl, {
      method: 'POST',
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    }).then((a) => a.json()).then((json) => {
      if (json.success == true && json.token) {
        toast.success("Sign Up Successfully");
        document.cookie = `token=${JSON.stringify(json['token'])};path=/`;
        router.push(`/`)
        router.refresh()
      }
      else {
        toast.error(json.error || "Unable To Sign Up");
      }
    }).catch(() => {
      toast.error("Unable To Sign Up");
    }).finally(() => {
      setIsSubmitting(false);
    })
  }

  return (
    <>
      <div className='flex items-center justify-center flex-col my-7'>
        <div className="upper-portion w-fit flex gap-6 justify-center items-center text-3xl">
          <div className="my-det">
            <h1>Sign Up To WestSide</h1>
          </div>
        </div>
        <div className="lower-portion my-5">
          <div className="buttons"></div>
          <div className="lower-right-portion">
            <h1 className='text-3xl my-3'>Sign Up</h1>
            <h1 className='text-xl my-2 '>Enter Your Name</h1>
            <form method="post" onSubmit={handleClick}>
              <input required={true} minLength={2} maxLength={23} value={name} onChange={handleChange} name='name' className='text-xl shadow-sm border-2 h-16 border-black rounded-sm px-3' type="text" placeholder='Enter Name' />
              <h1 className='text-xl my-2 '>Enter Email</h1>
              <input required={true} minLength={10} maxLength={53} value={email} name='email' onChange={handleChange} type='email' className='text-xl shadow-sm border-2 h-16 border-black rounded-sm px-3 bg-white' placeholder='Enter Email Address' />
              <h1 className='text-xl my-2 '>Enter password</h1>
              <input required={true} minLength={5} maxLength={23} value={password} name='password' onChange={handleChange} type='password' className='text-xl shadow-sm border-2 h-16 border-black rounded-sm px-3 bg-white' placeholder='Password Please' />
              <br />
              <button disabled={isSubmitting} type='submit' className='bg-black text-white px-2 py-2 hover:bg-white hover:text-black rounded-sm my-3 text-xl disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-white'>
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <h1 className='text-center'><Link href={'/Login'}><u>Want to Login</u></Link></h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
  
