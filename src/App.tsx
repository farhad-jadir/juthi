import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-luxury-cream selection:bg-primary selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="bg-white py-20 px-6 border-t border-luxury-cream mt-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <span className="font-serif text-2xl font-bold tracking-tighter text-luxury-slate">
                GLAM & GLOW <br /> <span className="text-primary font-normal italic">by Najifa</span>
              </span>
              <p className="text-luxury-gray text-sm mt-6 leading-loose font-light">
                The ultimate destination for premium beauty services in the heart of the city. 
                Experience luxury like never before.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-luxury-slate">Links</h4>
                <ul className="space-y-3 text-sm text-luxury-gray font-light">
                  <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                  <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                  <li><Link to="/reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
                  <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-luxury-slate">Working Hours</h4>
                <ul className="space-y-3 text-sm text-luxury-gray font-light">
                  <li>Mon - Fri: 10am - 8pm</li>
                  <li>Sat: 10am - 6pm</li>
                  <li>Sun: Closed</li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-luxury-slate">Newsletter</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="bg-luxury-cream border-none rounded-xl p-3 text-sm w-full outline-none focus:ring-1 focus:ring-primary" />
                  <button className="bg-luxury-slate text-white px-4 rounded-xl text-xs font-bold uppercase tracking-tighter">Join</button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-luxury-cream mt-16 pt-8 text-center text-[10px] uppercase tracking-widest text-luxury-gray/50 font-medium">
            © 2026 GLAM & GLOW BY NAJIFA. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </div>
    </Router>
  );
}
