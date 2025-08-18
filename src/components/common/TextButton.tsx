export default function TextButton({
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
      className={`flex flex-col flex-1 items-center self-stretch text-left py-3 rounded-lg border-0 hover:text-primary-strong transition-colors`}
      disabled={disabled}
    >
      <div className="flex flex-col items-center">
        <span
          className={`text-base font-medium ${
            disabled ? "text-primary-neutral" : "text-primary-neutral"
          }`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
