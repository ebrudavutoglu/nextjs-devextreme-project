export interface IServerResponse<TData> {
  success: boolean;
  data: TData;
  message: string | null;
}
