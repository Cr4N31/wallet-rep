function FactorsList({ factors }) {
  return (
    <ul className="mt-2 text-left list-disc list-inside">
      {Object.entries(factors).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}

export default FactorsList;
