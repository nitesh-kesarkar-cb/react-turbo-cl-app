import { useNavigate } from "@tanstack/react-router";
import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "../contexts/auth/AuthContext";
import {
  IDLE_THROTTLE,
  IDLE_TIMEOUT,
  MOCK_LOGIN_REDIRECT_TIMEOUT,
} from "@/utils/constant";

const IdleTimerContainer = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onIdle = () => {
    logout();

    // To avoid navigating back to dashboard until auth context is cleared so kept timeout
    setTimeout(() => {
      navigate({ to: "/login" });
    }, MOCK_LOGIN_REDIRECT_TIMEOUT);
  };

  useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle,
    onActive: () => {},
    onAction: () => {},
    throttle: IDLE_THROTTLE,
    events: ["mousemove", "keydown", "mousedown", "touchstart"], // custom events
    crossTab: true, // detect activity across tabs
  });

  return null;
};

export default IdleTimerContainer;
