import type { ReactNode } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { FEATURES } from "@/contexts/auth/auth.types";

function CanFeature({
  feature_flag,
  children,
}: {
  feature_flag: keyof typeof FEATURES;
  children: ReactNode;
}) {
  const { hasFeature } = useAuth();

  return hasFeature(feature_flag) ? children : null;
}

export default CanFeature;
