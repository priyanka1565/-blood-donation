 const testControllers = (req, res) => {
    res.status(200).send({
      messege: "test Route",
      sucess: true,
    });
    
}
module.exports = { testControllers };