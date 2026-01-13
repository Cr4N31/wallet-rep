function ErrorMessage({ message }) {
  if (!message) return null; // don't render empty messages
  return (
    <p className="text-red-600 mt-2 font-medium">{message}</p>
  );
}

export default ErrorMessage;
