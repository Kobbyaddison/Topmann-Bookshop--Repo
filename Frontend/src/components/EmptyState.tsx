interface Props { title: string; subtitle?: string; action?: React.ReactNode }
export default function EmptyState({ title, subtitle, action }: Props) {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}