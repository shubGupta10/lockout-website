import { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[#F43F5E] text-white px-[0.25em] py-[0.05em] rounded-[0.15em] box-decoration-clone inline">
      {children}
    </span>
  );
}
