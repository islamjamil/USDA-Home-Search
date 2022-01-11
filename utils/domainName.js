var dev = process.env.NODE_ENV !== "production"
export var server = dev ? "http://localhost:3000" : "https://usda-homes.vercel.app"