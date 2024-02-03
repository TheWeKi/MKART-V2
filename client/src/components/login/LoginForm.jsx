import {z} from "zod";
import {set, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {baseUrl} from "../../axios/baseUrl.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/features/authSlice.js";

const schema = z.object({
    email: z.string().email({message: "Enter a Valid Email"}).nonempty({message: 'Email is Required'}),
    password: z.string().nonempty({message: 'Password is required'}).min(6, {message: 'Password is too short [min 6 chars]'}),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const [invalid, setInvalid] = useState(false);

    const onSubmit = async (data) => {
        try {
            const res = await baseUrl.post('/login', data);
            const token = res.data.token;
            const user = res.data.user;
            document.cookie = `token=${token}`;
            // baseUrl.interceptors.request.use((config) => {
            //     config.headers.Authorization = `Bearer ${token}`;
            //     return config;
            // });

            dispatch(login());

            if (user.roleAdmin) {
                return navigate('/admin-dashboard/products');
            }
            navigate('/products');
        } catch (e) {
            setInvalid(true);
        }
    };

    return (
        <>
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    {invalid && <p className={"text-red-500"}>Invalid Credentials</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                                {errors.email && <p className={"px-5"}>{errors.email.message}</p>}
                            </label>
                            <input {...register('email')} type="email" placeholder="email"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                                {errors.password && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                   className="input input-bordered"/>
                            {/*<label className="label">*/}
                            {/*    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>*/}
                            {/*</label>*/}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;