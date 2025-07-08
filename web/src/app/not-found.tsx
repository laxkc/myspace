export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">404 – Page Not Found</h1>
        <p className="text-gray-600 text-center mb-4 text-base sm:text-lg max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
        <a
          href="/"
          className="inline-block px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm text-sm sm:text-base"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}