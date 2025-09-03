import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="card mx-auto max-w-2xl p-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="mt-4 space-y-2">
        <div><span className="text-gray-600">Name:</span> {user?.id}</div>
        <div><span className="text-gray-600">Email:</span> {user?.email}</div>
      </div>
    </div>
  );
}