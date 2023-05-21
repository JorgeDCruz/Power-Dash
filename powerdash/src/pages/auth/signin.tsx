import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/router';
// interface Props {}

//La vista del login
//Ahorita está muy fea, espero que los de front la pongan facha
const SignIn: NextPage = (props): JSX.Element => {
    const router = useRouter();
    //Creamos variables para obtener los datos del form
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    //Mandaremos los datos del form através de un handler
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        
        e.preventDefault();
        
        //Le mandamos los datos a la función
        const res = await signIn("credential-login", {
            email: userInfo.email,
            password: userInfo.password,
            //callbackUrl funciona para especificar a dónde se debe de dirigir una vez que se complete el login
            //En este caso específico será "localhost:3000"
            callbackUrl: `${window.location.origin}/` 
        });
    
        console.log(res);
    };

    return (
        <div className="sign-in-form">
            <form onSubmit={handleSubmit}>
                <h1>Login con IBM</h1>
                <input value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} type="email" placeholder="email@gmail.com"></input>
                <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder="********"></input>
                <input type="submit" value="login"></input>
            </form>
        </div>
    );
};

export default SignIn;