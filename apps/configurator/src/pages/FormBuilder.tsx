import * as React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useBuilder } from "../onboarding/builderStore";
import { OnboardingQuestion } from "../../../../packages/domain/src/index";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Label,
  Switch,
  Separator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Table,
  TableRow,
  TableCell,
} from "../../../../packages/ui/src/newComponents/index";
import { toast } from "sonner";
import { nanoid } from "nanoid";

// field types for palette
const TYPES: OnboardingQuestion["type"][] = [
  "text",
  "number",
  "email",
  "phone",
  "date",
  "select",
  "multiselect",
  "boolean",
];

export default function FormBuilderPage() {
  const { form, addField, publish, resetDemo, togglePreview, previewOpen } =
    useBuilder();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // dnd handlers are inside Canvas; here we show layout
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Palette */}
      <aside className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Field types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {TYPES.map((t) => (
              <Button
                key={t}
                variant="outline"
                className="w-full justify-start"
                onClick={() => addField(t)}
              >
                + {labelOfType(t)}
              </Button>
            ))}
            <Separator className="my-2" />
            <Button variant="secondary" onClick={() => resetDemo()}>
              Reset demo
            </Button>
          </CardContent>
        </Card>
      </aside>

      {/* Canvas */}
      <main className="col-span-7">
        <TopBar />
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Form canvas</CardTitle>
            <Badge variant="outline">Version {form.version}</Badge>
          </CardHeader>
          <CardContent>
            <Canvas />
          </CardContent>
        </Card>
      </main>

      {/* Inspector */}
      <aside className="col-span-3">
        <Inspector />
        <PreviewDrawer />
      </aside>
    </div>
  );
}

function TopBar() {
  const { publish, togglePreview, form, setQuestionsPerPage } = useBuilder();

  return (
    <div className="mb-2 flex flex-wrap items-center justify-end gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Questions per page
        </span>
        <Input
          type="number"
          min={1}
          max={20}
          value={form.questionsPerPage}
          onChange={(e) => setQuestionsPerPage(Number(e.target.value || 1))}
          className="w-20"
        />
      </div>

      <Button variant="outline" onClick={() => togglePreview(true)}>
        Preview
      </Button>
      <Button
        onClick={() => {
          publish();
          toast.success("Published (version bumped)");
        }}
      >
        Publish
      </Button>
    </div>
  );
}
/* ================= Canvas ================= */

