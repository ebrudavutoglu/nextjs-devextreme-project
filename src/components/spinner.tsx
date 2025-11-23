interface Props {
  message?: string;
  percentage?: number; // 0-100 arası, varsa gösterir
  size?: "sm" | "md" | "lg";
  className?: string;
  overlay?: boolean; // true => fullscreen overlay, false => inline centered
}

const sizeMap = {
  sm: "w-8 h-8 border-4",
  md: "w-12 h-12 border-4",
  lg: "w-16 h-16 border-4",
};

export default function Spinner({
  message = "Yükleniyor...",
  percentage,
  size = "md",
  className = "",
  overlay = true,
}: Props) {
  return (
    <div
      className={`${
        overlay
          ? "fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm"
          : "flex items-center justify-center"
      } ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex items-center gap-4">
          <svg
            className={`${sizeMap[size]} animate-spin text-indigo-600`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-80"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          {/* pulsing dots alternatif */}
          <div className="hidden sm:flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-75"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-150"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-250"></span>
          </div>
        </div>

        <div className="text-center">
          <div className="font-medium text-gray-100 text-lg">{message}</div>
          {typeof percentage === "number" && (
            <div className="mt-1 text-sm text-gray-200">{percentage}%</div>
          )}
        </div>
      </div>
    </div>
  );
}
