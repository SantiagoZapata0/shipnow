const Parameters = {
    UidPathParam: {
        name: "uid",
        in: "path",
        required: true,
        description: "Unique user ID",
        schema: {
                type: "string"
        } 
    },
    PidPathParam: {
        name: "pid",
        in: "path",
        required: true,
        description: "Unique product ID",
        schema: {
                type: "string"
        } 
    },
    OidPathParam: {
        name: "oid",
        in: "path",
        required: true,
        description: "Unique order ID",
        schema: {
                type: "string"
        } 
    },
    DidPathParam: {
        name: "did",
        in: "path",
        required: true,
        description: "Unique delivery ID",
        schema: {
                type: "string"
        } 
    },
    RoleQueryParam: {
        name: "role",
        in: "query",
        required: true,
        description: "An role of user [admin, courier, user]",
        schema: {
            type: "string"
        } 
    },
    EmailQueryParam: {
        name: "email",
        in: "query",
        required: true,
        description: "An email of user",
        schema: {
            type: "string"
        }
    },
    CountQueryParam:{
        name: "count",
        in: "query",
        required: true,
        description: "Number of desired orders",
        schema:{
            type: "number"
        }
    }
}

export default Parameters;