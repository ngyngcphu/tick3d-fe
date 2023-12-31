import { apiClient, invoke } from './common';

export const authService = {
  login: (data: LoginFormData) => invoke(apiClient.POST('/auth/login', { body: data })),
  logout: () => invoke(apiClient.DELETE('/auth/logout')),
  signUp: (data: SignUpFormData) => invoke(apiClient.POST('/auth/signup', { body: data })),
  createOTP: (userId: string) =>
    invoke(
      apiClient.POST('/auth/otp/generate/{userId}', {
        headers: { 'Content-Type': 'text/plain' },
        params: { path: { userId } }
      })
    ),
  verifyOTP: (userId: string, otp: string) =>
    invoke(
      apiClient.POST('/auth/otp/verify/{userId}', { params: { path: { userId } }, body: { otp } })
    )
};
