const service = require("../Services/calculator")

const badRequest = {
    status: -1,
    message: "Something is not good",
    result: "Invalid data entered"
}; 

const validator = async (req, res) => {

    try {
        if (parseInt(object.monthlyInvestment) < 1000 || parseInt(object.monthlyInvestment) > 10000000) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.investmentPeriod) < 1 || parseInt(object.investmentPeriod) > 30) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.rateOfReturn) < 1 || parseInt(object.rateOfReturn) > 30) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.rateOfInflation) < 0 || parseInt(object.rateOfInflation) > 30) {
            return new Error("Invalid input");
        }
    
        const result = await service.calculate(req.query);
        res.send({
            status: 0,
            message: "Request Successful",
            fresult: result
        });
    }
    catch (error) {
        res.send({
            status: -1,
            fresult: error.message
        })
    }
}

module.exports = { validator };