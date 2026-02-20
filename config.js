export const CONFIG = {
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  PLATFORM_NAME: "SMGPUB℠",
  VERSION: "2.0.0"
};


export const CONFIG = {
  // Production URL for your API on Vercel
  API_BASE: 'https://smgpub-api.vercel.app/api', 
  STRIPE_PUBLIC_KEY: 'pk_live_your_key',
  PLATFORM_NAME: "SMGPUB℠",
  VERSION: "2.0.0"
};
