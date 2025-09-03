import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  control: any;
  label: string;
  placeHolder?: string;
  disabled?: boolean;
  showLabel?: boolean;
}

const DatePickerField = ({
  name,
  control,
  label,
  placeHolder,
  disabled = false,
  showLabel = true
}: Props) => {
  return (
    <div className="p-1 rounded-md flex flex-col gap-4">
      {showLabel && (
        <label className="font-normal text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (

          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value instanceof Date ? (
                      capitalizeDate(format(field.value, "MMMM dd, yyyy", { locale: es }))
                    ) : (
                      <span>{placeHolder || "Selecciona una fecha"}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  disabled={disabled}
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => field.onChange(date ? new Date(date) : null)}
                  defaultMonth={field.value || new Date()}
                  initialFocus
                  locale={es}
                  classNames={{
                    caption_label: "capitalize",
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DatePickerField;

const capitalizeDate = (dateString: string) => {
  return dateString
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
};