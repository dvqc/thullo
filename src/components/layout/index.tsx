import Header from "../header";
import Content from "./content";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto flex py-5">
        <Content />
      </main>
    </div>
  );
};

export default Layout;
