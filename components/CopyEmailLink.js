import { addToast } from '@heroui/toast';

const email = 'estenza@gmail.com';

async function copyEmail() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(email);
    return;
  }

  const input = document.createElement('textarea');
  input.value = email;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  try {
    if (!document.execCommand('copy')) throw new Error('Copy failed');
  } finally {
    input.remove();
  }
}

export default function CopyEmailLink({ className = '' }) {
  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await copyEmail();
      addToast({ title: 'Email скопирован', timeout: 2500 });
    } catch {
      return;
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
    >
      Email
    </a>
  );
}
