import { useState } from "react";
import toast from "react-hot-toast";


const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const signupApi = async ({fullName, username, email, password, gender}) => {
        if(!fullName || !username || !email || !password || !gender){
            toast.error("All fields are required")
            return;
        }
        if(!regex.test(password)){
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number and minimum 8 characters");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({fullName, username, email, password, gender})

            })
            const data = await res.json();
            if(res.ok === false){
                toast.error(await data.message)

            }
            toast.success(data.message);
            localStorage.setItem("baatcheet", JSON.stringify(data))
        } catch (error) {
            toast.error(error);
        }
        finally{
            setLoading(false);
        }
    }
    
    return {signupApi, loading}
}

export default useSignup;