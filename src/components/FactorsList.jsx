function FactorsList({ factors }) {
  return (
    <ul>
      {Object.entries(factors).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}

export default FactorsList;
