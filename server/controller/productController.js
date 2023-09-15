const products = [
    {
        "id": "1",
        "status": "good",
    },
    {
        "id": "2",
        "status": "better",
    },
    {
        "id": "3",
        "status": "best",
    },
]

const getProducts = (req, res) => {
    res.json(products)
}

const getProductById = (req, res) => {
    const {id} = req.params
    const product = products.find(product => product.id === id)
    res.json(product)
}

const addProduct = (req, res) => {
    const product = req.body
    products.push(product)
    res
        .status(201)
        .json(product)
}

export {getProducts, getProductById, addProduct}