import { FaGithub } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span className="font-bold text-xl">Speech to text to translation</span>
        <div className="flex items-center space-x-4">
          <h6 className="text-sm flex items-center gap-2">
            <a href="https://github.com/bramro/ai-speech-text-translation">View sourcecode on Github</a>
            <FaGithub className="w-4 h-4" />
          </h6>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;