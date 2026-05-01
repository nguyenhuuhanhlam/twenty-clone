type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = 'Đang tải' }: LoadingStateProps) {
  return (
    <div className="state-panel">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
