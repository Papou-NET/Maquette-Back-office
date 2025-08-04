import React, { useEffect, useRef, useState } from 'react';
import ImageLogin from "../assets/LoginImg.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../API/api';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const inputPassRef = useRef();
    const inputUserNameRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameLabel = () => {
        if (usernameRef.current.classList.contains("top-[15px]")) {
            usernameRef.current.classList.remove("top-[15px]");
            usernameRef.current.classList.add("top-[-8px]", "px-2");
            inputUserNameRef.current.focus();
        }
    };

    const passwordLabel = () => {
        if (passwordRef.current.classList.contains("top-[15px]")) {
            passwordRef.current.classList.remove("top-[15px]");
            passwordRef.current.classList.add("top-[-8px]", "px-2");
            inputPassRef.current.focus();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!usernameRef.current.contains(event.target) &&
                !inputUserNameRef.current.contains(event.target) &&
                username === "") {
                if (usernameRef.current.classList.contains("top-[-8px]")) {
                    usernameRef.current.classList.remove("top-[-8px]", "px-2");
                    usernameRef.current.classList.add("top-[15px]");
                }
            }

            if (!passwordRef.current.contains(event.target) &&
                !inputPassRef.current.contains(event.target) &&
                password === "") {
                if (passwordRef.current.classList.contains("top-[-8px]")) {
                    passwordRef.current.classList.remove("top-[-8px]", "px-2");
                    passwordRef.current.classList.add("top-[15px]");
                }
            }
        };

        if (username !== "") usernameLabel();
        if (password !== "") passwordLabel();

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [username, password]);

    const submitLogin = async (e) => {
        e.preventDefault();

        if (username === "" || password === "") {
            Swal.fire('Action annulé !', 'Information incomplète', 'warning')
        } else {
            await login(username, password)
                .then((res) => {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("admin", JSON.stringify(res.admin));
                    navigate("/dashboard");
                })
                .catch(() => {
                    Swal.fire('Action annulé !', 'Identifiants non cohérentes', 'warning')
                });
        }
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row gap-6 p-4 md:p-9">
            {/* Image */}
            <div className="w-full md:w-1/2 h-48 md:h-full rounded-xl overflow-hidden">
                <img src={ImageLogin} className="w-full h-full object-cover" />
            </div>

            {/* Formulaire */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-[30px]">
                <h2 className="mt-6 md:mt-[15%] mb-6 md:mb-[40px] text-center text-3xl md:text-5xl font-semibold">
                    Se connecter
                </h2>
                <form className="px-2 md:px-[10%]" onSubmit={submitLogin}>
                    <div className="relative">
                        <label
                            className="text-sm absolute top-[15px] left-5 cursor-text bg-white duration-400"
                            ref={usernameRef}
                            onClick={usernameLabel}
                        >
                            Nom utilisateur *
                        </label>
                        <input
                            type="text"
                            className="block w-full border-2 border-[#aa8362] rounded-lg outline-none text-md px-5 py-3"
                            ref={inputUserNameRef}
                            onClick={usernameLabel}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="relative mt-6">
                        <label
                            className="text-sm absolute top-[15px] left-5 cursor-text bg-white duration-400"
                            ref={passwordRef}
                            onClick={passwordLabel}
                        >
                            Mot de passe *
                        </label>
                        <input
                            type="password"
                            className="block w-full border-2 border-[#aa8362] rounded-lg outline-none text-md px-5 py-3"
                            ref={inputPassRef}
                            onClick={passwordLabel}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2 text-sm">
                        <div>
                            <input type="checkbox" className="mr-2" /> Se souvenir de moi
                        </div>
                        <div>
                            <Link className="hover:underline">Mot de passe oublié</Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-[#aa8362] w-full py-3 text-white font-semibold rounded-md cursor-pointer"
                    >
                        Se connecter
                    </button>

                    <div className="mt-6 md:mt-[15%] w-full flex justify-center">
                        <p className="w-[90%] md:w-[80%] text-xs md:text-sm text-center text-gray-400">
                            Lorem ipsum dolor sit amet consectetur. Eum neque, minima iusto beatae suscipit temporibus quos !
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
