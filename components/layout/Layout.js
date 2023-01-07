import Navigation from "./Navigation";

function Layout(props) {
  return (
    <div
      style={{
        height: "100vh",
          background: "radial-gradient(190.41% 99.53% at 50% 3.13%, rgba(0, 183, 208, 0.58) 0%, rgba(164, 49, 255, 0.0422917) 92.71%, rgba(46, 67, 255, 0) 100%), #000000;"
      }}
    >
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
