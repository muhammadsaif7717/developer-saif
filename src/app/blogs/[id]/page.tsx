import DetailedBlog from '@/components/root/DetailedBlog';

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <DetailedBlog blogId={id} />;
}
