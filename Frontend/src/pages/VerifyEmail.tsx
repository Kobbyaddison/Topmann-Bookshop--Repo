import { Link } from 'react-router-dom';

export default function VerifyEmail() {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <h3 className="text-xl font-semibold">Verify your email</h3>
      <p className="mt-2 text-gray-600">We sent a verification link to your inbox. Click it to activate your account.</p>
      <div className="mt-4 text-sm text-gray-600">Didn’t get it? <button className="text-primary hover:underline">Resend</button></div>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
    </div>
  );
}