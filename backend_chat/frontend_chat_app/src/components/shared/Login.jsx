import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [,login] = useAuth();

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
      } = useForm();

    const navigate = useNavigate();

      const onSubmit = (data) => {
        console.log("==============>", data);
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        console.log(userInfo);

        axios.post("/api/user/login", userInfo, {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then((res) => {
            console.log("data======================>",res.data);
            if (res.data) {
                toast.success("Login successfully! You can now chat with your Friends.")
                localStorage.setItem("messanger", JSON.stringify(res.data)); 
                console.log("why it is happening",res.data?.user)
                login(res.data.user);

                console.log("why it is happening")
                navigate("/");
            }
            // else{

            // }

             
        }).catch((error) => {
            if (error.response) {
              toast.error("" + error.response.data.message);
            } else {
              console.error("Error:", error.message);
            }
          })
        
      }


    return (
       
        <div className="flex items-center justify-center h-screen w-full">
                {/* <div className=""> */}
                    <form onSubmit={handleSubmit(onSubmit)}className="p-3 px-5 border border-white rounded-md">
                    <h1 className="text-2xl text-blue-600">Messenger</h1>
                    <h2 className="text-xl">Create new <span className="text-blue-600 text-bold">Account</span></h2>


                    <div className="justify-between mt-3">
                        
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input  {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
  type="text" className="grow" placeholder="Email" />
                        </label>
                        {errors.email && <span>{errors.email.message}</span>}
                        <label className="input input-bordered flex items-center gap-2 my-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input  {...register("password", { required: "Password is required"})}  type="password" className="grow" placeholder="Password" />
                        </label>
                        {errors.password && <span>{errors.password.message}</span>}
              
                        <button className=" w-full btn btn-primary">Login</button>
                        {/* <button className="btn btn-ghost">Ghost</button>
*/}
                    </div>
                    <div className="flex justify-center items-center">
                        <div>Don&apos;t have any Account?</div><div><Link to={"/signup"} className="btn btn-link">Signup</Link></div>
                    </div>
                    </form>
                </div>
    )
}

export default Login