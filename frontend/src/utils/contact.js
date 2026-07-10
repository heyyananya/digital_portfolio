/**
 * Contact details are stored base64-encoded and decoded only on user interaction,
 * so the plain address and number never appear in the served HTML for scrapers.
 */
const ENCODED_EMAIL = 'YW5keXBhdGVsMjQwNkBnbWFpbC5jb20=';
const ENCODED_PHONE = 'KzkxODc4MDIwNDU4OA==';

const decode = (value) => {
  try {
    return window.atob(value);
  } catch {
    return '';
  }
};

export const getEmail = () => decode(ENCODED_EMAIL);
export const getPhone = () => decode(ENCODED_PHONE);

/**
 * Opens a compose window addressed to me. Tries the visitor's own mail client first;
 * if nothing handles `mailto:` (common on desktops with no mail app configured),
 * falls back to Gmail's web compose so the click is never a dead end.
 */
export const openEmail = (subject = '') => {
  const address = getEmail();
  if (!address) return;

  const gmailCompose =
    'https://mail.google.com/mail/?view=cm&fs=1&to=' +
    encodeURIComponent(address) +
    (subject ? `&su=${encodeURIComponent(subject)}` : '');

  const before = Date.now();
  let left = false;
  const onBlur = () => {
    left = true;
  };
  window.addEventListener('blur', onBlur, { once: true });

  window.location.href = `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

  // If the mail client never took focus, the protocol handler is missing.
  window.setTimeout(() => {
    window.removeEventListener('blur', onBlur);
    if (!left && Date.now() - before < 1500) {
      window.open(gmailCompose, '_blank', 'noopener,noreferrer');
    }
  }, 700);
};

/** Opens a WhatsApp chat without ever putting the number in a link the page can leak. */
export const openWhatsApp = (message = "Hi Ananya, I saw your portfolio.") => {
  const number = getPhone().replace(/\D/g, '');
  if (!number) return;
  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
};

/** Dials on mobile, and copies to the clipboard so desktop clicks still do something useful. */
export const openPhone = async () => {
  const number = getPhone();
  if (!number) return false;

  let copied = false;
  try {
    await navigator.clipboard.writeText(number);
    copied = true;
  } catch {
    // Clipboard needs permission/secure context; dialing below is the real action.
  }

  window.location.href = `tel:${number}`;
  return copied;
};
