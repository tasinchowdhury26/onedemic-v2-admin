import Navbar from "../ui/Navbar";

const RootLayout = ({ children }) => {
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <Navbar />
      <div className="p-2">{children}</div>
    </div>
  );
};

export default RootLayout;
