import DetailedProject from '@/components/root/DetailedProject';

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // ✅ Safe in server component
  return <DetailedProject projectId={id} />;
}
