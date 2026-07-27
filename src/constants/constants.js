export const USER_ROLES = Object.freeze({
    USER: "user",
    ADMIN: "admin",
    COURIER: "courier"
})

export const PRODUCT_STATUS = Object.freeze({
    DRAFT: "draft",
    AVAILABLE: "available",
    OUT_OF_STOCK: "out_of_stock",
    DISCONTINUED: "discontinued",
    ARRIVING_SOON: "arriving_soon"
})

export const ORDER_STATUS = Object.freeze({
    PENDING: "pending",
    PAYMENT_VALIDATED: "payment_validated",
    PACKAGED: "packaged",
    DISPATCHED: "dispatched",
    CANCELLED: "cancelled"
})

export const ORDER_PRIORITY = Object.freeze({
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
})

export const DELIVERY_STATUS = Object.freeze({
    PENDING: "pending",
    ON_THE_WAY: "on_the_way",
    DELIVERED: "delivered",
    NOT_DELIVERED: "not_delivered",
})