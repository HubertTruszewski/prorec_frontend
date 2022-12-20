import Navigation from "./Navigation";

function Layout() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "linear-gradient(blue, black)",
      }}
    >
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
