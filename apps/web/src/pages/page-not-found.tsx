import { useTranslation } from "react-i18next";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX, Home, LogIn, ArrowLeft } from "lucide-react";

function PageNotFoundPage() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const router = useRouter();

  const goBack = () => {
    if (router.history.length > 1) {
      router.history.back();
    } else {
      navigate({ to: "/", replace: true });
    }
  };

  return (
    // If your root <Outlet /> is already vertically centered,
    // you can remove this wrapper and just return the <Card>.
    <div className="grid min-h-[calc(100svh-56px)] place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <SearchX className="h-6 w-6 text-muted-foreground" aria-hidden />
          </div>
          <CardTitle className="text-center">
            {t("notFoundPage.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("notFoundPage.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 text-center text-sm text-muted-foreground">
          <p>{t("notFoundPage.code")}</p>
          <p>{t("notFoundPage.hint")}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="secondary" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("notFoundPage.back")}
          </Button>

          <Button asChild>
            <Link to="/" aria-label={t("notFoundPage.home")}>
              <Home className="mr-2 h-4 w-4" />
              {t("notFoundPage.home")}
            </Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link to="/login" aria-label={t("notFoundPage.login")}>
              <LogIn className="mr-2 h-4 w-4" />
              {t("notFoundPage.login")}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PageNotFoundPage;