function Canvas() {
  const { form, reorder, select, selectedId, update, duplicate, remove } =
    useBuilder();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const ids = form.questions.sort((a, b) => a.order - b.order).map((q) => q.id);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    const newIds = arrayMove(ids, oldIndex, newIndex);
    reorder(newIds);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {form.questions
            .sort((a, b) => a.order - b.order)
            .map((q) => (
              <QuestionCard
                key={q.id}
                q={q}
                selected={q.id === selectedId}
                onSelect={() => select(q.id)}
                onChange={(patch) => update(q.id, patch)}
                onDuplicate={() => duplicate(q.id)}
                onDelete={() => remove(q.id)}
              />
            ))}
          {form.questions.length === 0 && (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              Click a field type on the left to add your first question.
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

/* Sortable item */
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
function QuestionCard({
  q,
  selected,
  onSelect,
  onChange,
  onDuplicate,
  onDelete,
}: {
  q: OnboardingQuestion;
  selected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<OnboardingQuestion>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: q.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border p-4 ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            className="cursor-grab text-muted-foreground"
            {...attributes}
            {...listeners}
            aria-label="drag"
          >
            ⋮⋮
          </button>
          <Input
            value={q.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className="w-[28rem]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{labelOfType(q.type)}</Badge>
          <Switch
            checked={q.enabled}
            onCheckedChange={(v) => onChange({ enabled: v })}
          />
          <Button size="sm" variant="outline" onClick={onDuplicate}>
            Duplicate
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>

      {/* Type-specific editor preview */}
      <div className="mt-3">
        {q.type === "text" && <Input placeholder="Short answer" disabled />}
        {q.type === "number" && (
          <Input placeholder="Number" inputMode="numeric" disabled />
        )}
        {q.type === "email" && (
          <Input placeholder="name@example.com" disabled />
        )}
        {q.type === "phone" && <Input placeholder="+65 0000 0000" disabled />}
        {q.type === "date" && <Input placeholder="YYYY-MM-DD" disabled />}
        {(q.type === "select" || q.type === "multiselect") && (
          <div className="flex flex-wrap gap-2">
            {(q.options ?? []).map((o) => (
              <Badge key={o.id} variant="outline">
                {o.label}
              </Badge>
            ))}
            {(!q.options || q.options.length === 0) && (
              <span className="text-sm text-muted-foreground">
                No options yet
              </span>
            )}
          </div>
        )}
        {q.type === "boolean" && (
          <div className="flex items-center gap-2">
            <Switch disabled />
            <span className="text-sm text-muted-foreground">Toggle</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Inspector (properties) ================= */

function Inspector() {
  const { form, selectedId, update } = useBuilder();
  const row = form.questions.find((q) => q.id === selectedId);

  if (!row) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Select a question to edit its properties.
        </CardContent>
      </Card>
    );
  }

  const set = (patch: Partial<OnboardingQuestion>) => update(row.id, patch);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <Label>Question label</Label>
          <Input
            value={row.label}
            onChange={(e) => set({ label: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Description</Label>
          <Input
            value={row.description ?? ""}
            onChange={(e) => set({ description: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Key</Label>
          <Input
            value={row.key}
            onChange={(e) => set({ key: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Type</Label>
          <Select
            value={row.type}
            onValueChange={(v) => {
              if (v === "select" || v === "multiselect")
                set({ type: v as any, options: row.options ?? [] });
              else set({ type: v as any, options: [] });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {labelOfType(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Priority</Label>
          <Select
            value={row.priority}
            onValueChange={(v) =>
              set({ priority: v as any, required: v === "required" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="required">Required</SelectItem>
              <SelectItem value="optional">Optional</SelectItem>
              <SelectItem value="conditional">Conditional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {row.priority === "conditional" && (
          <div className="space-y-1">
            <Label>Condition</Label>
            <Input
              placeholder='e.g. "country==SG"'
              value={row.conditionExpr ?? ""}
              onChange={(e) => set({ conditionExpr: e.target.value })}
            />
          </div>
        )}
        {(row.type === "select" || row.type === "multiselect") && (
          <OptionsEditor row={row} onSet={set} />
        )}
        <div className="flex items-center justify-between">
          <Label>Enabled</Label>
          <Switch
            checked={row.enabled}
            onCheckedChange={(v) => set({ enabled: v })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function OptionsEditor({
  row,
  onSet,
}: {
  row: OnboardingQuestion;
  onSet: (p: Partial<OnboardingQuestion>) => void;
}) {
  const [label, setLabel] = React.useState("");
  const [val, setVal] = React.useState("");

  function add() {
    if (!label || !val) return;
    onSet({
      options: [...(row.options ?? []), { id: nanoid(), label, value: val }],
    });
    setLabel("");
    setVal("");
  }
  function remove(id: string) {
    onSet({ options: (row.options ?? []).filter((o) => o.id !== id) });
  }

  return (
    <div className="space-y-2">
      <Label>Options</Label>
      <div className="flex gap-2">
        <Input
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <Input
          placeholder="Value"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <Button onClick={add}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(row.options ?? []).map((o) => (
          <Badge key={o.id} variant="outline">
            {o.label}:{o.value}
            <button
              className="ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => remove(o.id)}
            >
              ×
            </button>
          </Badge>
        ))}
        {(!row.options || row.options.length === 0) && (
          <span className="text-sm text-muted-foreground">No options yet</span>
        )}
      </div>
    </div>
  );
}

/* ================= Preview ================= */
function PreviewDrawer() {
  const { previewOpen, togglePreview, form } = useBuilder();
  const questions = React.useMemo(
    () =>
      [...form.questions]
        .filter((q) => q.enabled)
        .sort((a, b) => a.order - b.order),
    [form.questions]
  );

  const pages = React.useMemo(
    () => chunk(questions, form.questionsPerPage),
    [questions, form.questionsPerPage]
  );
  const [step, setStep] = React.useState(0);
  const isFirst = step === 0;
  const isLast = step === Math.max(0, pages.length - 1);
  const total = pages.length || 1;

  React.useEffect(() => {
    setStep(0);
  }, [form.questionsPerPage, form.version, previewOpen]);

  return (
    <Dialog open={previewOpen} onOpenChange={togglePreview}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mobile Preview</DialogTitle>
        </DialogHeader>

        <div className="rounded-lg border p-4">
          <div className="mx-auto w-[360px] rounded-xl border bg-background p-4">
            {/* simple step indicator */}
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {Math.min(step + 1, total)} of {total}
              </span>
              <ProgressFraction current={step + 1} total={total} />
            </div>

            <div className="space-y-4">
              {(pages[step] ?? []).map((q) => (
                <div key={q.id} className="space-y-1">
                  <Label>
                    {q.label}
                    {q.required && <span className="text-red-500"> *</span>}
                  </Label>
                  {q.type === "text" && (
                    <Input placeholder={q.placeholder ?? "Your answer"} />
                  )}
                  {q.type === "number" && (
                    <Input inputMode="numeric" placeholder="0" />
                  )}
                  {q.type === "email" && (
                    <Input inputMode="email" placeholder="you@example.com" />
                  )}
                  {q.type === "phone" && (
                    <Input inputMode="tel" placeholder="+65 0000 0000" />
                  )}
                  {q.type === "date" && <Input placeholder="YYYY-MM-DD" />}
                  {(q.type === "select" || q.type === "multiselect") && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {(q.options ?? []).map((o) => (
                          <SelectItem key={o.id} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {q.type === "boolean" && (
                    <div className="flex items-center gap-2">
                      <Switch /> <span className="text-sm">Yes / No</span>
                    </div>
                  )}
                </div>
              ))}
              {pages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground">
                  No enabled questions.
                </div>
              )}
            </div>

            {/* nav buttons */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                disabled={isFirst}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <div className="text-xs text-muted-foreground">
                Version {form.version}
              </div>
              {isLast ? (
                <Button onClick={() => togglePreview(false)}>Finish</Button>
              ) : (
                <Button
                  onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => togglePreview(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* helpers inside FormBuilder.tsx (below the component definitions) */
function chunk<T>(arr: T[], size: number): T[][] {
  if (!size || size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function ProgressFraction({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / Math.max(total, 1)) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded bg-muted">
        <div className="h-2 bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-muted-foreground">{pct}%</span>
    </div>
  );
}

function labelOfType(t: OnboardingQuestion["type"]) {
  switch (t) {
    case "text":
      return "Short text";
    case "number":
      return "Number";
    case "email":
      return "Email";
    case "phone":
      return "Phone";
    case "date":
      return "Date";
    case "select":
      return "Dropdown";
    case "multiselect":
      return "Multi-select";
    case "boolean":
      return "Yes/No";
  }
}
