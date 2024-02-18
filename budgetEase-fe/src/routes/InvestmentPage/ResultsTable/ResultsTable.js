const formatter = new Intl.NumberFormat('en-ID', {
  style: 'currency',
  currency: 'IDR',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
   
})

function ResultsTable(props) {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear).replace(",", ".")}</td>
            <td>{formatter.format(yearData.yearlyInterest).replace(",", ".")}</td>
            <td>
              {formatter.format(yearData.savingsEndOfYear -
                props.initialInvestment -
                yearData.yearlyContribution * yearData.year).replace(",", ".")}
            </td>
            <td>
              {formatter.format(props.initialInvestment +
                yearData.yearlyContribution * yearData.year).replace(",", ".")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
