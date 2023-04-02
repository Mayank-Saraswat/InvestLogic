const service = require("../services/calculator")
const { constantValues } = require("../constants/index")

const inputValidator = async (req, res) => {
    try {
        let { monthlyInvestment, investmentPeriod, rateOfReturn, rateOfInflation } = req.query

        monthlyInvestment = parseInt(monthlyInvestment)
        investmentPeriod = parseInt(investmentPeriod)
        rateOfReturn = parseFloat(rateOfReturn)
        rateOfInflation = parseFloat(rateOfInflation)

        if (monthlyInvestment < constantValues.MONTHLY_INVESTMENT_MIN || monthlyInvestment > constantValues.MONTHLY_INVESTMENT_MAX) {
            throw "Invalid amount of monthly investment"
        }
        else if (investmentPeriod < constantValues.INVESTMENT_PERIOD_MIN || investmentPeriod > constantValues.INVESTMENT_PERIOD_MAX) {
            throw "Invalid input of investment period"
        }
        else if (rateOfReturn < constantValues.RATE_OF_RETURN_MIN || rateOfReturn > constantValues.RATE_OF_RETURN_MAX) {
            throw "Invalid rate of return"
        }
        else if (rateOfInflation < constantValues.RATE_OF_INFLATION_MIN || rateOfInflation > constantValues.RATE_OF_INFLATION_MAX) {
            throw "Invalid rate of inflation"
        }
        
        const result = await service.calculateSip(req.query)
        res.send({
            status: 0,
            message: "Request Successful",
            result: result
        })
      
    }
    catch (error) {
        res.send({
            status: -1,
            result: error.message || error
        })
    }
}

module.exports = { inputValidator }