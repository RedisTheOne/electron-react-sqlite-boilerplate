declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        getDatabase(sql: string): Promise<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on(channel: string, func: (...args: any[]) => void): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        once(channel: string, func: (...args: any[]) => void): void;
      };
    };
  }
}

export {};
