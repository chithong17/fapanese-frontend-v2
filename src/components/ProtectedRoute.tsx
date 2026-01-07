import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loginUser, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!accessToken) {
        await refresh();
      }

      if (accessToken && !loginUser) {
        await fetchMe();
      }

      if (mounted) {
        setStarting(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <OrbitProgress dense color="#43eddc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;
