export type Locale = 'ko' | 'en';

export interface I18nResources {
  common: {
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    cancel: string;
    confirm: string;
    close: string;
    save: string;
    edit: string;
    delete: string;
    add: string;
    search: string;
    reset: string;
    submit: string;
  };
  validation: {
    required: string;
    email: string;
    minLength: string;
    maxLength: string;
  };
}