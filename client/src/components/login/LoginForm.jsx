import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "../../axios/baseUrl.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice.js";

const schema = z.object({
    email: z.string().email("Enter a Valid Email").min(1, 'Email is required'),
    password: z.string().min(1, "Password is required").min(6, 'Password is too short [min 6 chars]'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [invalid, setInvalid] = useState(false);

    const onSubmit = async (data) => {
        try {
            const res = await baseUrl.post('/login', data);
            const user = res.data.user;

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
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                                {errors.password && <p className={"px-5 "}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                className="input input-bordered" />
                            <label className="label">
                                <p className="label-text-alt link link-hover" onClick={() => navigate('/reset')}>Forgot
                                    password?</p>
                            </label>
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
