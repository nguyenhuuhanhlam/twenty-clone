type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="state-panel">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
