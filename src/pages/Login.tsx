import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';

const validationRules = {
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
    return undefined;
  },
  password: (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm
  } = useFormValidation(
    { email: '', password: '' },
    validationRules
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (err) {
      setIsSubmitting(false);
    }
  }, [login, navigate, validateForm, values, setIsSubmitting]);

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="button button-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

