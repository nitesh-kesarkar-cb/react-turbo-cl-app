// apps/web/src/pages/NoAccessPage.tsx
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  LockKeyhole,
  Home,
  ArrowLeft,
  LifeBuoy,
} from "lucide-react";

function NoAccessPage() {
  const { t } = useTranslation();

  const goBack = () => {
    if (history.length > 1) history.back();
    else window.location.href = "/";
  };

  return (
    // If your root already centers the Outlet, you can drop the outer grid wrapper
    <div className="grid min-h-[calc(100svh-56px)] place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <LockKeyhole className="h-6 w-6 text-destructive" aria-hidden />
          </div>
          <CardTitle className="text-center">
            {t("noAccessPage.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("noAccessPage.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 text-center text-sm text-muted-foreground">
          <p>{t("noAccessPage.code")}</p>
          <p className="inline-flex items-start justify-center gap-2">
            <AlertTriangle className="mt-[2px] h-4 w-4" aria-hidden />
            <span>{t("noAccessPage.hint")}</span>
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="secondary" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("noAccessPage.back")}
          </Button>

          <Button asChild>
            <a href="/" aria-label={t("noAccessPage.home")}>
              <Home className="mr-2 h-4 w-4" />
              {t("noAccessPage.home")}
            </a>
          </Button>

          {/* Optional: wire to your help desk or mailto */}
          <Button variant="ghost" asChild>
            <a
              href="mailto:support@connectedlife.example"
              aria-label={t("noAccessPage.support")}
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              {t("noAccessPage.support")}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NoAccessPage;
