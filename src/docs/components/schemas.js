const Schemas = {

    //* Health status

    HealthStatus: {
        type: "object",
        properties: {
            status: { type: "string", example: "OK" },
            payload: { type: "string", example: "Server ON" }
        }
    },

    //* Health logs

    LoggerStatus: {
        type: "object",
        properties: {
            status: { type: "string", example: "OK"},
            message: { type: "string", example: "Logger test completed."},
        }
    },

    //* User status

    GetAllUsersStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Users found"},
            payload: { type: "array", example: [
                {
                    id: "6a623904e8abf4852ef163a5",
                    first_name: "John",
                    last_name: "Doe",
                    email: "johndoe@hotmail.com",
                    role: "user"
                },
                {
                    id: "6a623904e8abf4852ef163a6",
                    first_name: "Jane",
                    last_name: "Dee",
                    email: "janedee@hotmail.com",
                    role: "courier"
                }
            ]}
        }
    },
    GetUserByIdStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "User found"},
            payload: { type: "object", example: {
                id: "6a623904e8abf4852ef163a5",
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@hotmail.com",
                role: "user"
            }}
        }
    },
    GetUserByRoleStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Users found with the role: courier"},
            payload: { type: "object", example: [
                    {
                        id: "6a623904e8abf4852ef163a5",
                        first_name: "John",
                        last_name: "Doe",
                        email: "johndoe@hotmail.com",
                        role: "courier"
                    },
                    {
                        id: "6a623904e8abf4852ef163a6",
                        first_name: "Jane",
                        last_name: "Dee",
                        email: "janedee@hotmail.com",
                        role: "courier"
                    } 
                ]  
            }    
        }
    },
    GetUserByEmailStatus: {
        type: "object",
        properties: {
            statusCode: {type: "number", example: 200},
            message: { type: "string", example: "User found"},
            payload: {type: "object", example: {
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@hotmail.com",
                password: "password1example",
                role: "user"
            }}
        }
    },
    CreateUserStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 201},
            message: { type: "string", example: "User created"},
            payload: { type: "object", example: {
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@hotmail.com",
                role: "user"
            }}
        }
    },
    UpdateUserStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "User updated"},
            payload: { type: "object", example: {
                first_name: "Jane",
                last_name: "Doe",
                email: "janedoe@hotmail.com",
                role: "user"
            }}
        }
    },
    DeletedUserStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "User deleted"},
            payload: { type: "object", example: {
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@hotmail.com",
                role: "user"
            }}
        }
    },

    //* Product status

    GetAllProductsStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Products found"},
            payload: { type: "array", example: [
                    {
                        title: "Reinforced cardboard box No. 3",
                        description: "Shipping box, up to 20 kg",
                        code: "BOX-003",
                        price: 850,
                        stock: 200,
                        category: "packaging",
                        status: "draft",
                        thumnails: ["box.png"]
                    },
                    {
                        title: "Standard wooden pallet",
                        description: "1x1.2m pallet for storage and transport",
                        code: "PALLET-01",
                        price: 6500,
                        stock: 30,
                        category: "logistics",
                        status: "draft",
                        thumbnails: []
                    }
                ]
            }
        }
    },
    CreateProductStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 201},
            message: { type: "string", example: "Product created"},
            payload: { type: "object", example: {
                title: "Reinforced cardboard box No. 3",
                description: "Shipping box, up to 20 kg",
                code: "BOX-003",
                price: 850,
                stock: 200,
                category: "packaging",
                status: "draft",
                thumbnails: ["box.png"]
            }}
        }
    },
    GetProductByIdStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Product found"},
            payload: { type: "object", example: {
                title: "Reinforced cardboard box No. 3",
                description: "Shipping box, up to 20 kg",
                code: "BOX-003",
                price: 850,
                stock: 200,
                category: "packaging",
                status: "draft",
                thumbnails: ["box.png"]
            }}
        }
    },
    UpdateProductStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Product updated"},
            payload: { type: "object", example: {
                title: "Reinforced cardboard box No. 3",
                description: "Shipping box, up to 20 kg",
                code: "BOX-003",
                price: 850,
                stock: 200,
                category: "packaging",
                status: "draft",
                thumbnails: ["box.png"]
            }}
        }
    },
    DeleteProductStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Product deleted"},
            payload: { type: "object", example: {
                title: "Reinforced cardboard box No. 3",
                description: "Shipping box, up to 20 kg",
                code: "BOX-003",
                price: 850,
                stock: 200,
                category: "packaging",
                status: "draft",
                thumbnails: ["box.png"]
            }}
        }
    },
    GetAvailableProductsStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Products found"},
            payload: { type: "array", example: [
                    {
                        title: "Reinforced cardboard box No. 3",
                        description: "Shipping box, up to 20 kg",
                        code: "BOX-003",
                        price: 850,
                        stock: 200,
                        category: "packaging",
                        status: "available",
                        thumnails: ["box.png"]
                    },
                    {
                        title: "Standard wooden pallet",
                        description: "1x1.2m pallet for storage and transport",
                        code: "PALLET-01",
                        price: 6500,
                        stock: 30,
                        category: "logistics",
                        status: "available",
                        thumbnails: []
                    }
                ]
            }
        }
    }
}

export default Schemas;