const consoleLogs = ["Console shows:",
                "[ Date | Hour ] [debug]: Debug log",
                "[ Date | Hour ] [http]: HTTP log",
                "[ Date | Hour ] [info]: Info log",
                "[ Date | Hour ] [warn]: Warning log",
                "[ Date | Hour ] [error]: Error log",
                "[ Date | Hour ] [fatal]: Fatal log"]

export const GoodResponses = {

    //* Health check endpoint response

    HealthResponse: {
        description: "Response for health check endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/HealthStatus"
                }
            }
        }
    },

    //* Logger check endpoint

    LoggerResponse: {
        description: `Response for logs check. Console shows: \n
        [ Date | Hour ] [debug]: Debug log \n
        [ Date | Hour ] [http]: HTTP log \n
        [ Date | Hour ] [info]: Info log \n
        [ Date | Hour ] [warn]: Warning log \n
        [ Date | Hour ] [error]: Error log \n
        [ Date | Hour ] [fatal]: Fatal log `,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/LoggerStatus"
                }
            }
        }
    },

    //* User endpoints responses

    GetAllUsersResponse: {
        description: "Response for get users endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetAllUsersStatus"
                }
            }
        }
    },
    GetUserByIdResponse: {
        description: "Response for get user by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetUserByIdStatus"
                }
            }
        }
    },
    GetUserByRoleResponse: {
        description: "Response for get users by role endpoint.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetUserByRoleStatus"
                }
            }
        }
    },
    GetUserByEmailResponse: {
        description: "Response for get user by email endpoint.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetUserByEmailStatus"
                }
            }
        }
    },
    CreateUserResponse: {
        description: "Response upon creating a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/CreateUserStatus"
                }
            }
        }
    },
    UpdateUserResponse: {
        description: "Response when updating a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/UpdateUserStatus"
                }
            }
        }
    },
    DeletedUserResponse: {
        description: "Response when deleting a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/DeletedUserStatus"
                }
            }
        }
    },

    // Product endpoints responses

    GetAllProductsResponse: {
        description: "Response for get all users endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetAllProductsStatus"
                }
            }
        }
    },
    GetProductByIdResponse: {
        description: "Response for get product by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetProductByIdStatus"
                }
            }
        }
    },
    CreateProductResponse: {
        description: "Response upon creating a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/CreateProductStatus"
                }
            }
        }
    },
    UpdateProductResponse: {
        description: "Response when updating a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/UpdateProductStatus"
                }
            }
        }
    },
    DeleteProductResponse: {
        description: "Response when deleting a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/DeleteProductStatus"
                }
            }
        }
    },
    GetAvailableProductsResponse: {
        description: "Response for get available products endpoint. The response from this endpoint can also be empty; this does not indicate an error, but rather signifies that the request was made but no objects were found. This approach avoids confusing endpoint errors with empty results.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetAvailableProductsStatus"
                }
            }
        }
    },

    // Order endpoints responses

    GetAllOrdersResponse: {
        description: "Response for get all orders endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetAllOrdersStatus"
                }
            }
        }
    },

    CreateOrderResponse: {
        description: "Response upon creating a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/CreateOrderStatus"
                }
            }
        }
    },

    GetOrderByIdResponse: {
        description: "Response for get order by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/GetOrderByIdStatus"
                }
            }
        }
    },

    UpdateOrderResponse: {
        description: "Response when updating a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/UpdateOrderStatus"
                }
            }
        }
    },

    DeleteOrderResponse: {
        description: "Response when deleting a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/Schemas/DeleteOrderStatus"
                }
            }
        }
    }
}

export const BadResponses = {

}