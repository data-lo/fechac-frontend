/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface DynamicArrayFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  showLabel?: boolean;
}

const DynamicArrayField = ({
  control,
  name,
  label,
  placeholder = "Palabra",
  showLabel = true
}: DynamicArrayFieldProps) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addNewField = () => {
    append('');
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (

        <div className="p-1 rounded-md flex flex-col gap-4">
          {showLabel && (
                <label className="font-normal text-sm" htmlFor={name}>
                    {label}
                </label>
            )}
          <FormItem className="col-span-full">
            <FormControl>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`${name}.${index}`}
                      render={({ field: inputField }) => (
                        <Input
                          {...inputField}
                          placeholder={`${placeholder} ${index + 1}`}
                          className="flex-1"
                        />
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      className="shrink-0 text-red-500 hover:text-red-700"
                      disabled={fields.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addNewField}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      )}


    />
  );
};

export default DynamicArrayField;