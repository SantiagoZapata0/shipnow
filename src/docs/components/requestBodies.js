export const RequestBodies = {

    // User endpoints request bodies

    CreateUserRequest: {
        description: "Information required to create a user account",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["first_name", "last_name", "email", "password"],
                    properties: {
                        first_name: { type: "string", example: "John"},
                        last_name: { type: "string", example: "Doe"},
                        email: { type: "string", example: "johndoe@hotmail.com"},
                        password: { type: "string", example: "password1example"}
                    }
                }
            }
        }
    },
    UpdateUserRequest: {
        description: "Information required to update a user account. It can be one or several properties.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: { type: "string", example: "Jane"},
                        last_name: { type: "string", example: "Doe"},
                        email: { type: "string", example: "janedoe@hotmail.com"}
                    }
                }
            }
        }
    },

    // Product endpoints request bodies

    CreateProductRequest: {
        description: "Information required to create a product",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["title", "description", "code", "price", "stock", "category"],
                    properties: {
                        title: { type: "string", example: "Reinforced cardboard box No. 3"},
                        description: { type: "string", example: "Shipping box, up to 20 kg"},
                        code: { type: "string", example: "BOX-003"},
                        price: { type: "number", example: 850},
                        stock: { type: "number", example: 200},
                        category: { type: "string", example: "packaging"}
                    }
                }
            }
        }
    },
    UpdateProductRequest: {
        description: "Information required to update a product. It can be one or several properties.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string", example: "Reinforced cardboard box No. 3"},
                        description: { type: "string", example: "Shipping box, up to 20 kg"},
                        code: { type: "string", example: "BOX-003"},
                        price: { type: "number", example: 850},
                        stock: { type: "number", example: 200},
                        category: { type: "string", example: "packaging"}
                    }
                }
            }
        }
    },

    // Order endpoints request bodies

    CreateOrderRequest: {
        description: "Information required to create a product",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["user", "items", "status", "priority"],
                    properties: {
                        user: { type: "string", example: "6a67d75d200bk66028df3da0"},
                        items: { type: "array", example: [
                            {
                                product: "6a67d62l0p9a976028df3d95",
                                quantity: 2,
                            },
                            {
                                product: "6a67d61lmg9a976028df3d96",
                                quantity: 1,
                            }
                        ]},
                        status: { type: "string", example: "pending"},
                        priority: { type: "string", example: "medium"}
                    }
                }
            }
        }
    },
    UpdateOrderRequest: {
        description: "Information required to update a product. It can be one or several properties.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        user: { type: "string", example: "6a67d75d200bk66028df3da0"},
                        items: { type: "array", example: [
                            {
                                product: "6a67d62l0p9a976028df3d95",
                                quantity: 2,
                            },
                            {
                                product: "6a67d61lmg9a976028df3d96",
                                quantity: 1,
                            }
                        ]},
                        status: { type: "string", example: "pending"},
                        priority: { type: "string", example: "medium"}
                    }
                }
            }
        }
    }
}