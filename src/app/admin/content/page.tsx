import { getContentList } from "@/lib/data/queries";
import { ContentTable } from "@/components/admin/ContentTable";

export const revalidate = 0;

export default async function AdminContentPage() {
  const content = await getContentList({ status: "all" });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal tracking-tight">
          Content Library
        </h1>
        <p className="text-xs sm:text-sm text-kernel-muted mt-1">
          Create, edit, toggle publishing, and manage all visual explainers, audio dialogues, and articles.
        </p>
      </div>

      <ContentTable initialContent={content} />
    </div>
  );
}
