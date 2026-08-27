import { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import Services from './components/Services/Services.jsx';
import Projects from './components/Projects/Projects.jsx';
import Feedbacks from './components/Feedbacks/Feedbacks.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx';

function App() {
  const [lang, setLang] = useState('en');

  // Keep the root <html> element in sync with the active language so
  // assistive tech, browser UI, and CSS that targets [dir] all get the
  // correct value on load, on switch, and after a refresh — not just an
  // inner container.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <div className="app" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Home lang={lang} />
        <Services lang={lang} />
        <Projects lang={lang} />
        <Feedbacks lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}

export default App;
