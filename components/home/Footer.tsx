export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <p className="text-xs text-secondary">
          &copy; {new Date().getFullYear()} LMS.
        </p>
      </div>
    </footer>
  );
}
