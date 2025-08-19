import { Link } from "@tanstack/react-router";
import { useAuth, useFeatureFlags } from "../contexts/AuthContext";
import { Can } from "../routes/can";
import AppH2 from "../components/h2";
import AppH3 from "../components/h3";
import AppPre from "../components/pre";
import AppP from "../components/p";
import CanFeature from "../routes/can-feature";
import AppDiv from "../components/div";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    user,
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRoles,
    hasAllPermissions,
    hasFeatureEnabled,
  } = useAuth();

  const { new_payments } = useFeatureFlags();

  return (
    <AppDiv>
      <AppH2>Dashboard</AppH2>
      <AppP>Welcome, {user?.username}</AppP>

      <AppH3>User Object</AppH3>
      <AppPre>{JSON.stringify(user, null, 2)}</AppPre>

      <AppH3>Feature Flag Checks</AppH3>

      {/* Feature Check using component */}
      <CanFeature feature_flag={"beta_dashboard"}>
        <AppP>Beta Dashboard Feature is enabled</AppP>
      </CanFeature>

      {/* Singpass Login Feature Check from hook */}
      {new_payments && <AppP>New Payments Feature is enabled</AppP>}

      {/* Singpass Login Feature Check using hook method */}
      {hasFeatureEnabled("singpass_login") && (
        <AppP>Singpass Login Feature is enabled</AppP>
      )}

      <AppH3>Role Checks</AppH3>
      <AppDiv>
        <AppDiv className="flex flex-wrap gap-x-2 gap-y-2 my-2">
          {/* Single Role Check */}
          <Can role="doctor">
            <Button variant="outline">User hasRole Doctor role</Button>
          </Can>

          {/* Either of multiple Roles Check*/}
          <Can roles={["facility_admin", "super_admin"]}>
            <Button variant="outline">
              User hasRole facility_admin | super_admin role
            </Button>
          </Can>

          {/* Single Role Check using hook */}
          {hasRole("facility_admin") && (
            <Button variant="outline">User hasRole facility_admin role</Button>
          )}

          {/* Either of multiple Roles Check using hook */}
          {hasAnyRoles(["facility_admin", "super_admin"]) && (
            <Button variant="outline">
              User hasRole facility_admin | super_admin role
            </Button>
          )}
        </AppDiv>

        <AppH3>Permission Checks</AppH3>
        <AppDiv className="flex flex-wrap gap-x-2 gap-y-2  my-2">
          {/* Single Permission Check */}
          <Can perm="users:create">
            <Button variant="outline">Create User</Button>
          </Can>

          {/* All of multiple Permission Check */}
          <Can perms={["users:update", "users:delete"]} checkAllPerms={true}>
            <Button variant="outline">
              Both of users:update & users:delete
            </Button>
          </Can>

          {/* Either of multiple Permission Check */}
          <Can perms={["org:update", "reports:export"]} checkAllPerms={false}>
            <Button variant="outline">
              Either of org:update | reports:export
            </Button>
          </Can>

          {/* Single permission check with hook */}
          {hasPermission("reports:export") && (
            <Button variant="outline">Export Reports</Button>
          )}

          {/* Either of multiple Permission Check using hook */}
          {hasAnyPermission(["org:update", "reports:export"]) && (
            <Button variant="outline">
              Either of org:update | reports:export
            </Button>
          )}

          {/* All of multiple Permission Check using hook */}
          {hasAllPermissions(["org:update", "reports:export"]) && (
            <Button variant="outline">Update Organization</Button>
          )}
        </AppDiv>
      </AppDiv>

      <Button variant="outline">
        <Link to="/login">go back to login</Link>
      </Button>
    </AppDiv>
  );
}
