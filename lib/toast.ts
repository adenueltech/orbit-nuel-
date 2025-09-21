import { toast } from 'sonner'

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
}

export const authToasts = {
  loginSuccess: () => toast.success('Welcome back! Taking you to your dashboard...'),
  loginError: (message?: string) => {
    const defaultMessage = 'Oops! The email or password you entered doesn\'t match our records. Please double-check and try again.'
    toast.error(message || defaultMessage)
  },
  accountNotFound: () => toast.error('You don\'t have an account with us yet. Kindly create an account to get started!', {
    action: {
      label: 'Create Account',
      onClick: () => window.location.href = '/auth/signup',
    },
  }),
  signupSuccess: () => toast.success('🎉 Your account has been created! You can now sign in with your credentials.'),
  signupError: (message?: string) => {
    const defaultMessage = 'Something went wrong while creating your account. Please try again.'
    toast.error(message || defaultMessage)
  },
  networkError: () => toast.error('Unable to connect. Please check your internet connection and try again.'),
  serverError: () => toast.error('Our servers are having a moment. Please try again in a few minutes.'),
  unauthorized: () => toast.error('Your session has expired. Please sign in again.'),
  emailExists: () => toast.error('An account with this email already exists. Try signing in instead.'),
}