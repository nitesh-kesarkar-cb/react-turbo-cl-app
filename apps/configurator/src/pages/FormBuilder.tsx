import { FormBuilder, FormPreview } from "@/components/formBuilder";
import {
  FormFieldType,
  InputType,
  InputTypeEnum,
  MultiSelectTypes,
  SectionType,
} from "@/types/formBuilder";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { produce } from "immer";
import { Eye, Settings } from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";

export interface BuildForm {
  title: string;
  description: string;
  sections: SectionType[];
}

function FormBuilderPage() {
  const [activeTab, setActiveTab] = useState("builder");

  const emptySection: SectionType = {
    section_id: nanoid(),
    section_name: "",
    form_fields: [],
  };

  const emptyFormField: FormFieldType = {
    id: nanoid(),
    type: "text" as InputType,
    specificProps: {
      input_type: undefined as MultiSelectTypes | undefined,
      multi_options: [],
    },
    label: "",
    placeholder: "",
    initialValue: "",
    value: "",
    required: false,
  };

  const [form, setForm] = useState<BuildForm>({
    title: "",
    description: "",
    sections: [
      {
        section_id: "1",
        section_name: "",
        form_fields: [
          {
            type: "text" as InputType,
            id: "1",
            specificProps: {
              input_type: "radio" as MultiSelectTypes,
              multi_options: [],
            },
            label: "",
            placeholder: "",
            value: "",
            required: false,
          },
        ],
      },
    ],
  });

  /**
   * handler to add a new section to the form
   * @returns
   */
  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = produce(form, (draft) => {
      draft["sections"].push(emptySection);
    });
    setForm(nextState);
  };

  /**
   * handler to add a new form field to a specific section
   * @param {number} sectionIndex
   * @returns
   */
  const handleAddFormField =
    (sectionIndex: number, type: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const nextState = produce(form, (draft) => {
        switch (type) {
          case "number":
            draft["sections"][sectionIndex]["form_fields"].push({
              ...emptyFormField,
              type: InputTypeEnum.NUMBER,
              initialValue: 0,
            });
            break;
          case "text":
            draft["sections"][sectionIndex]["form_fields"].push({
              ...emptyFormField,
              type: InputTypeEnum.TEXT,
            });
            break;
          case "email":
            draft["sections"][sectionIndex]["form_fields"].push({
              ...emptyFormField,
              type: InputTypeEnum.EMAIL,
              label: "Email",
              placeholder: "Enter your email",
              initialValue: "",
            });
            break;
          case "password":
            draft["sections"][sectionIndex]["form_fields"].push({
              ...emptyFormField,
              type: InputTypeEnum.PASSWORD,
              label: "Password",
              placeholder: "Enter your password",
              initialValue: "",
            });
            break;
          case "select":
            break;
          case "checkbox":
            break;
          case "radio":
            break;
        }
      });
      setForm(nextState);
    };

  /**
   * handler to delete a section from the form
   * @param sectionIndex
   */
  const handleDeleteSection =
    (sectionIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (form.sections.length === 1) return;
      const nextState = produce(form, (draft) => {
        draft["sections"].splice(sectionIndex, 1);
      });
      setForm(nextState);
    };

  /**
   * handler to delete a form field from a specific section
   * @param {number} sectionIndex
   * @param {number} fieldIndex
   * @returns
   */
  const handleDeleteFormField =
    (sectionIndex: number, fieldIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const nextState = produce(form, (draft) => {
        draft["sections"][sectionIndex]["form_fields"].splice(fieldIndex, 1);
      });
      setForm(nextState);
    };

  /**
   * Handler to change a form field value
   * @param {number} sectionIndex
   * @param {number} fieldIndex
   * @param {string} key
   * @param {any} value
   */
  const handleChangeFormField =
    (sectionIndex: number, fieldIndex: number, key: string) => (e: any) => {
      const value = e.target.value;
      const nextState = produce(form, (draft) => {
        switch (key) {
          case "label":
            draft["sections"][sectionIndex]["form_fields"][fieldIndex][
              "label"
            ] = value;
            break;
          case "placeholder":
            draft["sections"][sectionIndex]["form_fields"][fieldIndex][
              "placeholder"
            ] = value;
            break;
          case "initialValue":
            draft["sections"][sectionIndex]["form_fields"][fieldIndex][
              "initialValue"
            ] =
              draft["sections"][sectionIndex]["form_fields"][fieldIndex][
                "type"
              ] === InputTypeEnum.NUMBER
                ? Number(value)
                : value;
            break;
          case "required":
            draft["sections"][sectionIndex]["form_fields"][fieldIndex][
              "required"
            ] = e.target.checked;
            break;
          case "isActive":
            draft["sections"][sectionIndex]["form_fields"][fieldIndex][
              "isActive"
            ] = e.target.checked;
            break;
        }
      });
      setForm(nextState);
    };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="builder" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Builder
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="builder" className="mt-6">
        <FormBuilder
          formData={form}
          onAddSection={handleAddSection}
          onDeleteSection={handleDeleteSection}
          onAddFormField={handleAddFormField}
          onDeleteFormField={handleDeleteFormField}
        />
      </TabsContent>

      <TabsContent value="preview" className="mt-6">
        <FormPreview formPreviewData={form} />
      </TabsContent>
    </Tabs>
  );
}

export default FormBuilderPage;
