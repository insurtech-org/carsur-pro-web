"use client";

const ArrowButton = ({
  text,
  isUnderLine = true,
  onClick,
}: {
  text: string;
  isUnderLine?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`self-stretch py-4 ${
        isUnderLine ? "border-b border-line-alternative" : ""
      } inline-flex justify-between items-center`}
      onClick={onClick}
    >
      <div className="justify-start text-black text-base font-normal">{text}</div>

      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-alternative"
        >
          <path
            d="M8.79289 4.79289C9.18342 4.40237 9.81643 4.40237 10.207 4.79289L16.5654 11.1513C17.034 11.6199 17.034 12.3799 16.5654 12.8486L10.207 19.207C9.81643 19.5975 9.18342 19.5975 8.79289 19.207C8.40237 18.8164 8.40237 18.1834 8.79289 17.7929L14.5859 11.9999L8.79289 6.20696C8.40237 5.81643 8.40237 5.18342 8.79289 4.79289Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
};

export default ArrowButton;
