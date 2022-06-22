import { ElementStates } from "../../types/element-states";

export enum RadioValues {
  BUBBLE_SORT = "Пузырек",
  SELECTION_SORT = "Выбор",
}

export enum SortingType {
  ASC = "asc",
  DESC = "desc",
}

export interface IColumn {
  index: number;
  state: ElementStates;
}
