import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

// UI components from @clife/ui
import { Tenant } from "@/types/tenant";
import { DataTable } from "@repo/ui/components/data-table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "../../../../packages/ui/src/newComponents/index";

const tenantColumns: ColumnDef<Tenant>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "code", header: "Code", accessorKey: "name" },
  { id: "status", header: "Drescription", accessorKey: "name" },
  { id: "created", header: "Status", accessorKey: "name" },
  { id: "actions", header: "Name", accessorKey: "name" },
];

export default function TenantsPage() {
  const { tenants, setTenant } = useSelector((state: any) => state.tenant);

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
      setTenant(editingTenant.id, { ...form });
      toast.success("Tenant updated");
    } else {
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
    setTenant(t);
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tenants</h1>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          + New Tenant
        </Button>
      </div>

      <Card>
        <DataTable columns={tenantColumns} data={[]} />
      </Card>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetForm();
        }}
      >
        <DialogTrigger asChild></DialogTrigger>
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
  );
}
