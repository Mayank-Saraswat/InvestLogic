const { constantValues } = require("../constants/index")

const calculateSip = async ({monthlyInvestment, investmentPeriod, rateOfInflation, rateOfReturn}) => {
  try {
    monthlyInvestment = Number(monthlyInvestment)
    investmentPeriod = Number(investmentPeriod)
    rate = (Number(rateOfReturn) - Number(rateOfInflation)) / constantValues.MONTHS_IN_A_YEAR
    const months = investmentPeriod * constantValues.MONTHS_IN_A_YEAR
    const totalMonthlyInvest = monthlyInvestment*investmentPeriod*constantValues.MONTHS_IN_A_YEAR
    let sipGrowthResultFinal = 0, sipGrowthResult=0

    //For initialising graph lines from origin, default values are passed in graph array
    const graph = [
      {
        year:0,
        investment:0,
        sipGrowth:0
      }
    ]

    for (let i = 1; i <= months; i++) {
      sipGrowthResult += monthlyInvestment * Math.pow(1 + rate / 100, i)
      if (i % constantValues.MONTHS_IN_A_YEAR == 0) {
        graph.push(
          {
            year: i / constantValues.MONTHS_IN_A_YEAR,
            investment: monthlyInvestment * i,
            sipGrowth: Math.round(sipGrowthResult)
          }  
        )
      }
    }
    
    sipGrowthResultFinal = sipGrowthResult.toFixed(0)
    const potentialCapitalGain = sipGrowthResultFinal-totalMonthlyInvest

    const graphData = {
      graph,
      sipGrowthResultFinal,
      monthlyInvestment,
      investmentPeriod,
      totalMonthlyInvest,
      potentialCapitalGain
    }
    return graphData
  }
  catch (error) {
    throw error.message || error
  }
}

module.exports = { calculateSip }