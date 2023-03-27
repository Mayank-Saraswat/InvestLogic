const service = require("../Services/calculator")


const validate = (props) => {

    if (props.monthlyInvestment < 1000 || props.monthlyInvestment > 10000000) {
        return false;
    }

    if (props.investmentPeriod < 1 || props.investmentPeriod > 30) {
        return false;
    }

    if (props.rateOfReturn < 1 || props.rateOfReturn > 30) {
        return false;
    }

    if (props.rateOfInflation < 0 || props.rateOfInflation > 30) {
        return false;
    }
    return true;
};

const badRequest = {
    status: -1,
    message: "Something is not good",
    result: "Invalid data entered"
}; 

const validator = async (req, res) => {

    try {
        
        if (validate(req.query) === false) {
            res.send(badRequest);
            return;
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