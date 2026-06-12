import type { Metadata } from "next";
import CGIPClient from "./CGIPClient";

export const metadata: Metadata = {
  title: "Computer Graphics & Image Processing | Tushar",
  description:
    "7th semester lab tasks for Computer Graphics and Image Processing course at USTC.",
};

export default function CGIPPage() {
  return <CGIPClient />;
}
