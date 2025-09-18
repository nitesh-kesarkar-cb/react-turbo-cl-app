import { FormFieldType } from "@/types/formBuilder";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/newComponents";
import { Trash2 } from "lucide-react";

interface FormFieldProps {
  field: FormFieldType;
  onDeleteFormField?: (e: React.MouseEvent) => void;
}

function FormField({ field, onDeleteFormField }: FormFieldProps) {
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[55px]">
              <Badge>{field.type}</Badge>
            </div>
          </div>

          <div>
            <Input placeholder="Label" value={field.label} />
          </div>

          <div>
            <Input placeholder="Placeholder" value={field.placeholder} />
          </div>

          <div>
            <Input
              placeholder="Initial value"
              value={
                field?.initialValue !== undefined
                  ? String(field.initialValue)
                  : ""
              }
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm">
              <Checkbox
                id="required"
                className="border-gray-500 dark:border-gray-400 "
              />
              <Label htmlFor="required">Required</Label>
            </div>
            <div className="flex items-center gap-2 text-sm ">
              <Checkbox
                id="active"
                className="border-gray-500 dark:border-gray-400 "
              />
              <label htmlFor="active">Active</label>
            </div>

            <Button variant="ghost" size="sm" onClick={onDeleteFormField}>
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FormField;
