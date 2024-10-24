import Chart from "../Chart/Chart";

function ExpenseChart (props) {

  const chartDataPoints = [
    {label: 'Jan', value: 0},
    {label: 'Feb', value: 0},
    {label: 'Mar', value: 0},
    {label: 'Apr', value: 0},
    {label: 'May', value: 0},
    {label: 'Jun', value: 0},
    {label: 'Jul', value: 0},
    {label: 'Aug', value: 0},
    {label: 'Sep', value: 0},
    {label: 'Oct', value: 0},
    {label: 'Nov', value: 0},
    {label: 'Dec', value: 0},
  ]

  for (const cashflow of props.items) {
    const cashflowMonth = cashflow.date._d.getMonth(); // starting at 0 => Jan = 0
    chartDataPoints[cashflowMonth].value += cashflow.nominal;
  }

  return (

    <Chart dataPoints={chartDataPoints}/>
  )

}

export default ExpenseChart