const service = require("../Services/calculator")
const { constants } = require("../Constants/index")

const inputValidator = async (req, res) => {
    try {
        let { monthlyInvestment, investmentPeriod, rateOfReturn, rateOfInflation } = req.query

        monthlyInvestment = parseInt(monthlyInvestment)
        investmentPeriod = parseInt(investmentPeriod)
        rateOfReturn = parseFloat(rateOfReturn)
        rateOfInflation=parseFloat(rateOfInflation)

        if (monthlyInvestment < constants.MONTHLYINVESTMENTMIN || monthlyInvestment > constants.MONTHLYINVESTMENTMAX) {
            throw "Invalid amount of monthly investment"
        }
        else if (investmentPeriod < constants.INVESTMENTPERIODMIN || investmentPeriod > constants.INVESTMENTPERIODMAX) {
            throw "Invalid input of investment period"
        }
        else if (rateOfReturn < constants.RATEOFRETURNMIN || rateOfReturn > constants.RATEOFRETURNMAX) {
            throw "Invalid rate of return"
        }
        else if (rateOfInflation < constants.RATEOFINFLATIONMIN || rateOfInflation > constants.RATEOFINFLATIONMAX) {
            throw "Invalid rate of inflation"
        }
        else {
        const result = await service.calculateSip(req.query)
        res.send({
            status: 0,
            message: "Request Successful",
            fresult: result
        })
      }
    }
    catch (error) {
        res.send({
            status: -1,
            fresult: error.message
        })
    }
}

module.exports = { inputValidator }