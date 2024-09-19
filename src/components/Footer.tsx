const Footer = () => {
    return (
        <footer className="bg-background-100 text-text-950 py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About Us Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">About Us</h4>
                    <p className="text-sm">
                        At CinePass, we're passionate about movies. Our mission is to make it easier for you to discover the latest releases, explore showtimes, and book your tickets with just a few clicks. Whether you're a fan of blockbusters, indie films, or something in between, we've got you covered.
                    </p>
                    <a href="#" className="text-accent hover:underline mt-2 inline-block">Read More...</a>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-accent">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent">Movies</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent">Theaters</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Social Media</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-light hover:text-accent">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-light hover:text-accent">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-light hover:text-accent">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-light mt-8 pt-4 text-sm text-light">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2024 CinePass. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-accent">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:text-accent">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
