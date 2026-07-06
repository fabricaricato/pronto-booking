import { config } from "dotenv"
import { connect } from "mongoose"

config()

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("❌ Error: The URI_DB variable is missing in the .env")
}

const connectDb = async () => {
  try {
    await connect(MONGODB_URI)
    console.log("🟢 CONNECTED SUCCESSFULLY 🟢")
  } catch (error) {
    const err = error as Error
    console.log(`🔴 FAILED TO CONNECT DATABASE 🔴 MESSAGE: ${err.message}`)
  }
}

export {connectDb}