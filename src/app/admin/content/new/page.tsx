import { getCategories } from "@/lib/data/queries";
import { ContentForm } from "@/components/admin/ContentForm";

export const revalidate = 0;

export default async function NewContentPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
          Create New Content
        </h1>
        <p className="text-xs text-kernel-muted mt-1">
          Add a new video breakdown, audio conversation, explainer, or editorial essay.
        </p>
      </div>

      <ContentForm categories={categories} />
    </div>
  );
}
