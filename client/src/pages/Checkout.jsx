import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {baseUrl} from "../axios/baseUrl";
import {useNavigate} from "react-router-dom";

const schema = z.object({
    houseNumber: z.string().min(1, "House number is required"),
    mobileNumber: z.string().length(10, {message: "Mobile number must be 10 digits"}),
    town: z.string().min(1, "Town is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(5, "Zipcode Invalid"),
});

const Checkout = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const deliveryAddress = `House Number: ${data.houseNumber},Town: ${data.town},City: ${data.city},State: ${data.state}(${data.zipcode})- Mobile Number: ${data.mobileNumber}`;
            await baseUrl.post('/orders', {
                deliveryAddress: deliveryAddress,
            }, {
                headers: {
                    Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
                }
            });
            return navigate('/orders');

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="flex justify-center align-middle">
            <div className="card max-w-xl w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">House Number</span>
                                {errors.houseNumber && <p className={"px-5"}>{errors.houseNumber.message}</p>}
                            </label>
                            <input {...register('houseNumber')} type="text" placeholder="House Number"
                                   className="input input-bordered"/>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Town</span>
                                {errors.town && <p className={"px-5"}>{errors.town.message}</p>}
                            </label>
                            <input {...register('town')} type="text" placeholder="Town"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">City</span>
                                {errors.city && <p className={"px-5"}>{errors.city.message}</p>}
                            </label>
                            <input {...register('city')} type="text" placeholder="City"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">State</span>
                                {errors.state && <p className={"px-5"}>{errors.state.message}</p>}
                            </label>
                            <input {...register('state')} type="text" placeholder="State"
                                   className="input input-bordered"/>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Zipcode</span>
                                {errors.zipcode && <p className={"px-5"}>{errors.zipcode.message}</p>}
                            </label>
                            <input {...register('zipcode')} type="text" placeholder="Zipcode"
                                   className="input input-bordered"/>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Mobile Number</span>
                                {errors.mobileNumber && <p className={"px-5"}>{errors.mobileNumber.message}</p>}
                            </label>
                            <input {...register('mobileNumber')} type="text" placeholder="Mobile Number"
                                   className="input input-bordered"/>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline">Checkout</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Checkout;