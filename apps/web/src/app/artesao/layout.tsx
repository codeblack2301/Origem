import { ArtisanShell } from "@/components/artisan/artisan-shell";

export default function LayoutAreaArtesao({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArtisanShell>{children}</ArtisanShell>;
}