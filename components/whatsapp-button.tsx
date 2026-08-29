import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

const PREFILL = "Hello Tanaad College, I would like to learn more about admission and programs.";

export function WhatsAppButton({ number }: { number: string }) {
  if (!number) return null;

  return (
    <a
      href={whatsappLink(number, PREFILL)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#1ebe5d]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat With Admissions</span>
    </a>
  );
}
