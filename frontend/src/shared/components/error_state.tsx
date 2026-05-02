type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="state-panel error-state">
      <h2>Error Occurred</h2>
      <p>{message}</p>
    </div>
  );
}
