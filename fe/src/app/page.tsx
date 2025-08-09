// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/ko"); // 또는 "en", "ja" 등 기본 언어 코드
}
