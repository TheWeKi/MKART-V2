import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


const schema = z.object({
    username: z.string().nonempty({message: 'Username is Required'}).min(3, {message: 'Username must contain 3 chars'}),
    email: z.string().email({message: "Enter a Valid Email"}).nonempty({message: 'Email is Required'}),
    password: z.string().nonempty({message: 'Password is required'}).min(6, {message: 'Password too short'}),
});

type FormData = z.infer<typeof schema>;


const SignUpForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Username</span>
                                {errors.username && <p className={"px-5"}>{errors.username.message}</p>}
                            </label>
                            <input {...register('username')} type="text" placeholder="username"
                                   className="input input-bordered"/>
                        </div>
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
                                {errors.password && <p className={"px-5"}>{errors.password.message}</p>}
                            </label>
                            <input {...register('password')} type="password" placeholder="password"
                                   className="input input-bordered"/>
                            {/*<label className="label">*/}
                            {/*    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>*/}
                            {/*</label>*/}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;