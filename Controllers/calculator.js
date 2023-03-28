const service = require("../Services/calculator");
const {
    MONTHLYINVESTMENTMIN,
    MONTHLYINVESTMENTMAX,
    INVESTMENTPERIODMIN,
    INVESTMENTPERIODMAX,
    RATEOFRETURNMIN,
    RATEOFRETURNMAX,
    RATEOFINFLATIONMIN,
    RATEOFINFLATIONMAX
} = require("../Constants/index");

const badRequest = {
    status: -1,
    message: "Something is not good",
    result: "Invalid data entered"
}; 

const validator = async (req, res) => {

    try {
        const object = req.query;
        if (parseInt(object.monthlyInvestment) < MONTHLYINVESTMENTMIN || parseInt(object.monthlyInvestment) > MONTHLYINVESTMENTMAX) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.investmentPeriod) < INVESTMENTPERIODMIN || parseInt(object.investmentPeriod) > INVESTMENTPERIODMAX) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.rateOfReturn) < RATEOFRETURNMIN || parseInt(object.rateOfReturn) > RATEOFRETURNMAX) {
            return new Error("Invalid input");
        }
    
        if (parseInt(object.rateOfInflation) < RATEOFINFLATIONMIN || parseInt(object.rateOfInflation) > RATEOFINFLATIONMAX) {
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