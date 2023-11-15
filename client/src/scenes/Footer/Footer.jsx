import { AiOutlineGithub } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';


export const Footer = () => {
    return (
        <footer className="bg-gray-200 text-black py-4 border-t-4 border-indigo-200">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4">
                    <a href="https://github.com/aeghin" target="_blank" rel="noreferrer" className="hover:text-gray-400 scale-150">
                        <AiOutlineGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/edward-castaneda-1b18a9100" target="_blank" rel="noreferrer" className="hover:text-gray-400 scale-150">
                        <BsLinkedin />
                    </a>
                </div>
                <p className="mt-2">
                    &copy; {new Date().getFullYear()} TrackX. All rights reserved.
                </p>
            </div>
        </footer>
    );
};





