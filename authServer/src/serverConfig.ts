import dotEnv from 'dotenv'

dotEnv.config()

export const serverConfig = () => {
    return {
        name: "DocHub ",
        port : process.env.PORT || 8080,
        baseUrl : '/auth',
        db:{
            url : process.env.MONGODB_URL
        },

    }
}