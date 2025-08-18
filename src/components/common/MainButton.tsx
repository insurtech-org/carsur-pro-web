export default function MainButton({
  text,
  onClick,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col flex-1 items-center self-stretch text-left py-3 rounded-lg border-0 hover:bg-primary-dark transition-colors ${
        disabled ? "bg-primary-disabled" : "bg-primary-normal"
      }`}
      disabled={disabled}
    >
      <div className="flex flex-col items-center">
        <span
          className={`text-base font-semibold ${
            disabled ? "text-primary-disabled" : "text-bg-normal"
          }`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
