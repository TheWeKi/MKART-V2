const CreateProductForm = () => {
    return (
        <div className="flex justify-center">
            <div className="card max-w-screen-md w-full shadow-3xl bg-base-100">
                <div className="card-body card-bordered border-base-300 rounded-box">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Title</span>
                        </label>
                        <input type="text" placeholder="title" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Company</span>
                        </label>
                        <input type="text" placeholder="company" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Category</span>
                        </label>
                        <input type="text" placeholder="category" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Price</span>
                        </label>
                        <input type="number" placeholder="price" className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="description"></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-outline">Create Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProductForm;