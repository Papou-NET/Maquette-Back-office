import React, { useEffect, useRef, useState } from 'react';
import ImageLogin from "../assets/LoginImg.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../API/api';

const Login = () => {

    const navigate = useNavigate()

    const usernameRef = useRef()
    const passwordRef = useRef()
    const inputPassRef = useRef()
    const inputUserNameRef = useRef()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameLabel = () => {
        if(usernameRef.current.classList.contains("top-[15px]")) {
            usernameRef.current.classList.remove("top-[15px]")
            usernameRef.current.classList.add("top-[-8px]")
            usernameRef.current.classList.add("px-2")
            inputUserNameRef.current.focus()
        } 
    }

    const passwordLabel = () => {
        if(passwordRef.current.classList.contains("top-[15px]")) {
            passwordRef.current.classList.remove("top-[15px]")
            passwordRef.current.classList.add("top-[-8px]")
            passwordRef.current.classList.add("px-2")
            inputPassRef.current.focus()
        } 
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

            if( !usernameRef.current.contains(event.target)  &&
                !inputUserNameRef.current.contains(event.target) && username === ""){
                if(usernameRef.current.classList.contains("top-[-8px]")){
                    usernameRef.current.classList.remove("top-[-8px]")
                    usernameRef.current.classList.add("top-[15px]")
                    usernameRef.current.classList.remove("px-2")
                }
            }

            if(!passwordRef.current.contains(event.target)  &&
                !inputPassRef.current.contains(event.target) && password === ""){
                if(passwordRef.current.classList.contains("top-[-8px]")){
                    passwordRef.current.classList.remove("top-[-8px]")
                    passwordRef.current.classList.add("top-[15px]")
                    passwordRef.current.classList.remove("px-2")
                }
            }
        };

        if(username !== "") {
            usernameLabel()
        }
        if(password !=="" ) {
            passwordLabel()
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [username, password]);


    const submitLogin = async (e) => {
        e.preventDefault()

       if(username === "" || password === ""){
            alert("Information incomplète")
       }
       else {
            await login(username, password)
            .then(res => {
                console.log(res.admin);
                localStorage.setItem("token", res.token)
                localStorage.setItem("admin",JSON.stringify( res.admin))
                navigate("/dashboard")
            })
            .catch(err => {
                alert("Information incorrect")
            })
       }

    }

    return (
        <div className='w-full h-[100vh] p-9 flex gap-10'>
            <div className='w-[50%] h-full rounded-xl overflow-hidden'>
                <img src={ImageLogin} className='w-full h-full object-cover'/>
            </div>
            <div className='w-[50%] px-[30px]' onSubmit={submitLogin}>
                <h2 className='mt-[15%] mb-[40px] text-center text-5xl font-semibold'>Se connecter</h2>
                <form className='px-[10%]'>
                    <div className='relative'>
                        <label className='text-sm absolute top-[15px] left-5 cursor-text
                        bg-white duration-400' ref={usernameRef} onClick={usernameLabel}>Nom utilisateur *</label>
                        <input type="text" className='block w-full border-2 border-[#aa8362] rounded-lg
                        outline-none text-md px-5 py-3' ref={inputUserNameRef} onClick={usernameLabel} value={username} onChange={e=>setUsername(
                            e.target.value
                        )}/>
                    </div>
                    <div className='relative mt-[30px]'>
                        <label className='text-sm absolute top-[15px] left-5 cursor-text
                        bg-white duration-400' ref={passwordRef} onClick={passwordLabel}>Mot de passe *</label>
                        <input type="password"  className='block w-full border-2 border-[#aa8362] rounded-lg
                        outline-none text-md px-5 py-3' ref={inputPassRef} onClick={passwordLabel} value={password} onChange={e=>setPassword(
                            e.target.value
                        )}/>
                    </div>
                    <div className='mt-4 flex justify-between'>
                        <div><input type="checkbox" className='mr-2' /> Se souvenir de moi</div>
                        <div><Link className='hover:underline'>Mot de passe oublié</Link></div>
                    </div>
                    <button type="submit" className='mt-[30px] bg-[#aa8362] w-full py-3 text-white font-semibold
                    rounded-md cursor-pointer'>Se connecter</button>
                   <div className='mt-[15%] w-full flex justify-center'>
                    <p className='text w-[80%] text-sm text-center text-gray-400'>Lorem ipsum dolor sit amet consectetur. Eum neque,
                     minima iusto beatae suscipit temporibus quos !</p>
                   </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
