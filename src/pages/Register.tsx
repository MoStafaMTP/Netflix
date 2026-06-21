import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearError, registerUser } from '@/redux/slices/userSlice';
import Button from '@/components/Button';
import { ROUTES } from '@/utils/constants';
import { isValidEmail, isValidPassword } from '@/utils/helpers';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current, loading, error } = useAppSelector((s) => s.user);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (current) navigate(ROUTES.home, { replace: true });
  }, [current, navigate]);

  useEffect(() => () => void dispatch(clearError()), [dispatch]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!isValidPassword(form.password))
      next.password = 'Use at least 8 characters with a letter and a number.';
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(
      registerUser({ name: form.name, email: form.email, password: form.password }),
    );
  };

  const field = (
    key: keyof typeof form,
    type: string,
    placeholder: string,
  ) => (
    <div>
      <input
        type={type}
        value={form[key]}
        onChange={update(key)}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={Boolean(errors[key])}
        className="w-full rounded bg-netflix-gray-dark px-4 py-3.5 text-white outline-none focus:bg-[#454545]"
      />
      {errors[key] && <p className="mt-1 text-xs text-netflix-red">{errors[key]}</p>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-lg bg-black/75 p-8 sm:p-12"
    >
      <h1 className="mb-6 text-3xl font-bold">Create Account</h1>

      {error && (
        <div className="mb-4 rounded bg-netflix-red/90 px-4 py-3 text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {field('name', 'text', 'Full name')}
        {field('email', 'email', 'Email')}
        {field('password', 'password', 'Password')}
        {field('confirm', 'password', 'Confirm password')}

        <Button type="submit" fullWidth size="lg" loading={loading} className="!mt-6">
          Sign Up
        </Button>
      </form>

      <p className="mt-8 text-sm text-netflix-gray">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="text-white hover:underline">
          Sign in
        </Link>
        .
      </p>
    </motion.div>
  );
};

export default Register;
