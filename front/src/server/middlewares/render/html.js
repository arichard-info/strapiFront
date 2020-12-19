export default ({ html = "", css = "", head = "", structure = "" }) =>
  `<!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <link rel="stylesheet" href="/assets/style.css" />
            ${head}
            <style>${css}</style>
        </head>
        <body>
            <div id="_app">
                ${html}
            </div>
            <script id="_data" type="application/json">
                ${JSON.stringify(structure)}
            </script>
            <script src="/client/client.js"></script>
        </body>
    </html>
    `;
