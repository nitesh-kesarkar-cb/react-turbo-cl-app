import { useNavigate } from "@tanstack/react-router";
import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "../contexts/AuthContext";

const IDLE_TIMEOUT = 1000 * 60 * 15; // 15 minutes

const IdleTimerContainer = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onIdle = () => {
    console.log("User is idle. Logging out");
    logout();

    // To avoid navigating back to dashboard until auth context is cleared so kept timeout
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 0);
  };

  useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle,
    onActive: () => {
      // console.log("User is active again");
    },
    onAction: () => {
      // console.log("User performed an action");
    },
    throttle: 500, // throttle calls to event handlers
    events: ["mousemove", "keydown", "mousedown", "touchstart"], // custom events
    crossTab: true, // detect activity across tabs
  });

  return null;
};

export default IdleTimerContainer;
