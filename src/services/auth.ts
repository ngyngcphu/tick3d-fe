import { server, invoke } from './common';

export const authService = {
  login: (data: LoginFormData) => invoke(server.post('/auth/login', data)),
  logout: () => invoke(server.post('/auth/logout')),
  signUp: (data: SignUpFormData) => invoke(server.post('/auth/signUp', data))
};
