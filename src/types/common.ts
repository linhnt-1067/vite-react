export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithPartial<T, K extends keyof T> = T & {
  [P in K]?: T[P] | undefined;
};

export type ApiResponse =
  | {
      ok: true;
      data: any;
      status: number;
    }
  | { ok: false; error: string; status?: number };
