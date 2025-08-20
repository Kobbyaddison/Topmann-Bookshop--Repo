export const verifyEmailHtml = (link: string, name: string) => `
  <div style="font-family:Arial,sans-serif">
    <h2>Verify your email</h2>
    <p>Hi ${name}, confirm your email to finish setting up your Topman Bookshop account.</p>
    <p><a href="${link}" style="background:#0d6efd;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Verify Email</a></p>
    <p>If the button doesn't work, paste this link in your browser:<br/>${link}</p>
  </div>
`;
