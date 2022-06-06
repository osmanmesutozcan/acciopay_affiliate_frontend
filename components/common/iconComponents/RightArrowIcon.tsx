export function RightIcon({ className, color = "#1C1B1E" }: { className: string; color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.96967 5.46967C9.26256 5.17678 9.73744 5.17678 10.0303 5.46967L16.0303 11.4697C16.3232 11.7626 16.3232 12.2374 16.0303 12.5303L10.0303 18.5303C9.73744 18.8232 9.26256 18.8232 8.96967 18.5303C8.67678 18.2374 8.67678 17.7626 8.96967 17.4697L14.4393 12L8.96967 6.53033C8.67678 6.23744 8.67678 5.76256 8.96967 5.46967Z"
        fill={color}
      />
    </svg>
  );
}
