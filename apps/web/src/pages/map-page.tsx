import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MapViewWithMarker, {
  MapViewWithMarkerHandle,
} from "../components/map-view-with-marker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";
import { LocateFixed, RotateCcw, Search } from "lucide-react";

export const MapPage = () => {
  const { t } = useTranslation("auth");
  const mapApiRef = useRef<MapViewWithMarkerHandle>(null);
  const [query, setQuery] = useState("");

  const onSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      await mapApiRef.current?.searchPlace(query);
    } catch (err) {
      console.error(err);
    }
  };

  const onLocate = async () => {
    try {
      await mapApiRef.current?.locateUser();
    } catch (err) {
      console.error(err);
    }
  };

  const onReset = () => {
    setQuery("");
    mapApiRef.current?.resetView();
  };

  return (
    <div className="w-full max-w-xxl p-5">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("mapPage.explore")}</CardTitle>
          <CardDescription>{t("mapPage.description")}</CardDescription>
        </CardHeader>

        <form onSubmit={onSearch}>
          <div className="flex flex-col gap-3 px-6">
            <div className="flex gap-2">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60"
                  aria-hidden
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("mapPage.searchPlaceholder")}
                  className="pl-9"
                />
              </div>

              <Button type="submit" className="shrink-0">
                {t("mapPage.btnSearch")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onLocate}
                className="shrink-0"
                title={t("mapPage.btnLocateTitle")}
              >
                <LocateFixed className="mr-2 size-4" />
                {t("mapPage.btnLocate")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onReset}
                className="shrink-0"
                title={t("mapPage.btnReset")}
              >
                <RotateCcw className="mr-2 size-4" />
                {t("mapPage.btnReset")}
              </Button>
            </div>
          </div>
        </form>

        <CardContent className="pt-4">
          <div className="h-[65vh] w-full overflow-hidden rounded-xl border">
            <MapViewWithMarker ref={mapApiRef} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1 text-sm text-muted-foreground">
          <p>{t("mapPage.tipZoom")}</p>
          <p>{t("mapPage.tipPerms")}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
