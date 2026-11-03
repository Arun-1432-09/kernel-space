import { notFound } from "next/navigation";
import { getCategories, getContentList } from "@/lib/data/queries";
import { ContentForm } from "@/components/admin/ContentForm";

export const revalidate = 0;

interface EditContentPageProps {
  params: { id: string };
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const [categories, allContent] = await Promise.all([
    getCategories(),
    getContentList({ status: "all" }),
  ]);

  const item = allContent.find((c) => c.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
          Edit Content: {item.title}
        </h1>
        <p className="text-xs text-kernel-muted mt-1 font-mono">
          ID: {item.id}
        </p>
      </div>

      <ContentForm initialData={item} categories={categories} />
    </div>
  );
}
