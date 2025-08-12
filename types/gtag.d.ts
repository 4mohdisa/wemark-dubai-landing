declare global {
  function gtag(
    command: 'event',
    eventName: string,
    parameters: {
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ): void;
  
  function gtag(command: 'config', targetId: string, config?: object): void;
  function gtag(command: 'js', config: Date): void;
  function gtag(...args: any[]): void;
}

export {};