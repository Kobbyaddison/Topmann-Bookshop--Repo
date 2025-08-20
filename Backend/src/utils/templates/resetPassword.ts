export const resetPasswordHtml = (link: string, name: string) => `
  <div style="font-family:Arial,sans-serif">
    <h2>Reset your password</h2>
    <p>Hi ${name}, we received a request to reset your password.</p>
    <p><a href="${link}" style="background:#0d6efd;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Create New Password</a></p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <p>Link: ${link}</p>
  </div>
`;
