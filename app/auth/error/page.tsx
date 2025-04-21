import Link from 'next/link';

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const { error } = await searchParams;
  const errorMessage = {
    invalid_or_expired:
      'This email confirmation link is invalid or has expired. Please request a new one.',
    missing_params: 'The confirmation link is incomplete. Please try again.',
    default: 'An unknown error occurred. Please contact support.',
  }[error || 'default'];

  return (
    <div className='h-full grid place-content-center bg-black/30'>
      <div className='max-w-md mx-auto p-4 my-auto text-center'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>Error</h1>
        <p className='mb-6 text-white'>{errorMessage}</p>
        <Link
          href='/login'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Request New Confirmation Email
        </Link>
      </div>
    </div>
  );
}
