export default function Contact() {
  return (
    <form className="card mx-auto max-w-2xl p-6">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <input className="input mt-4" placeholder="Your name" />
      <input className="input mt-3" placeholder="Email" type="email" />
      <textarea className="input mt-3 min-h-[120px]" placeholder="Message" />
      <button className="btn-primary mt-4">Send</button>
    </form>
  );
}