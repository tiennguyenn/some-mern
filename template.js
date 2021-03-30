export default ({html,css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>MERN</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none;
                color: #061d95
              }
          </style>
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
