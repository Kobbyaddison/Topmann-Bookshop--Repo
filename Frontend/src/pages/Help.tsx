export default function Help() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1,2,3,4].map((i) => (
        <div key={i} className="card p-6">
          <h3 className="font-semibold">FAQ #{i}</h3>
          <p className="mt-2 text-sm text-gray-600">Short helpful answer for common question.</p>
        </div>
      ))}
    </div>
  );
}