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
    },

    //* Order status

    GetAllOrdersStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Orders found"},
            payload: { type: "array", example: [
                {
                    _id: "6a67d7e4209a976k2ldf3da1",
                    user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 2,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                        {
                            product: "6a67d61lmg9a976028df3d96",
                            quantity: 1,
                            _id: "6a67d7e4209a94g028df3fa5"
                        }
                    ],
                    total: 14900,
                    status: "payment_validated",
                    priority: "high",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"  
                },
                {
                    _id: "6a67d7e4209a976k2ldf3da1",
                    user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 2,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                        {
                            product: "6a67d61lmg9a976028df3d96",
                            quantity: 1,
                            _id: "6a67d7e4209a94g028df3fa5"
                        }
                    ],
                    total: 14900,
                    status: "pending",
                    priority: "low",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"  
                }
            ]}
        }
    },
    CreateOrderStatus:{
        type: "object",
        properties: {
            statusCode: { type: "number", example: 201},
            message: { type: "string", example: "Order created"},
            payload: { type: "object", example: {
                    user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 2,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                        {
                            product: "6a67d61lmg9a976028df3d96",
                            quantity: 1,
                            _id: "6a67d7e4209a94g028df3fa5"
                        }
                    ],
                    total: 14900,
                    status: "payment_validated",
                    priority: "high",
                    _id: "6a67d7e4209a976k2ldf3da1",
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z",
                    __v: 0
            }}
        }
    },
    GetOrderByIdStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Order found"},
            payload: { type: "object", example: {
                _id: "6a67d7e4209a976k2ldf3da1",
                user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 2,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                        {
                            product: "6a67d61lmg9a976028df3d96",
                            quantity: 1,
                            _id: "6a67d7e4209a94g028df3fa5"
                        }
                    ],
                    total: 14900,
                    status: "payment_validated",
                    priority: "high",
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z",
                    __v: 0
            }}
        }
    },

    UpdateOrderStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Order updated"},
            payload: { type: "object", example: {
                _id: "6a67d7e4209a976k2ldf3da1",
                user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 15,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                    ],
                    total: 63000,
                    status: "payment_validated",
                    priority: "high",
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z",
                    __v: 0
            }}
        }
    },

    DeleteOrderStatus: {
        type: "object",
        properties: {
           statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Order deleted"},
            payload: { type: "object", example: {
                _id: "6a67d7e4209a976k2ldf3da1",
                user: "6a67d75d200bk66028df3da0",
                    items: [
                        {
                            product: "6a67d62l0p9a976028df3d95",
                            quantity: 15,
                            _id: "6a67d7e4200pld6028df3da2"
                        },
                    ],
                    total: 63000,
                    status: "payment_validated",
                    priority: "high",
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z",
                    __v: 0
            }} 
        }
    },

    //* Delivery status

    GetAllDeliveriesStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Deliveries found"},
            payload: { type: "array", example: [
                {
                    _id: "6a67d8a1209a976028eg2dcd",
                    order: "6a67d7e42rg6976028df3da1",
                    status: "not_delivered",
                    address: "1276 Bogan Crossing Apt. 827",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"
                },
                {
                    _id: "6a67d8a1209a976028eg2dcd",
                    order: "6a67d7e42rg6976028df3da1",
                    status: "pending",
                    address: "62520 Eula View Suite 374",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"
                }
            ]}
        }
    },

    GetDeliveryByIdStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Delivery found"},
            payload: { type: "object", example: {
                    _id: "6a67d8a1209a976028eg2dcd",
                    order: "6a67d7e42rg6976028df3da1",
                    status: "not_delivered",
                    address: "1276 Bogan Crossing Apt. 827",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"
            }}
        }
    },

    CreateDeliveryStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 201},
            message: { type: "string", example: "Delivery created"},
            payload: { type: "object", example: {
                    order: "6a67d7e42rg6976028df3da1",
                    status: "not_delivered",
                    address: "1276 Bogan Crossing Apt. 827",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    _id: "6a67d8a1209a976028eg2dcd",
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z",
                    __v: 0,
            }}
        }
    },

    UpdateDeliveryStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Delivery updated"},
            payload: { type: "object", example: {
                    _id: "6a67d8a1209a976028eg2dcd",
                    order: "6a67d7e42rg6976028df3da1",
                    status: "not_delivered",
                    address: "1276 Bogan Crossing Apt. 827",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"
            }}
        }
    },

    DeleteDeliveryStatus: {
        type: "object",
        properties: {
            statusCode: { type: "number", example: 200},
            message: { type: "string", example: "Delivery deleted"},
            payload: { type: "object", example: {
                    _id: "6a67d8a1209a976028eg2dcd",
                    order: "6a67d7e42rg6976028df3da1",
                    status: "not_delivered",
                    address: "1276 Bogan Crossing Apt. 827",
                    estimatedFrom: "2027-01-01T00:00:00.000Z",
                    estimatedTo: "2027-01-07T00:00:00.000Z",
                    __v: 0,
                    createdAt: "2027-01-01T00:00:00.000Z",
                    updatedAt: "2027-01-01T00:00:00.000Z"
            }}
        }
    }
}

export default Schemas;