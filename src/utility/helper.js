const showConsoleLog = (data) => {
  if (process.env.environment !== "production") {
    console.log(data);
  }
};

module.exports={
    showConsoleLog,
    
}