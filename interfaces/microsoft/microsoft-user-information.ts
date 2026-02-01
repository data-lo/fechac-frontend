export interface MicrosoftUserInformation {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}
