import { auth } from "@/auth";
import { EditorClient } from "./EditorClient";
export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const session = await auth();

  return <EditorClient session={session} />;
}
