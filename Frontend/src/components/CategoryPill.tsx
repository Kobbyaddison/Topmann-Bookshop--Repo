interface Props { label: string; active?: boolean; onClick?: () => void }
export default function CategoryPill({ label, active, onClick }: Props) {
  return (
    <button onClick={onClick} className={`rounded-full border px-4 py-2 text-sm ${active ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700 hover:border-primary'}`}>{label}</button>
  );
}