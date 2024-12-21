export default {
    database: {
      mongodb: {
        host: 'localhost',
        port: 27017,
        db: "pay_spaze",
      },
    },
    jwt: {
      secreet_key:process.env.JWT_SECRET_KEY || "dfgfdgdfg_TNF@2024_dfgdfdf"
    }
  };