export default function VailedInput({
  type,
  placeholder,
  value,
  isFocused,
  isError,
  errorMessage,
  onChange,
  onFocus,
  onBlur,
  onClickClear,
}: {
  type: string;
  placeholder: string;
  value: string;
  isFocused: boolean;
  isError: boolean;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClickClear: () => void;
}) {
  return (
    <>
      <div
        className={`relative rounded-lg border border-solid py-3 px-4 ${
          isFocused
            ? "border-primary-normal"
            : isError
            ? "border-status-destructive"
            : "border-line-neutral"
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="self-stretch text-primary-normal text-base focus:outline-none w-full pr-8"
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {value && (
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2 hover:opacity-70 transition-opacity "
            onClick={onClickClear}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#D6D6D6]"
            >
              <path
                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.707 7.29297C16.3165 6.90244 15.6835 6.90244 15.293 7.29297L12 10.5859L8.70703 7.29297C8.31651 6.90244 7.68349 6.90244 7.29297 7.29297C6.90244 7.68349 6.90244 8.31651 7.29297 8.70703L10.5859 12L7.29297 15.293C6.90244 15.6835 6.90244 16.3165 7.29297 16.707C7.68349 17.0976 8.31651 17.0976 8.70703 16.707L12 13.4141L15.293 16.707C15.6835 17.0976 16.3165 17.0976 16.707 16.707C17.0976 16.3165 17.0976 15.6835 16.707 15.293L13.4141 12L16.707 8.70703C17.0976 8.31651 17.0976 7.68349 16.707 7.29297"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>

      {errorMessage && (
        <span className="text-status-destructive text-sm font-regular pt-2">
          {errorMessage}
        </span>
      )}
    </>
  );
}
