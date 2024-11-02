import { ThemeToggle } from "@/theme/ThemeToggle";

const Header = () => {
  return (
    <nav className="flex justify-center items-center p-4 border-b w-full">
      <div className="max-w-7xl mx-auto flex items-center gap-4 justify-between w-full">
        <h1 className="text-xl font-bold">VFAT tracker</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Header;
