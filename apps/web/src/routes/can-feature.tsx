import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";

function CanFeature({
  feature_flag,
  children,
}: {
  feature_flag: string;
  children: ReactNode;
}) {
  const { hasFeatureEnabled } = useAuth();

  return hasFeatureEnabled(feature_flag) ? children : null;
}

export default CanFeature;
