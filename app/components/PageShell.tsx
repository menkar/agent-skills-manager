type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centred, responsive container used by every page. */
export default function PageShell({ children, className = "" }: PageShellProps) {
  const widthClass = /\bmax-w-/.test(className) ? "" : "max-w-6xl";
  return (
    <div
      className={`mx-auto w-full ${widthClass} px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
