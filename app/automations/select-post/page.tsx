import { requireSession } from "@/lib/session";
import { SelectPostForm } from "@/components/automations/select-post-form";

export default async function SelectPostScreen() {
  await requireSession();
  return <SelectPostForm />;
}
