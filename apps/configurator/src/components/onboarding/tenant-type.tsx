import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

const TenantType = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" className="font-bold" />
      </SelectTrigger>
      <SelectContent className="w-[180px] p-3">
        <SelectItem value="b2b">B2B</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TenantType;
