import { type FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearError, loginUser } from '@/redux/slices/userSlice';
import Button from '@/components/Button';
import { LS_KEYS, ROUTES } from '@/utils/constants';
import { isValidEmail } from '@/utils/helpers';

interface FieldErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { current, loading, error } = useAppSelector((s) => s.user);

  const remembered = localStorage.getItem(LS_KEYS.rememberedEmail) ?? '';
  const [email, setEmail] = useState(remembered);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(Boolean(remembered));
  const [errors, setErrors] = useState<FieldErrors>({});

  // Where to go after a successful login (defaults to home).
  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.home;

  useEffect(() => {
    if (current) navigate(from, { replace: true });
  }, [current, from, navigate]);

  useEffect(() => () => void dispatch(clearError()), [dispatch]);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (password.length < 4) next.password = 'Your password is too short.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (remember) localStorage.setItem(LS_KEYS.rememberedEmail, email);
    else localStorage.removeItem(LS_KEYS.rememberedEmail);
    dispatch(loginUser({ email, password }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-lg bg-black/75 p-8 sm:p-12"
    >
      <h1 className="mb-6 text-3xl font-bold">Sign In</h1>

      {error && (
        <div className="mb-4 rounded bg-netflix-red/90 px-4 py-3 text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded bg-netflix-gray-dark px-4 py-3.5 text-white outline-none focus:bg-[#454545]"
          />
          {errors.email && <p className="mt-1 text-xs text-netflix-red">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            aria-invalid={Boolean(errors.password)}
            className="w-full rounded bg-netflix-gray-dark px-4 py-3.5 text-white outline-none focus:bg-[#454545]"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-netflix-red">{errors.password}</p>
          )}
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading} className="!mt-6">
          Sign In
        </Button>

        <label className="flex items-center gap-2 text-sm text-netflix-gray-light">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-netflix-red"
          />
          Remember me
        </label>
      </form>

      <p className="mt-8 text-sm text-netflix-gray">
        New to Netflix?{' '}
        <Link to={ROUTES.register} className="text-white hover:underline">
          Sign up now
        </Link>
        .
      </p>
      <p className="mt-4 rounded bg-netflix-gray-dark/50 p-3 text-xs text-netflix-gray-light">
        Demo account — <strong>mostafa@demo.com</strong> / <strong>Demo1234</strong>
      </p>
    </motion.div>
  );
};

export default Login;
