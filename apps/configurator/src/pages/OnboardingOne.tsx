import * as React from "react";
import { nanoid } from "nanoid";
import { useOnboardingStore, useOnboardingConfig } from "../onboarding/store";
import { OnboardingQuestion } from "../../../../packages/domain/src/index";

// --- shadcn/ui primitives ---
import { Button } from "../../../../packages/ui/src/newComponents/button";
import { Input } from "../../../../packages/ui/src/newComponents/input";
import { Label } from "../../../../packages/ui/src/newComponents/label";
import { Switch } from "../../../../packages/ui/src/newComponents/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../packages/ui/src/newComponents/select";
import { Badge } from "../../../../packages/ui/src/newComponents/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../packages/ui/src/newComponents/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../packages/ui/src/newComponents/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../../../packages/ui/src/newComponents/dialog";
import { Separator } from "../../../../packages/ui/src/newComponents/saparator";
import { toast } from "sonner";

// --- OPTIONAL: any wrappers/layouts you expose from packages/ui ---
/* Example:
import { PageHeader } from "@ui/page";
import { Toolbar } from "@ui/toolbar";
*/

// constants
const TYPES = [
  "text",
  "number",
  "email",
  "phone",
  "date",
  "select",
  "multiselect",
  "boolean",
] as const;
const PRIORITIES = ["required", "optional", "conditional"] as const;

export default function OnboardingPage() {
  const store = useOnboardingStore();
  const cfg = useOnboardingConfig();

  return (
    <div className="space-y-4">
      {/* <PageHeader title="Onboarding" subtitle={`Version ${cfg.version}`} /> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Onboarding</h1>
          <Badge variant="secondary">Tenant: {cfg.tenantId}</Badge>
          <Badge variant="outline">Version: {cfg.version}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              store.publish();
              toast.success("Published (version bumped)");
            }}
          >
            Publish
          </Button>
          <Button variant="secondary" onClick={() => store.resetDemo()}>
            Reset demo data
          </Button>
          <Button onClick={() => store.add()}>+ Add question</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Order</TableHead>
                <TableHead className="w-[90px]">Enabled</TableHead>
                <TableHead>Label & Description</TableHead>
                <TableHead className="w-[180px]">Type</TableHead>
                <TableHead className="w-[220px]">Priority</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="w-[220px]">Key</TableHead>
                <TableHead className="w-[160px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cfg.questions.map((row: OnboardingQuestion) => (
                <Row key={row.id} row={row} />
              ))}
              {cfg.questions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-10"
                  >
                    No questions yet. Click <b>+ Add question</b> to create one.
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

function Row({ row }: { row: OnboardingQuestion }) {
  const { update, remove, move } = useOnboardingStore();

  const set = (patch: Partial<OnboardingQuestion>) => update(row.id, patch);

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => move(row.id, -1)}>
            ↑
          </Button>
          <Button size="sm" variant="outline" onClick={() => move(row.id, 1)}>
            ↓
          </Button>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={row.enabled}
            onCheckedChange={(v) => set({ enabled: v })}
          />
          <span className="text-xs text-muted-foreground">
            {row.enabled ? "On" : "Off"}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <Input
            value={row.label}
            onChange={(e) => set({ label: e.target.value })}
          />
          <Input
            value={row.description ?? ""}
            placeholder="Description (optional)"
            onChange={(e) => set({ description: e.target.value })}
          />
        </div>
      </TableCell>

      <TableCell>
        <Select
          value={row.type}
          onValueChange={(type) => {
            if (type === "select" || type === "multiselect")
              set({ type, options: row.options ?? [] });
            else set({ type, options: [] });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        <div className="space-y-2">
          <Select
            value={row.priority}
            onValueChange={(priority) => {
              set({
                priority: priority as any,
                required: priority === "required",
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {row.priority === "conditional" && (
            <Input
              value={row.conditionExpr ?? ""}
              placeholder='Condition (e.g. "country==SG")'
              onChange={(e) => set({ conditionExpr: e.target.value })}
            />
          )}
        </div>
      </TableCell>

      <TableCell>
        {row.type === "select" || row.type === "multiselect" ? (
          <OptionsEditor
            value={row.options ?? []}
            onChange={(opts) => set({ options: opts })}
          />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>

      <TableCell>
        <Input value={row.key} onChange={(e) => set({ key: e.target.value })} />
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => remove(row.id)}>
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function OptionsEditor({
  value,
  onChange,
}: {
  value: { id: string; label: string; value: string }[];
  onChange: (v: { id: string; label: string; value: string }[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [draftLabel, setLabel] = React.useState("");
  const [draftValue, setVal] = React.useState("");

  function add() {
    if (!draftLabel || !draftValue) return;
    onChange([
      ...(value || []),
      { id: nanoid(), label: draftLabel, value: draftValue },
    ]);
    setLabel("");
    setVal("");
  }
  function remove(id: string) {
    onChange(value.filter((o) => o.id !== id));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Edit options ({value.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label>Label</Label>
              <Input
                value={draftLabel}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Value</Label>
              <Input
                value={draftValue}
                onChange={(e) => setVal(e.target.value)}
              />
            </div>
            <Button onClick={add}>Add</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            {value.map((o) => (
              <Badge
                key={o.id}
                variant="outline"
                className="flex items-center gap-2"
              >
                {o.label}:{o.value}
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => remove(o.id)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {value.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No options yet
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
