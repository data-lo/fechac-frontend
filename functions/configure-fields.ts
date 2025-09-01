import { FieldStructure } from "@/interfaces/components/field-strucuture";
import { Option } from "@/interfaces/components/option"

export const configureFields = (fieldsArray: FieldStructure[], options: Option[]) => {
  return fieldsArray.map(field => {

    const matchedOption = options.find(item => item.key === field.key);

    return {
      ...field,
      props: {
        ...field.props,
        ...matchedOption
      }
    };
  });
};
