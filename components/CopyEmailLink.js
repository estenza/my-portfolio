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
  document.execCommand('copy');
  input.remove();
}

export default function CopyEmailLink({ className = '' }) {
  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await copyEmail();
      window.dispatchEvent(new CustomEvent('magnifier-cursor-change', {
        detail: { label: 'email скопирован', icon: 'check' },
      }));
    } catch {
      return;
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
      data-cursor-label="скопировать email"
      data-cursor-icon="mail"
    >
      email
    </a>
  );
}
