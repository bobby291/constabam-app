
import type { Metadata } from "next";
import MiamiHomeClient from "./MiamiHomeClients";

const summary =
  "Experience comfortable, modern living at Downtown Miami Residence, a beautifully presented home in the heart of Miami, Florida.";

export const metadata: Metadata = {
  title:
    "Downtown Miami Residence — Miami, FL | Isabella Signature Stays",
  description: summary,
};

export default function MiamiHomePage() {
  return <MiamiHomeClient />;
}
