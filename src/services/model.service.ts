import { apiClient, invoke } from './common';

export const defaultModelService = {
  getAllDefaultModels: () => invoke(apiClient.GET('/api/model')),
  uploadDefaultModel: (data: DefaultModel[]) =>
    invoke(apiClient.POST('/api/model', { body: data })),
  getDefaultModelById: (id: string) =>
    invoke(apiClient.GET(`/api/model/{id}`, { params: { path: { id } } })),
  deleteDefaultModel: (id: string) =>
    invoke(apiClient.DELETE(`/api/model/{id}`, { params: { path: { id } } })),
  updateDefaultModel: (id: string) =>
    invoke(apiClient.PUT(`/api/model/{id}`, { params: { path: { id } } })),
  toggleLikeModel: (id: string) =>
    invoke(apiClient.POST(`/api/model/{id}/toggle-like`, { params: { path: { id } } }))
};

export const userModelService = {
  getAllUserModels: () => invoke(apiClient.GET('/api/userModel')),
  uploadUserModel: (data: UserModel[]) => invoke(apiClient.POST('/api/userModel', { body: data })),
  getUserModelById: (id: string) =>
    invoke(apiClient.GET(`/api/userModel/{id}`, { params: { path: { id } } })),
  deleteUserModel: (id: string) =>
    invoke(apiClient.DELETE(`/api/userModel/{id}`, { params: { path: { id } } })),
  updateUserModel: (id: string, data: UserModel) =>
    invoke(apiClient.PUT(`/api/userModel/{id}`, { params: { path: { id } }, body: data }))
};
