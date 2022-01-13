export const renderStyles = () => {
  return `
        <style>
        *,
        *:before,
        *:after {
        box-sizing: border-box;
        margin: 0;
        }

        html,
        body {
        height: 100%;
        font-family: 'Helvetica', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        }

        .mail {
        width: 90%;
        min-height: 100%;
        background-color: #fff;
        justify-content: center;
        max-width: 600px;
        height: max-content;
        margin: auto;
        padding-top: 3rem;
        }

        .logo {
        width: 150px;
        margin-bottom: 3rem;
        }

        h1 {
        font-size: 22px;
        font-weight: bold;
        }

        p {
        margin: 1rem 0;
        display: block;
        color: #222 !important;
        }

        .button {
        background: #4589f7;
        padding: 0.4rem 2rem;
        color: #fff !important;
        text-decoration: none;
        border-radius: 10rem;
        margin-left: -1px;
        margin: 2.5rem 0 25px 0;
        display: block;
        width: max-content;
        font-size: 15px !important;
        box-shadow: 0 10px 20px rgba(69, 137, 247, 0.2);
        }
    </style>
    `;
};
