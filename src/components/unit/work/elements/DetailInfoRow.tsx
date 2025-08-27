export default function DetailInfoRow({
  label,
  value,
  marginBottom = "8",
}: {
  label: string;
  value: string;
  marginBottom?: string;
}) {
  return (
    <div className="flex justify-between items-center self-stretch" style={{ marginBottom: `${marginBottom}px` }}>
      <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">{label}</span>
      <span className="flex-1 text-primary-normal text-base font-medium text-right">{value}</span>
    </div>
  );
}
