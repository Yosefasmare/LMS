import { prisma } from "@/lib/prisma_init";
import Link from "next/link";

export default function AdminPage() {
  // Dummy Data
  const totalBooksCount = 111;
  const availableCopiesCount = 980;
  const reservedCopiesCount = 150;
  const borrowedCopiesCount = 115;

  const recentReservations = [
    { id: '1', copy: { book: { title: 'The Great Gatsby' } }, createdAt: new Date().toISOString(), status: 'active' },
    { id: '2', copy: { book: { title: '1984' } }, createdAt: new Date(Date.now() - 3600000).toISOString(), status: 'collected' },
    { id: '3', copy: { book: { title: 'To Kill a Mockingbird' } }, createdAt: new Date(Date.now() - 7200000).toISOString(), status: 'active' },
    { id: '4', copy: { book: { title: 'Pride and Prejudice' } }, createdAt: new Date(Date.now() - 86400000).toISOString(), status: 'expired' },
    { id: '5', copy: { book: { title: 'The Catcher in the Rye' } }, createdAt: new Date(Date.now() - 172800000).toISOString(), status: 'collected' },
  ];

  const recentlyAddedBooks = [
    { id: '101', title: 'Atomic Habits', author: 'James Clear', createdAt: new Date().toISOString() },
    { id: '102', title: 'Deep Work', author: 'Cal Newport', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '103', title: 'Dune', author: 'Frank Herbert', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: '104', title: 'Sapiens', author: 'Yuval Noah Harari', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: '105', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', createdAt: new Date(Date.now() - 345600000).toISOString() },
  ];

  const booksWithNoAvailableCopies = [
    { id: '201', title: 'Project Hail Mary' },
    { id: '202', title: 'The Martian' },
  ];

  const activeReservationCount = 68;
  const isHighReservationVolume = activeReservationCount > 50;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">System status and snapshot</p>
      </header>
      
      {(booksWithNoAvailableCopies.length > 0 || isHighReservationVolume) && (
        <section className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h2 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            System Alerts
          </h2>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {isHighReservationVolume && (
              <li>High reservation volume: {activeReservationCount} active reservations.</li>
            )}
            {booksWithNoAvailableCopies.length > 0 && (
              <li>{booksWithNoAvailableCopies.length} book(s) have 0 available copies right now.</li>
            )}
          </ul>
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Books", value: totalBooksCount },
          { label: "Available Copies", value: availableCopiesCount },
          { label: "Reserved Copies", value: reservedCopiesCount },
          { label: "Borrowed Copies", value: borrowedCopiesCount },
        ].map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">{metric.label}</span>
            <span className="text-3xl font-semibold text-gray-900">{metric.value}</span>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href="/admin/books/add" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition">
          Add Book
        </Link>
        <Link href="/admin/books" className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded shadow-sm hover:bg-gray-50 transition">
          View All Books
        </Link>
        <Link href="/admin/reservations" className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded shadow-sm hover:bg-gray-50 transition">
          View Reservations
        </Link>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reservations</h2>
          {recentReservations.length === 0 ? (
            <p className="text-sm text-gray-500">No recent reservations.</p>
          ) : (
            <div className="space-y-4">
              {recentReservations.map((res) => (
                <div key={res.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{res.copy.book.title}</p>
                    <p className="text-xs text-gray-500">{new Date(res.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    res.status === 'active' ? 'bg-green-100 text-green-700' :
                    res.status === 'collected' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Added Books</h2>
          {recentlyAddedBooks.length === 0 ? (
            <p className="text-sm text-gray-500">No books added recently.</p>
          ) : (
            <div className="space-y-4">
              {recentlyAddedBooks.map((book) => (
                <div key={book.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{book.title}</p>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}