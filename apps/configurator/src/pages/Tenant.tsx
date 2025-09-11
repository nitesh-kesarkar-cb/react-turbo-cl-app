import * as React from "react";
import { useTenantStore } from "../tenant/store";
import { Tenant } from "../../../../packages/domain/src/tenant";

// UI components from @clife/ui
import {
  Button,
  Input,
  Label,
  Switch,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../../../packages/ui/src/newComponents/index";

import { toast } from "sonner";

export default function TenantsPage() {
  const { tenants, add, update, remove } = useTenantStore();

  const [open, setOpen] = React.useState(false);
  const [editingTenant, setEditingTenant] = React.useState<Tenant | null>(null);
  const [form, setForm] = React.useState({
    name: "",
    code: "",
    description: "",
  });

  function resetForm() {
    setForm({ name: "", code: "", description: "" });
    setEditingTenant(null);
  }

  function handleSubmit() {
    if (!form.name || !form.code) {
      toast.error("Name and Code are required");
      return;
    }

    if (editingTenant) {
      update(editingTenant.id, { ...form });
      toast.success("Tenant updated");
    } else {
      add({ ...form, active: true });
      toast.success("Tenant created");
    }

    resetForm();
    setOpen(false);
  }

  function handleEdit(t: Tenant) {
    setEditingTenant(t);
    setForm({
      name: t.name,
      code: t.code,
      description: t.description ?? "",
    });
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tenants</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>+ New Tenant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTenant ? "Edit Tenant" : "Create Tenant"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Code</Label>
                <Input
                  placeholder="unique-code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  disabled={!!editingTenant} // don't allow changing code on edit
                />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>
                {editingTenant ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t: Tenant) => (
                <TableRow key={t.id}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{t.code}</Badge>
                  </TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>
                    <Switch
                      checked={t.active}
                      onCheckedChange={(v) => update(t.id, { active: v })}
                    />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => remove(t.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {tenants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No tenants created yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
