import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;



export async function connectToMongoDB() {
    if(cachedConnection) {
        console.log("using cached db connection");
        return cachedConnection;
    }

    try {
        const cnx = await mongoose.connect(process.env.MONGO_URL!);
        cachedConnection = cnx.connection;
        console.log("new mongodb connection cached");
        return cachedConnection;
    } catch (error) {
        console.log(error);
        throw error;
    }
}