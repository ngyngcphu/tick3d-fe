import { apiClient, invoke } from './common';

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
