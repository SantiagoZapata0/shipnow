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
        description: "At least one field must be sent. Use application/json for profile-only updates. To upload a document, use multipart/form-data and send documents together with documentType.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: { type: "string", example: "Jane"},
                        last_name: { type: "string", example: "Doe"},
                        email: { type: "string", format: "email", example: "janedoe@hotmail.com"},
                        role: { type: "string", enum: ["user", "admin", "courier"], example: "courier"}
                    }
                }
            },
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: { type: "string", example: "Jane"},
                        last_name: { type: "string", example: "Doe"},
                        email: { type: "string", format: "email", example: "janedoe@hotmail.com"},
                        role: { type: "string", enum: ["user", "admin", "courier"], example: "courier"},
                        documentType: {
                            type: "string",
                            enum: ["id_document", "profile_photo", "courier_license"],
                            example: "courier_license",
                            description: "Required when documents is attached. courier_license is accepted only when the effective user role is courier."
                        },
                        documents: {
                            type: "string",
                            format: "binary",
                            description: "Optional single file. Accepted formats: PNG, JPEG and PDF. Maximum size: 5 MB. The user can keep a maximum of 3 documents and the original filename cannot be repeated."
                        }
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
        description: "At least one field must be sent. Use application/json for an items update. To upload a payment receipt, use multipart/form-data and send documents together with documentType.",
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
                        status: { type: "string", enum: ["pending", "payment_validated", "packaged", "dispatched", "cancelled"], example: "pending"},
                        priority: { type: "string", enum: ["low", "medium", "high"], example: "medium"}
                    }
                }
            },
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        user: { type: "string", description: "Existing user ID.", example: "66f1a4c92f8a7d5b4c3e2101"},
                        status: { type: "string", enum: ["pending", "payment_validated", "packaged", "dispatched", "cancelled"], example: "payment_validated"},
                        priority: { type: "string", enum: ["low", "medium", "high"], example: "high"},
                        documentType: {
                            type: "string",
                            enum: ["payment_receipt"],
                            example: "payment_receipt",
                            description: "Required when documents is attached. Orders only accept payment_receipt."
                        },
                        documents: {
                            type: "string",
                            format: "binary",
                            description: "Optional single file. Accepted formats: PNG, JPEG and PDF. Maximum size: 5 MB. The order can keep a maximum of 3 documents and the original filename cannot be repeated."
                        }
                    }
                }
            }
        }
    },

    // Order endpoints request bodies

    CreateDeliveryRequest: {
        description: "Information required to create a delivery. The STATUS and COURIER fields are not mandatory, so deliveries can be picked up at the branch. Additionally, if no STATUS is specified, it will default to PENDING.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["order", "address", "estimatedFrom, estimatedTo"],
                    properties: {
                        order: { type: "string", example: "6a67d8a1209a976028eg2dcd"},
                        status: { type: "string", example: "pending"},
                        courier: { type: "string", example: "6a67d8a1209a976028eg2d3a"},
                        address: { type: "string", example: "1275 Bogan Crossing Apt. 825"},
                        estimatedFrom: { type: "string", example: "2027-01-01T00:00:00.000Z"},
                        estimatedTo: { type: "string", example: "2027-01-07T00:00:00.000Z"}
                    }
                }
            }
        }
    },

    UpdateDeliveryRequest: {
        description: "Information required to update a delivery. It can be one or several properties.",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        order: { type: "string", example: "6a67d8a1209a976028eg2dcd"},
                        status: { type: "string", example: "pending"},
                        courier: { type: "string", example: "6a67d8a1209a976028eg2d3a"},
                        address: { type: "string", example: "1275 Bogan Crossing Apt. 825"},
                        estimatedFrom: { type: "string", example: "2027-01-01T00:00:00.000Z"},
                        estimatedTo: { type: "string", example: "2027-01-07T00:00:00.000Z"}
                    }
                }
            }
        }
    },

    // Mocks endpoints request body

    SaveToDbAndCountRequest: {
        description: "Information required to generate a mocks. The option to save to database is not necessarily true.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        count: { type: "number", example: 1},
                        saveToDatabase: { type: "boolean", example: true}
                    }
                }
            }
        }
    }
}
