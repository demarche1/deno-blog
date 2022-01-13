import { renderStyles } from "../partials/emailStyle.ts";

function renderEmail({ link }: { link: string }) {
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
          <img src="https://deno.land/logo.svg" alt="Facebook" class="logo" />

          <p>Bem-vindo ao Deno Blog 🦕!</p>

          <p>Seu cadastro está quase pronto, clique no botão abaixo para ativar sua conta.</p>

          <a href="${link}" target="_blank" class="button">Ativar minha conta</a>
        </div>
      </body>
    </html>
    `;
}
export default renderEmail;
