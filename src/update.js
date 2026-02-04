// Get current version from the version.json file
const CURRENT_VERSION = '1.0.1'; // This should match the version in version.json
const UPDATE_URL = 'https://estim-update-xyz.netlify.app/version.json'; // Replace with your actual Netlify URL

export async function checkUpdate() {
  try {
    const res = await fetch(UPDATE_URL, { cache: 'no-store' });
    const remote = await res.json();

    if (res.ok) {
      console.log("Hello, world");
      
    }

    if (remote.version !== CURRENT_VERSION) {
      return remote;
    }
    return null;
  } catch (e) {
    console.error('Error checking for updates:', e);
    return null;
  }
}