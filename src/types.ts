export interface Form {
  title: string;
  submitUrl: string;
  controls: Control[];
}

export interface Control {
  id: string;
  control: string;
  caption: string;
  parentID: string;
  tabIndex: number;
  position: number;
  type?: string;
  required?: string;
}
