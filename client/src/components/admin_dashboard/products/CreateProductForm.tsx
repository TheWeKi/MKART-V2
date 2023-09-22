import z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useState } from 'react';
//ValidationSchema
const schema = z.object({
    title: z.string().nonempty({message: 'Title is required'}),
    company: z.string().nonempty({message: 'Company is required'}),
    category: z.string().nonempty({message: 'Category is required'}),
    price: z.number().min(0, {message: 'Price should be greater than 0'}),
    description: z.string().nonempty({message: 'Description is required'}),
    image: z.instanceof(FileList).refine(file => file[0].type.startsWith('image'), {message: 'Only Image Is Accepted'}),
});

type FormData = z.infer<typeof schema>;

const CreateProductForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center">
            <div className="card max-w-screen-md w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Title</span>
                                {errors.title && <p className={"px-5 "}>{errors.title.message}</p>}
                            </label>
                            <input {...register('title')} type="text" placeholder="title"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Company</span>
                                {errors.company && <p className={"px-5"}>{errors.company.message}</p>}
                            </label>
                            <input {...register('company')} type="text" placeholder="company"
                                   className="input input-bordered"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Category</span>
                                {errors.category && <p className={"px-5"}>{errors.category.message}</p>}
                            </label>
                            <input {...register('category')} type="text" placeholder="category"
                                   className="input input-bordered"/>

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Price</span>
                                {errors.price && <p className={"px-5"}>{errors.price.message}</p>}
                            </label>
                            <input {...register('price', {setValueAs: value => parseFloat(value)})} type="number"
                                   placeholder="price" className="input input-bordered"/>

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Image</span>
                                {errors.image && <p className={"px-5"}>{errors.image.message}</p>}
                            </label>
                            <input {...register('image')} type="file" className="file-input file-input-bordered"/>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Description</span>
                                {errors.description && <p className={"px-5"}>{errors.description.message}</p>}
                            </label>
                            <textarea {...register('description')} className="textarea textarea-bordered"
                                      placeholder="description"></textarea>

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline" type={"submit"}>Create Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProductForm;