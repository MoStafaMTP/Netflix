import usersData from '@/data/users.json';
import type { AuthUser, Credentials, RegisterPayload, User } from '@/types';
import { MOCK_LATENCY } from '@/utils/constants';
import { isValidEmail, isValidPassword } from '@/utils/helpers';

const users = usersData as User[];

const withLatency = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY));

const strip = (user: User): AuthUser => {
  const { password: _password, ...rest } = user;
  void _password;
  return rest;
};

export const authService = {
  /** Validate credentials against the mock user list. */
  login: ({ email, password }: Credentials): Promise<AuthUser> => {
    const match = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!match || match.password !== password) {
      return Promise.reject(new Error('Incorrect email or password.'));
    }
    return withLatency(strip(match));
  },

  /** Create a new (in-memory) account. Demo only — not persisted server-side. */
  register: ({ name, email, password }: RegisterPayload): Promise<AuthUser> => {
    if (!isValidEmail(email)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }
    if (!isValidPassword(password)) {
      return Promise.reject(
        new Error('Password must be at least 8 characters and include a number.'),
      );
    }
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return Promise.reject(new Error('An account with this email already exists.'));
    }
    const newUser: AuthUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      avatar: 'https://i.pravatar.cc/150?img=8',
      membership: 'Standard',
      watchHistory: [],
    };
    return withLatency(newUser);
  },
};

export default authService;
