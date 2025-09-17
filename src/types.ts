export interface SchemeUnit {
  code: string;
  name: string;
}

export interface CertificationScheme {
  id: string;
  title: string;
  description: string;
  units?: SchemeUnit[];
}