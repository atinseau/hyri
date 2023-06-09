
interface Props {
  children: React.ReactNode
}

export function Document({ children }: Props) {
  return <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div id="app">
        {children}
      </div>
    </body>
  </html>
}