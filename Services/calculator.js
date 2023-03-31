const { constants } = require("../Constants/index")

const calculateSip = async ({monthlyInvestment, investmentPeriod, rateOfInflation, rateOfReturn}) => {
  try {
    monthlyInvestment = Number(monthlyInvestment)
    investmentPeriod = Number(investmentPeriod)
    rate = (Number(rateOfReturn) - Number(rateOfInflation)) / constants.MONTHSINAYEAR
    const months = investmentPeriod * constants.MONTHSINAYEAR;
    const totalMonthlyInvest = monthlyInvestment*investmentPeriod*constants.MONTHSINAYEAR;
    let sipGrowthResultFinal = 0, sipGrowthResult=0;

    //For initialising graph lines from origin, default values are passed in graph array
    const graph = [
      {
        year:0,
        investment:0,
        sipGrowth:0
      }
    ];

    for (let i = 1; i <= months; i++) {
      sipGrowthResult += monthlyInvestment * Math.pow(1 + rate / 100, i)
      if (i % constants.MONTHSINAYEAR == 0) {
        const obj1 = {
          year: i / constants.MONTHSINAYEAR,
          investment: monthlyInvestment * i,
          sipGrowth: Math.round(sipGrowthResult)
        }
        graph.push(obj1)
      }
    }
    
    sipGrowthResultFinal = sipGrowthResult.toFixed(0);
    const potentialCapitalGain = sipGrowthResultFinal-totalMonthlyInvest;

    const graphData = {
      graph,
      sipGrowthResultFinal,
      monthlyInvestment,
      investmentPeriod,
      totalMonthlyInvest,
      potentialCapitalGain
    }
    return graphData;
  }
  catch (error) {
    throw error.message;  
  }
}

module.exports = { calculateSip };