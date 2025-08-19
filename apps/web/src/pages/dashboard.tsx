import { Link } from "@tanstack/react-router";
import { useAuth, useFeatureFlags } from "../contexts/AuthContext";
import { Can } from "../routes/can";
import CanFeature from "../routes/can-feature";
import AppDiv from "../components/div";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/heading";
import { Paragraph } from "@/components/ui/paragraph";
import { JSONViewer } from "@/components/ui/json-viewer";

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
      <H2>Dashboard</H2>
      <Paragraph>Welcome, {user?.username}</Paragraph>

      <JSONViewer data={user} title="User Object" className="my-5" />

      <H3>Feature Flag Checks</H3>

      {/* Feature Check using component */}
      <CanFeature feature_flag={"beta_dashboard"}>
        <Paragraph>Beta Dashboard Feature is enabled</Paragraph>
      </CanFeature>

      {/* Singpass Login Feature Check from hook */}
      {new_payments && <Paragraph>New Payments Feature is enabled</Paragraph>}

      {/* Singpass Login Feature Check using hook method */}
      {hasFeatureEnabled("singpass_login") && (
        <Paragraph>Singpass Login Feature is enabled</Paragraph>
      )}

      <H3>Role Checks</H3>
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

        <H3>Permission Checks</H3>
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
