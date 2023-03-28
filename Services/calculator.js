async function calculate(obj) {
  try {
    const monthlyInvestment = Number(obj.monthlyInvestment)
    const investmentPeriod = Number(obj.investmentPeriod)
    const rate = (Number(obj.rateOfReturn) - Number(obj.rateOfInflation)) / 12
    const months = Number(obj.investmentPeriod) * 12;
    const totalMonthlyInvest = monthlyInvestment*investmentPeriod;
    let sipGrowthResult = 0;

    const graph = [{
      year: 0,
      investment: 0,
      value: 0,
    }]

    for (let i = 1; i <= months; i++) {
      sipGrowthResult += Number(obj.monthlyInvestment) * Math.pow(1 + rate / 100, i)
      if (i % 12 == 0) {
        const obj1 = {
          year: i / 12,
          investment: Number(obj.monthlyInvestment) * i,
          value: Math.round(sipGrowthResult)
        }
        graph.push(obj1)
      }
    }
    
    sipGrowthResult = sipGrowthResult.toFixed(0);
    const potentialCapitalGain = (obj.monthlyInvestment*obj.investmentPeriod);

    graphData = {
      graph,
      sipGrowthResult,
      monthlyInvestment,
      investmentPeriod,
      totalMonthlyInvest,
      potentialCapitalGain
    }
    return graphData;
  }
  catch (error) {
    return error.message;
  }
}

module.exports = { calculate };