import { apiClient, invoke } from './common';

export const defaultModelService = {
  getAll: (option?: ModelOption) =>
    invoke(apiClient.GET('/api/model', { params: { query: option } })),
  uploadDefaultModel: (data: DefaultModel[]) =>
    invoke(apiClient.POST('/api/model', { body: data })),
  getById: (id: string) => invoke(apiClient.GET(`/api/model/{id}`, { params: { path: { id } } })),
  deleteDefaultModel: (id: string) =>
    invoke(apiClient.DELETE(`/api/model/{id}`, { params: { path: { id } } })),
  updateDefaultModel: (id: string) =>
    invoke(apiClient.PUT(`/api/model/{id}`, { params: { path: { id } } })),
  toggleLikeModel: (id: string) =>
    invoke(apiClient.POST(`/api/model/{id}/toggle-like`, { params: { path: { id } } }))
};
