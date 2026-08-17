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
                    $ref: "#/components/GoodRqSchemas/HealthStatus"
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
                    $ref: "#/components/GoodRqSchemas/LoggerStatus"
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
                    $ref: "#/components/GoodRqSchemas/GetAllUsersStatus"
                }
            }
        }
    },
    GetUserByIdResponse: {
        description: "Response for get user by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetUserByIdStatus"
                }
            }
        }
    },
    GetUserByRoleResponse: {
        description: "Response for get users by role endpoint.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetUserByRoleStatus"
                }
            }
        }
    },
    GetUserByEmailResponse: {
        description: "Response for get user by email endpoint.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetUserByEmailStatus"
                }
            }
        }
    },
    CreateUserResponse: {
        description: "Response upon creating a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/CreateUserStatus"
                }
            }
        }
    },
    UpdateUserResponse: {
        description: "Response when updating a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/UpdateUserStatus"
                }
            }
        }
    },
    DeletedUserResponse: {
        description: "Response when deleting a user",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/DeletedUserStatus"
                }
            }
        }
    },

    //* Product endpoints responses

    GetAllProductsResponse: {
        description: "Response for get all users endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetAllProductsStatus"
                }
            }
        }
    },
    GetProductByIdResponse: {
        description: "Response for get product by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetProductByIdStatus"
                }
            }
        }
    },
    CreateProductResponse: {
        description: "Response upon creating a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/CreateProductStatus"
                }
            }
        }
    },
    UpdateProductResponse: {
        description: "Response when updating a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/UpdateProductStatus"
                }
            }
        }
    },
    DeleteProductResponse: {
        description: "Response when deleting a product",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/DeleteProductStatus"
                }
            }
        }
    },
    GetAvailableProductsResponse: {
        description: "Response for get available products endpoint. The response from this endpoint can also be empty; this does not indicate an error, but rather signifies that the request was made but no objects were found. This approach avoids confusing endpoint errors with empty results.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetAvailableProductsStatus"
                }
            }
        }
    },

    //* Order endpoints responses

    GetAllOrdersResponse: {
        description: "Response for get all orders endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetAllOrdersStatus"
                }
            }
        }
    },

    GetOrderByIdResponse: {
        description: "Response for get order by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetOrderByIdStatus"
                }
            }
        }
    },

    CreateOrderResponse: {
        description: "Response upon creating a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/CreateOrderStatus"
                }
            }
        }
    },


    UpdateOrderResponse: {
        description: "Response when updating a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/UpdateOrderStatus"
                }
            }
        }
    },

    DeleteOrderResponse: {
        description: "Response when deleting a order",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/DeleteOrderStatus"
                }
            }
        }
    },

    //* Delivery endpoints responses

    GetAllDeliveriesResponse: {
        description: "Response for get all deliveries endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetAllDeliveriesStatus"
                }
            }
        }
    },
    GetDeliveryByIdResponse: {
        description: "Response for get delivery by id endpoint",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GetDeliveryByIdStatus"
                }
            }
        }
    },
    CreateDeliveryResponse: {
        description: "Response upon creating a delivery",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/CreateDeliveryStatus"
                }
            }
        }
    },
    UpdateDeliveryResponse: {
        description: "Response when updating a delivery",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/UpdateDeliveryStatus"
                }
            }
        }
    },
    DeleteDeliveryResponse: {
        description: "Response when deleting a delivery",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/DeleteDeliveryStatus"
                }
            }
        }
    },

    //* Mock endpoints responses

    MockingDeliveriesResponse: {
        description: "Response when a delivery mock is generated",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/MockingDeliveriesStatus"
                }
            }
        }
    },

    GenerateDeliveriesResponse: {
        description: "Response when a delivery mock is generated and saved to the database.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GenerateDeliveriesStatus"
                }
            }
        }
    },

    MockingOrdersResponse: {
        description: "Response when a order mock is generated",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/MockingOrdersStatus"
                }
            }
        }
    },

    GenerateOrdersResponse: {
        description: "Response when a order mock is generated and saved to the database",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GenerateOrdersStatus"
                }
            }
        }
    },

    MockingUsersResponse: {
        description: "Response when a user mock is generated",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/MockingUsersStatus"
                }
            }
        }
    },
    
    GenerateUsersResponse: {
        description: "Response when a user mock is generated and saved to database",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/GoodRqSchemas/GenerateUsersStatus"
                }
            }
        }
    }
    
}

export const BadResponses = {
    NotFoundResponse: {
        description: "Response when a resource is not found",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/NotFoundStatus"
                }
            }
        }
    },
    InvalidIdResponse: {
        description: "Response when an ID search contains an invalid ID",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/InvalidIdStatus"
                }
            }
        }
    },
    DuplicateKeyResponse: {
        description: "Response when creating a resource with a duplicate value",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/DuplicateKeyStatus"
                }
            }
        }
    },
    BadRequestResponse: {
        description: "Response for a malformed request",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/BadRequestStatus"
                }
            }
        }
    },
    ValidationErrorResponse: {
        description: "Response when data contains invalid formats or violates validation rules.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/ValidationErrorStatus"
                }
            }
        }
    },
    UnauthorizedResponse: {
        description: "Response when the system does not know who you are and cannot assign permissions to you.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/UnauthorizedStatus"
                }
            }
        }
    },
    ForbiddenResponse: {
        description: "Response when the system grants and revokes certain permissions based on your role.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/ForbiddenStatus"
                }
            }
        }
    },
    ConflictResponse: {
        description: "Response when the request conflicts with the current state of the server or the resource.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/ConflictStatus"
                }
            }
        }
    },
    DatabaseConnectionErrorResponse: {
        description: "Response when a database connection error occurs",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/DatabaseConnectionErrorStatus"
                }
            }
        }
    },
    InvalidMockCountResponse: {
        description: "Response when the requested number of mocks is invalid",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/InvalidMockCountStatus"
                }
            }
        }
    },
    MockDataNotFoundResponse: {
        description: "Response when mocks cannot find the data required for mock generation within the database.",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/MockDataNotFoundStatus"
                }
            }
        }
    },
    InternalServerErrorResponse: {
        description: "Response when an unexpected error or an internal server error occurs",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/BadRqSchemas/InternalServerErrorStatus"
                }
            }
        }
    }
}