import { BuildForm } from "@/pages/FormBuilder";
import { InputTypeEnum } from "@/types/formBuilder";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { GripVertical, MoreVertical, Plus, Trash2 } from "lucide-react";
import FormField from "./FormField";

interface formBuilderProps {
  // Define any props if needed in the future
  formData?: BuildForm;
  onAddSection?: (e: React.MouseEvent) => void;
  onAddFormField?: (
    index: number,
    type: string
  ) => (e: React.MouseEvent) => void;
  onDeleteSection?: (index: number) => (e: React.MouseEvent) => void;
  onDeleteFormField?: (
    sectionIndex: number,
    fieldIndex: number
  ) => (e: React.MouseEvent) => void;
}

function formBuilder({
  formData,
  onAddSection,
  onAddFormField,
  onDeleteSection,
  onDeleteFormField,
}: formBuilderProps) {
  const handleDeleteFormField =
    (sectionIndex: number, fieldIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onDeleteFormField) {
        onDeleteFormField(sectionIndex, fieldIndex)(e);
      }
    };

  return (
    <div className="w-full rounded-2xl">
      <div className="lg:col-span-2">
        <Card className="min-h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Form Structure</CardTitle>
            <Button
              onClick={onAddSection}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </CardHeader>
          <CardContent>
            {!formData?.sections?.length ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No sections yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding a section to your form
                </p>
                <Button onClick={() => {}}>Add First Section</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData?.sections.map((section, sectionIndex: number) => (
                  <Card
                    key={section?.section_id}
                    className="border-2 border-dashed border-border hover:border-primary/50 transition-colors"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={
                                onDeleteSection
                                  ? onDeleteSection(sectionIndex)
                                  : undefined
                              }
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Section
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.form_fields.map((field, fieldIndex) => (
                          <FormField
                            key={field.id}
                            field={field}
                            onDeleteFormField={handleDeleteFormField(
                              sectionIndex,
                              fieldIndex
                            )}
                          />
                        ))}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Field
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-48">
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.TEXT
                                    )
                                  : undefined
                              }
                            >
                              Text Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.NUMBER
                                    )
                                  : undefined
                              }
                            >
                              Number Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.EMAIL
                                    )
                                  : undefined
                              }
                            >
                              Email Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.PASSWORD
                                    )
                                  : undefined
                              }
                            >
                              Password Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.SELECT
                                    )
                                  : undefined
                              }
                            >
                              Select Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.RADIO
                                    )
                                  : undefined
                              }
                            >
                              Radio Field
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={
                                onAddFormField
                                  ? onAddFormField(
                                      sectionIndex,
                                      InputTypeEnum.CHECKBOX
                                    )
                                  : undefined
                              }
                            >
                              Checkbox Field
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default formBuilder;
