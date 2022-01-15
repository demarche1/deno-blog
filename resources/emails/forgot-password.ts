import { renderStyles } from "../partials/emailStyle.ts";

function renderForgotPasswordEmail({
  link,
  name,
}: {
  link: string;
  name: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${renderStyles()}
      </head>
      <body>
        <div class="mail">
          <img src="https://deno.land/logo.svg" alt="DenoJS" class="logo" />

          <p>Olá ${name}</p>

          <p>Clique no botão abaixo para recuperar sua conta.</p>

          <a href="${link}" target="_blank" class="button">Ativar minha conta</a>
        </div>
      </body>
    </html>
    `;
}

export default renderForgotPasswordEmail;
