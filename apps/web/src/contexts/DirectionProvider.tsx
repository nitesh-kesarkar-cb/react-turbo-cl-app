import { PropsWithChildren, useEffect, useSyncExternalStore } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import i18n from "@/i18n";

const computeDir = (lng?: string): "ltr" | "rtl" => {
  return i18n.dir(lng);
};

function subscribe(onChange: () => void) {
  i18n.on("languageChanged", onChange);
  return () => i18n.off("languageChanged", onChange);
}

export default function I18nDirectionProvider({ children }: PropsWithChildren) {
  const dir = useSyncExternalStore(subscribe, () => computeDir(), () => i18n.dir());

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}
