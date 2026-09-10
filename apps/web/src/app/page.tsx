import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 p-10">
      <section className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <Badge variant="secondary">
          <MapPin className="size-3" aria-hidden />
          artesanato de Pernambuco
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Origem
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Compre direto de quem faz. Peças com origem, técnica e história da
          economia criativa pernambucana.
        </p>
        <div className="mt-2 flex gap-3">
          <Button asChild>
            <a href="/vitrine">Explorar a vitrine</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/login">Entrar</a>
          </Button>
        </div>
      </section>

      <section className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Vitrine</CardTitle>
            <CardDescription>
              Busca, filtros e perfis de artesãos.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Em construção — catálogo chega com o primeiro PR da API.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Painel do artesão</CardTitle>
            <CardDescription>
              Catálogo, estoque e pedidos.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Área restrita (papel ARTISAN).
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin</CardTitle>
            <CardDescription>
              Aprovações, moderação e indicadores.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Área restrita (papel ADMIN).
          </CardContent>
        </Card>
      </section>
    </main>
  );
}