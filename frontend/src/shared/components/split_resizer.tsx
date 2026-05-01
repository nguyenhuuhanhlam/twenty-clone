type SplitResizerProps = {
  disabled?: boolean;
  onResizeStart: (clientX: number, pointerId: number) => void;
  onResizeMove: (clientX: number) => void;
  onResizeEnd: (pointerId: number) => void;
};

export function SplitResizer({
  disabled,
  onResizeStart,
  onResizeMove,
  onResizeEnd,
}: SplitResizerProps) {
  return (
    <div
      className="split-resizer"
      role="separator"
      aria-orientation="vertical"
      aria-label="Đổi rộng panel"
      onPointerDown={(event) => {
        if (disabled) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        onResizeStart(event.clientX, event.pointerId);
      }}
      onPointerMove={(event) => onResizeMove(event.clientX)}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        onResizeEnd(event.pointerId);
      }}
      onPointerCancel={(event) => onResizeEnd(event.pointerId)}
    />
  );
}
