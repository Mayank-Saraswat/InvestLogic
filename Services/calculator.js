async function calculate(props) {
  try {
    const monthlyInvestment = Number(props.monthlyInvestment)
    const investmentPeriod = Number(props.investmentPeriod)
    const rate = (Number(props.rateOfReturn) - Number(props.rateOfInflation)) / 12
    const months = Number(props.investmentPeriod) * 12;
    const totalMonthlyInvest = monthlyInvestment*investmentPeriod;
    let sipGrowthResult = 0;

    const graph = [{
      year: 0,
      investment: 0,
      value: 0,
    }]
    for (let i = 1; i <= months; i++) {
      sipGrowthResult += Number(props.monthlyInvestment) * Math.pow(1 + rate / 100, i)
      if (i % 12 == 0) {
        const obj = {
          year: i / 12,
          investment: Number(props.monthlyInvestment) * i,
          value: Math.round(sipGrowthResult)
        }
        graph.push(obj)
      }
    }
    sipGrowthResult = sipGrowthResult.toFixed(0);
    const potentialCapitalGain = (props.monthlyInvestment*props.investmentPeriod);


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
    res.send(error);
  }
}

module.exports = { calculate };