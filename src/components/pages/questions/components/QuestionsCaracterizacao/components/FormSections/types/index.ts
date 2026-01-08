import { CharacterizationFormState } from "../../../hooks/useCharacterizationFormState";

export interface FormSectionsProps {
  form: CharacterizationFormState;
  handleFormChange: (changes: Partial<CharacterizationFormState>) => void;
  renderRadioButton: (isSelected: boolean) => React.ReactElement;
}
