export const metadata = {
  title: "Sanity Studio - AM Teachings",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: "100vh", overflowY: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
