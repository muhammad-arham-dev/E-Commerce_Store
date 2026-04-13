export default function Skeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-10 bg-gray-200 rounded-xl w-full" />
    </div>
  );
}