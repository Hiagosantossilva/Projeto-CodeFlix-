import { useEffect, useRef, useState } from 'react';

export default function useInstallApp() {
  const promptRef = useRef(null);
  const [available, setAvailable] = useState(false);
  const [installed, setInstalled] = useState(() =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const mode = window.matchMedia('(display-mode: standalone)');
    const onPrompt = event => {
      event.preventDefault();
      promptRef.current = event;
      setAvailable(true);
    };
    const onInstalled = () => {
      promptRef.current = null;
      setAvailable(false);
      setInstalled(true);
    };
    const onMode = () => setInstalled(mode.matches || window.navigator.standalone === true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    mode.addEventListener('change', onMode);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      mode.removeEventListener('change', onMode);
    };
  }, []);

  async function install() {
    const invitation = promptRef.current;
    if (!invitation || pending) return;
    promptRef.current = null;
    setAvailable(false);
    setPending(true);
    try {
      await invitation.prompt();
      await invitation.userChoice;
    } catch {
      // An invitation may expire; manual installation instructions remain available.
    } finally {
      setPending(false);
    }
  }

  return { available, installed, pending, install };
}
