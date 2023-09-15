const Filter = () => {
    return (
        <>
            <div className="navbar bg-base-100 px-4 lg:px-12">

                <div className="navbar-start">
                    <p className="text-2xl font-semibold"> New Arrivals </p>
                </div>


                <div className="navbar-end gap-4">

                    {/* Sort */}

                    <div className="form-control">
                        <select className="select select-bordered select-md w-full max-w-lg">
                            <option disabled selected hidden value="sort">Sort</option>
                            <option value="price1">Price Low To High</option>
                            <option value="price0">Price High To Low</option>
                            <option value="popularity1">Popularity Low To High</option>
                            <option value="popularity0">Popularity High To Low</option>
                        </select>
                    </div>

                    {/* Filter */}

                    <div className="drawer-end">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="drawer-button btn btn-ghost btn-circle">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}
                                     viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/>
                                </svg>
                            </label>

                        </div>

                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-100">
                                <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Filter