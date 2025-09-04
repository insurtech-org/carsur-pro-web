const SpinnerTailwind = ({ size = "small" }: { size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "h-4 w-4 border",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-2",
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-gray-300 border-t-blue-500`} />
    </div>
  );
};

export default SpinnerTailwind;
