function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="state-box error-box" role="alert">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
