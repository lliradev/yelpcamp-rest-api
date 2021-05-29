export interface IMail {
  to: string;
  from: {
    name?: string;
    email: string;
  };
  subject: string;
  text: string;
  html?: string;
}
