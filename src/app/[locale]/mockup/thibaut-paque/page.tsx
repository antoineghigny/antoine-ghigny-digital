'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Phone, Mail, Menu, X, 
  ChevronRight, Star, ArrowRight, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

const injectStyles = () => {
  if (document.getElementById('thibaut-mockup-styles')) return;
  const style = document.createElement('style');
  style.id = 'thibaut-mockup-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
    
    .thibaut-mockup-wrapper {
      --bg-color: #faf8f5;
      --text-dark: #09090b;
      --accent-bronze: #8b6f47;
      --accent-bronze-hover: #765e3c;
    }

    .thibaut-mockup-wrapper,
    .thibaut-mockup-wrapper * {
      font-family: 'Outfit', sans-serif;
    }

    .thibaut-mockup-wrapper body {
      background-color: var(--bg-color);
      color: var(--text-dark);
      -webkit-font-smoothing: antialiased;
    }

    html, body { background-color: #faf8f5 !important; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .thibaut-mockup-wrapper .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);
};

const Navbar = ({ currentPath, setCurrentPath }: { currentPath: string; setCurrentPath: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/accueil' },
    { name: 'Le cabinet', path: '/le-cabinet' },
    { name: 'Ostéopathie', path: '/osteopathie' },
    { name: 'Kinésithérapie', path: '/kinesitherapie' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    setCurrentPath(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#8b6f47]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleNav('/accueil')}
          >
            <span className="text-2xl font-bold text-[#09090b]">Thibaut Paque</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#8b6f47] ${
                    currentPath === link.path ? 'text-[#8b6f47]' : 'text-[#09090b]/70'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <a 
              href="https://rosa.be/fr/thibaut-paque" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-bronze text-sm py-2 px-4"
            >
              Prendre RDV
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#09090b] hover:text-[#8b6f47] focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#faf8f5] border-b border-[#8b6f47]/10 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`block w-full text-left px-3 py-3 rounded-xl text-base font-medium ${
                  currentPath === link.path ? 'bg-[#8b6f47]/10 text-[#8b6f47]' : 'text-[#09090b] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 px-3">
              <a 
                href="https://rosa.be/fr/thibaut-paque" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-bronze w-full justify-center"
              >
                Prendre RDV
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setCurrentPath }: { setCurrentPath: (p: string) => void }) => {
  return (
    <footer className="bg-[#f0ebe1] pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-[#09090b] mb-4">Thibaut Paque</h3>
            <p className="text-[#09090b]/70 mb-6">Ostéopathe & Kinésithérapeute</p>
            <div className="flex space-x-4 text-[#8b6f47]">
              <a href="https://rosa.be/fr/thibaut-paque" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] transition-colors">
                Prendre rendez-vous en ligne <ArrowUpRight className="inline w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#09090b] mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Accueil', 'Le cabinet', 'Ostéopathie', 'Kinésithérapie', 'Blog', 'Contact'].map((item, idx) => {
                const paths = ['/accueil', '/le-cabinet', '/osteopathie', '/kinesitherapie', '/blog', '/contact'];
                return (
                  <li key={idx}>
                    <button 
                      onClick={() => { setCurrentPath(paths[idx]); window.scrollTo(0,0); }}
                      className="text-[#09090b]/70 hover:text-[#8b6f47] transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#09090b] mb-4">Coordonnées</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-[#09090b]/70">
                <MapPin className="w-5 h-5 mr-3 text-[#8b6f47] shrink-0 mt-0.5" />
                <span>Place Favresse, 45<br/>1310 La Hulpe</span>
              </li>
              <li className="flex items-center text-[#09090b]/70">
                <Phone className="w-5 h-5 mr-3 text-[#8b6f47] shrink-0" />
                <span>0475 65 28 66</span>
              </li>
              <li className="flex items-center text-[#09090b]/70">
                <Mail className="w-5 h-5 mr-3 text-[#8b6f47] shrink-0" />
                <span>th.paque@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#8b6f47]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#09090b]/50">
          <p>© 2024 Thibaut Paque — Tous droits réservés.</p>
          <p className="flex items-center gap-1.5 mt-2 md:mt-0">
            Site web par{' '}
            <a href="https://antoineghigny.be" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[#8b6f47]/30 hover:text-[#8b6f47] transition-colors">Antoine Ghigny</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const Accordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-[#8b6f47]/20 rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="text-lg font-medium text-[#09090b] pr-4">{item.q}</span>
            <ChevronRight
              className={`w-5 h-5 text-[#8b6f47] shrink-0 transition-transform duration-300 ${
                openIndex === i ? 'rotate-90' : ''
              }`}
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-5 pb-5 text-[#09090b]/70">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = ({ setCurrentPath }: { setCurrentPath: (p: string) => void }) => (
  <div className="animate-fadeIn">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#8b6f47]/10 text-[#8b6f47] font-medium text-sm">
            Ostéopathe & Kinésithérapeute
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#09090b]">
            Votre bien-être au cœur de <span className="text-[#8b6f47]">La Hulpe</span>
          </h1>
          <p className="text-lg text-[#09090b]/70 leading-relaxed max-w-lg">
            Vous cherchez un professionnel de confiance pour vous accompagner vers une meilleure santé ? Thibaut Paque vous accueille dans son cabinet à La Hulpe, en face de la gare. Que ce soit pour une douleur aiguë ou un suivi régulier, vous bénéficiez d'une écoute attentive et de soins personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://rosa.be/fr/thibaut-paque" target="_blank" rel="noopener noreferrer" className="btn-bronze">
              Prenez rendez-vous en ligne
            </a>
            <button onClick={() => { setCurrentPath('/le-cabinet'); window.scrollTo(0,0); }} className="btn-bronze-outline">
              Découvrir le cabinet
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square w-full shadow-2xl">
            <img 
              src="https://static.wixstatic.com/media/035244_f7f4e10885124ca385104edd97aeeabe~mv2.png" 
              alt="Thibaut Paque en consultation" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill={i === 4 ? "currentColor" : "currentColor"} className={i === 4 ? "opacity-50" : ""} size={20} />
              ))}
            </div>
            <div>
              <p className="font-bold text-[#09090b]">4.5/5</p>
              <p className="text-xs text-[#09090b]/60">58 avis Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f5f1ea] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-8 card-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b6f47]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <MapPin className="text-[#8b6f47] w-10 h-10 mb-6" />
            <h3 className="text-2xl font-bold text-[#09090b] mb-2">Place Favresse, 45 — 1310 La Hulpe</h3>
            <p className="text-[#09090b]/70 mb-4 max-w-md">
              Cabinet situé en face de la gare de La Hulpe, au fond de l'allée. Bâtiment de gauche.
            </p>
            <div className="inline-flex items-center bg-[#f0ebe1] px-4 py-2 rounded-xl text-sm text-[#09090b]/80">
              <CheckCircle2 className="w-4 h-4 text-[#8b6f47] mr-2" />
              Parking gratuit (disque bleu) — Possibilité de déposer quelqu'un en voiture dans l'allée.
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 card-shadow">
            <Clock className="text-[#8b6f47] w-10 h-10 mb-6" />
            <h3 className="text-xl font-bold text-[#09090b] mb-2">8h — 20h</h3>
            <p className="text-[#09090b]/70 text-sm mb-2">(horaire variable)</p>
            <p className="text-[#09090b]/60 text-sm italic">
              N'hésitez pas à appeler pour confirmer un créneau.
            </p>
          </div>

          <div className="md:col-span-3 bg-[#8b6f47] rounded-3xl p-8 card-shadow flex flex-col sm:flex-row items-center justify-between text-white">
            <div className="flex items-center gap-6 mb-4 sm:mb-0">
              <div className="bg-white/20 p-4 rounded-full">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white/80 font-medium mb-1">Contact direct</p>
                <p className="text-3xl font-bold">0475 65 28 66</p>
              </div>
            </div>
            <a href="tel:0475652866" className="bg-white text-[#8b6f47] px-8 py-4 rounded-full font-bold hover:bg-[#faf8f5] transition-colors w-full sm:w-auto text-center">
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#09090b] mb-4">Pourquoi choisir ce cabinet ?</h2>
        <div className="w-24 h-1 bg-[#8b6f47] mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Thérapeute de première ligne", text: "Pas besoin de prescription médicale pour consulter en ostéopathie. Vous venez directement, sans passer par votre médecin traitant." },
          { title: "Double compétence", text: "Ostéopathe et kinésithérapeute, Thibaut vous propose une approche complète pour traiter l'ensemble de vos douleurs, du diagnostic à la rééducation." },
          { title: "Suivi personnalisé", text: "Chaque patient est unique. Les séances s'adaptent à vos besoins, avec des techniques douces et respectueuses de votre corps." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl card-shadow border border-[#8b6f47]/10">
            <div className="w-12 h-12 rounded-2xl bg-[#f5f1ea] flex items-center justify-center mb-6 text-[#8b6f47] font-bold text-xl">
              {i + 1}
            </div>
            <h3 className="text-xl font-bold text-[#09090b] mb-4">{item.title}</h3>
            <p className="text-[#09090b]/70 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white border-y border-[#8b6f47]/10 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center text-yellow-400 mb-6 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} fill={i < 4 ? "currentColor" : "none"} className={i === 4 ? "text-yellow-400" : ""} size={32} />
          ))}
        </div>
        <h3 className="text-2xl font-bold text-[#09090b] mb-2">4.5/5 — 58 avis Google</h3>
        <blockquote className="text-xl md:text-2xl text-[#09090b]/80 italic font-light mt-8">
          "Les patients apprécient l'écoute, la douceur des manipulations et les résultats durables."
        </blockquote>
      </div>
    </section>
  </div>
);

const Cabinet = () => (
  <div className="animate-fadeIn">
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://static.wixstatic.com/media/917cdb_2f72cfa065f0489baeb159bf20b6d602~mv2.jpg" 
          alt="Cabinet Thibaut Paque" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#09090b]/50"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Votre cabinet à La Hulpe</h1>
        <p className="text-xl text-white/90 font-medium">Un espace chaleureux pour votre bien-être</p>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#09090b] mb-4">Découvrez les lieux</h2>
          <div className="w-16 h-1 bg-[#8b6f47] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[250px]">
          <div className="md:row-span-2 rounded-3xl overflow-hidden shadow-md group">
            <img src="https://static.wixstatic.com/media/917cdb_12cfb7b21ff24b93893e55c675770c1a~mv2.jpg" alt="Vue cabinet 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md group">
            <img src="https://static.wixstatic.com/media/917cdb_b96ea2972d5143b68b962fe369ffc105~mv2.png" alt="Vue cabinet 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-md group">
              <img src="https://static.wixstatic.com/media/917cdb_9105770b5eba4f63a036bc9c5da33406~mv2.jpg" alt="Vue cabinet 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md group">
              <img src="https://static.wixstatic.com/media/917cdb_0486e36c6e514abe8ce3ca775be73515~mv2.jpg" alt="Détail cabinet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow border border-[#8b6f47]/10 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-20 h-20 bg-[#8b6f47]/10 rounded-full flex items-center justify-center shrink-0">
          <MapPin className="w-10 h-10 text-[#8b6f47]" />
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-[#09090b]">Accès au cabinet</h3>
          <ul className="space-y-3 text-[#09090b]/80">
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-[#8b6f47] mr-3 mt-0.5 shrink-0" /> Le cabinet se situe au numéro 45, au fond de l'allée. Bâtiment de gauche, en face d'Ozon 2000.</li>
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-[#8b6f47] mr-3 mt-0.5 shrink-0" /> Vous pouvez rentrer sans sonner.</li>
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-[#8b6f47] mr-3 mt-0.5 shrink-0" /> Parking gratuit disque bleu disponible dans la rue.</li>
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-[#8b6f47] mr-3 mt-0.5 shrink-0" /> Accès direct depuis la gare de La Hulpe (le cabinet est en face).</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
);

const Osteopathy = () => (
  <div className="animate-fadeIn">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full shadow-xl">
          <img 
            src="https://static.wixstatic.com/media/035244_0e1bb186604048af82e5dce8c833d568~mv2.png" 
            alt="Séance d'ostéopathie" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#09090b]">L'ostéopathie pour vous</h1>
          <div className="inline-block px-4 py-2 rounded-xl bg-[#8b6f47]/10 text-[#8b6f47] font-bold text-lg">
            65€ la séance (30-45 min)
          </div>
          <p className="text-lg text-[#09090b]/70 leading-relaxed">
            Vous avez mal au dos, une entorse qui traîne, des troubles digestifs ou un stress chronique ? Thibaut vous aide à retrouver votre équilibre. L'ostéopathie agit sur l'ensemble de votre corps, avec des techniques douces et personnalisées.
          </p>
          <a href="https://rosa.be/fr/thibaut-paque" target="_blank" rel="noopener noreferrer" className="btn-bronze mt-4">
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>

    <section className="bg-[#f5f1ea] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#09090b] mb-4">Domaines d'intervention</h2>
          <div className="w-16 h-1 bg-[#8b6f47] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Système orthopédique", text: "Entorses, tendinites, lombalgies, dorsalgies, cervicalgies, douleurs articulaires (épaule, genou…), pubalgies, douleurs au coccyx, douleurs maxillaires." },
            { title: "Système neurologique", text: "Névralgies cervico-brachiales, intercostales, faciales, d'Arnold, cruralgies, sciatiques…" },
            { title: "Système digestif", text: "Ballonnements, hernie hiatale, flatulences, coliques, constipation, digestion difficile…" },
            { title: "Système ORL et pulmonaire", text: "Vertiges, bourdonnements, céphalées, migraines, bronchites, asthme, sinusites…" },
            { title: "Système neuro-végétatif", text: "États d'hyper nervosité, anxiété, stress, troubles du sommeil…" },
            { title: "Traumatismes et séquelles", text: "Chutes, accidents de voiture…" },
            { title: "Femmes enceintes", text: "Préparation à l'accouchement, relâchement du dos et du bassin." },
            { title: "Enfants et nourrissons", text: "Bébés, nourrissons : reflux, constipation, troubles du sommeil." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl card-shadow border-l-4 border-[#8b6f47]">
              <h3 className="text-lg font-bold text-[#09090b] mb-2">{item.title}</h3>
              <p className="text-[#09090b]/70 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-[#09090b] mb-12">Questions fréquentes</h2>
      <Accordion items={[
        { q: "Est-ce que ça fait mal ? On m'a dit que l'ostéo « craque » les articulations, ça me fait peur !", a: "Tous les ostéopathes n'utilisent pas les techniques de thrust (craquer). Thibaut fait partie de ceux qui privilégient la douceur : étirements, mobilisations, points de pression… Le principe non-douleur est respecté pour tous, des bébés aux adultes. Dans certains cas et seulement après votre accord, des manipulations peuvent être réalisées, mais toujours en douceur." },
        { q: "Que pourrais-je ressentir après la séance ?", a: "Une séance d'ostéopathie travaille en profondeur et libère les tensions. Le jour même, vous pouvez ressentir une fatigue, une sensation de froid ou de chaud. Les jours suivants, des courbatures ou des douleurs qui voyagent sont possibles — c'est votre corps qui se réorganise. Comptez minimum 15 jours pour ressentir les bienfaits, c'est pourquoi les séances sont souvent espacées d'un mois." },
        { q: "Combien de temps dure une séance et quel est le tarif ?", a: "Une séance dure entre 30 et 45 minutes maximum selon votre motif de consultation. Le tarif est de 65€. Vous recevrez une attestation de soin pour vous faire rembourser par votre mutuelle. Un supplément peut être demandé pour les consultations en dehors des heures normales." }
      ]} />
    </section>
  </div>
);

const Kinesitherapy = () => (
  <div className="animate-fadeIn">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#09090b]">La kinésithérapie pour vous</h1>
          <p className="text-lg text-[#09090b]/70 leading-relaxed">
            Vous sortez d'une opération, d'une fracture ou vous souffrez d'une affection chronique ? La kinésithérapie vous offre des solutions adaptées, de la rééducation post-traumatique au traitement des troubles maxillo-faciaux.
          </p>
          <a href="https://rosa.be/fr/thibaut-paque" target="_blank" rel="noopener noreferrer" className="btn-bronze mt-4">
            Prendre rendez-vous
          </a>
        </div>
        <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden aspect-[4/3] w-full shadow-xl">
          <img 
            src="https://static.wixstatic.com/media/917cdb_2f72cfa065f0489baeb159bf20b6d602~mv2.jpg" 
            alt="Cabinet de kinésithérapie" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section className="bg-[#f5f1ea] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#09090b] mb-4">Prise en charge</h2>
          <div className="w-16 h-1 bg-[#8b6f47] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Rééducation post-traumatique", text: "Entorse, fracture, tendinite…" },
            { title: "Rééducation post-chirurgicale", text: "Suite à une opération, pour retrouver votre mobilité." },
            { title: "Rééducation rachidienne", text: "Dos, cervicales, lombaires." },
            { title: "Rééducation cutanée et des brûlés", text: "Traitement des cicatrices et des brûlures." },
            { title: "Affections respiratoires", text: "Enfant et adulte : bronchite, asthme, drainage." },
            { title: "Affections circulatoires", text: "Drainage lymphatique, jambes lourdes." },
            { title: "Affections rhumatismales", text: "Arthrose, polyarthrite…" },
            { title: "Troubles maxillo-faciaux (ATM)", text: "Mâchoire douloureuse, qui craque, qui se déboite." },
            { title: "Incontinence urinaire", text: "Traitement par ondes électromagnétiques pulsées." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl card-shadow border border-[#8b6f47]/5 hover:border-[#8b6f47]/30 transition-colors">
              <h3 className="text-lg font-bold text-[#09090b] mb-2">{item.title}</h3>
              <p className="text-[#09090b]/70 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-[#09090b] mb-12">Informations pratiques</h2>
      <Accordion items={[
        { q: "Les séances sont-elles remboursées ? Faut-il une prescription médicale ?", a: "Oui, les séances sont remboursées partiellement. La plupart des mutuelles octroient une intervention. Thibaut vous fournit l'attestation pour en bénéficier. Attention : contrairement à l'ostéopathie, la kinésithérapie nécessite une prescription médicale." },
        { q: "Quelle est la différence entre kinésithérapie et ostéopathie ?", a: "En dehors de la nécessité d'une prescription médicale pour la kinésithérapie, deux aspects les distinguent : 1) Les techniques d'ostéopathie sont variées et ne ciblent pas exclusivement la région douloureuse. 2) L'ostéopathe est formé pour la prise en charge de phénomènes aigus afin d'obtenir un soulagement rapide." }
      ]} />
    </section>
  </div>
);

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const articles = [
    { title: "Comment bien dormir ?... les solutions", date: "9 nov. 2022", category: "Médecine Fonctionnelle", excerpt: "Les troubles du sommeil doivent être traités le plus rapidement possible. Il y a toujours des solutions même si cela fait des années que ça dure." },
    { title: "La constipation chronique... les solutions !", date: "8 nov. 2022", category: "Médecine Fonctionnelle", excerpt: "Face à une constipation chronique, toujours agir le plus rapidement possible afin d'éviter de partir sur des médicaments plus chimiques néfastes pour la flore intestinale." },
    { title: "Position assise... les solutions", date: "26 oct. 2022", category: "Ostéo/Kiné", excerpt: "Survivre à la position assise. Vous l'aurez lu ailleurs, il n'y a pas de bonne position assise." },
    { title: "La position assise tue... le dos !", date: "25 oct. 2022", category: "Ostéo/Kiné", excerpt: "Internet et la position assise. Cette vidéo visionnée par des milliers de personnes ne dénonce pas le vrai problème : c'est la position qui est le problème !" },
    { title: "Trouble déficitaire de l'attention avec ou sans hyperactivité : enfants TDAH", date: "20 oct. 2022", category: "Alimentation", excerpt: "Petit livre très complet disponible au cabinet. Troubles déficitaires de l'attention et hyperactivité, mythe ou réalité ?" },
    { title: "Et si c'était la thyroïde ?!", date: "20 oct. 2022", category: "Médecine Fonctionnelle", excerpt: "La dépression, le surpoids, les troubles digestifs, les douleurs, l'épuisement total... Et si c'était la thyroïde ?!" },
    { title: "Épicondylite du coude", date: "21 oct. 2022", category: "Ostéo/Kiné", excerpt: "Quels sont les meilleurs traitements ? Adaptation du plan de travail : ordinateur, souris, siège, etc., dès que possible." },
    { title: "Entorse de cheville", date: "21 oct. 2022", category: "Ostéo/Kiné", excerpt: "L'entorse de la cheville est la première cause de consultation au monde aux urgences. Bien souvent, ni la radio ni le plâtre ne sont nécessaires." },
    { title: "Des protéines au petit déj", date: "21 oct. 2022", category: "Alimentation", excerpt: "Manque de motivation, énergie fluctuante, grignotages, prise de poids... Et si un petit-déjeuner protéiné vous permettait de mettre fin à cette spirale ?" }
  ];

  const categories = ['Tous', 'Médecine Fonctionnelle', 'Ostéo/Kiné', 'Alimentation'];

  const filteredArticles = activeFilter === 'Tous' 
    ? articles 
    : articles.filter(a => a.category === activeFilter);

  return (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#09090b] mb-6">Que voulez-vous savoir ?</h1>
        <p className="text-lg text-[#09090b]/70">
          Vous trouverez ici des articles pour vous informer et mieux comprendre vos maux et douleurs. L'objectif : vous aider à atteindre une santé optimale.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat 
                ? 'bg-[#8b6f47] text-white' 
                : 'bg-white text-[#09090b]/70 hover:bg-[#8b6f47]/10 border border-[#8b6f47]/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, i) => (
          <article key={i} className="bg-white p-8 rounded-3xl card-shadow border border-[#8b6f47]/10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
            <div className="mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                article.category === 'Médecine Fonctionnelle' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                article.category === 'Ostéo/Kiné' ? 'bg-green-100 text-green-800 border-green-200' :
                'bg-orange-100 text-orange-800 border-orange-200'
              }`}>
                {article.category}
              </span>
              <span className="text-xs text-[#09090b]/50 ml-3">{article.date}</span>
            </div>
            <h3 className="text-xl font-bold text-[#09090b] mb-3 leading-tight cursor-pointer hover:text-[#8b6f47] transition-colors">
              {article.title}
            </h3>
            <p className="text-[#09090b]/70 text-sm mb-6 flex-grow">
              {article.excerpt}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="text-[#8b6f47] font-medium text-sm flex items-center hover:underline group">
                Lire l'article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center text-[#09090b]/50 py-12">
          Aucun article trouvé dans cette catégorie.
        </div>
      )}
    </div>
  );
};

const Contact = () => (
  <div className="animate-fadeIn">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-16">
        
        <div>
          <h1 className="text-4xl font-bold text-[#09090b] mb-4">Une question ? Un rendez-vous ?</h1>
          <p className="text-[#09090b]/70 mb-8">
            Appelez-moi ou envoyez-moi un message. Je mets tout en œuvre pour vous répondre le jour même.
          </p>

          <form className="space-y-5 bg-white p-8 rounded-3xl card-shadow border border-[#8b6f47]/10" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-[#09090b] mb-1">Nom</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-[#8b6f47]/20 focus:outline-none focus:border-[#8b6f47] focus:ring-1 focus:ring-[#8b6f47] transition-colors" placeholder="Votre nom" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#09090b] mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-[#8b6f47]/20 focus:outline-none focus:border-[#8b6f47] focus:ring-1 focus:ring-[#8b6f47] transition-colors" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#09090b] mb-1">Téléphone</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-[#8b6f47]/20 focus:outline-none focus:border-[#8b6f47] focus:ring-1 focus:ring-[#8b6f47] transition-colors" placeholder="0475 65 28 66" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#09090b] mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-[#8b6f47]/20 focus:outline-none focus:border-[#8b6f47] focus:ring-1 focus:ring-[#8b6f47] transition-colors resize-none" placeholder="Comment puis-je vous aider ?"></textarea>
            </div>
            <button type="submit" className="btn-bronze w-full justify-center mt-2">
              Envoyer
            </button>
            <p className="text-xs text-center text-[#09090b]/50 mt-4">
              Préférez un rendez-vous immédiat ? Utilisez la <a href="https://rosa.be/fr/thibaut-paque" className="text-[#8b6f47] underline">prise de rendez-vous en ligne</a>.
            </p>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-[#8b6f47] rounded-3xl p-8 lg:p-10 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-8">Coordonnées</h3>
            <ul className="space-y-6">
              <li className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Téléphone</p>
                  <p className="font-semibold text-lg">0475 65 28 66</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-lg">th.paque@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Adresse</p>
                  <p className="font-semibold text-lg leading-tight">Place Favresse, 45<br/>1310 La Hulpe</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Horaires</p>
                  <p className="font-semibold text-lg">8h — 20h <span className="text-sm font-normal text-white/80">(variable)</span></p>
                </div>
              </li>
            </ul>
            <div className="mt-10 pt-8 border-t border-white/20">
              <a href="https://rosa.be/fr/thibaut-paque" target="_blank" rel="noopener noreferrer" className="bg-white text-[#8b6f47] px-6 py-3 rounded-full font-bold hover:bg-[#f0ebe1] transition-colors w-full flex justify-center items-center">
                Prendre rendez-vous en ligne
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section className="bg-[#f5f1ea] py-20 border-t border-[#8b6f47]/10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#09090b] mb-12">Questions fréquentes</h2>
        <Accordion items={[
          { q: "Je n'arrive pas à prendre rendez-vous, je souhaite être reçu en urgence, j'ai une question…", a: "Il est toujours possible de joindre Thibaut au 0475/65 28 66. Il met tout en œuvre pour vous répondre le jour même." },
          { q: "Les séances sont-elles remboursées ? Faut-il une prescription de mon médecin ?", a: "Oui, les séances sont remboursées partiellement. La plupart des mutuelles octroient une intervention. Thibaut vous fournit l'attestation pour en bénéficier. Non, les séances d'ostéopathie ne doivent pas être prescrites par le médecin — vous pouvez venir directement. L'ostéopathe est un thérapeute de première ligne, comme votre dentiste. (Pour la kinésithérapie, une prescription est nécessaire.)" },
          { q: "Quelle est la différence entre kinésithérapie et ostéopathie ?", a: "En dehors de la nécessité d'une prescription médicale pour la kinésithérapie, l'ostéopathie s'en distingue par deux aspects : 1) Les techniques d'ostéopathie sont variées et ne ciblent pas exclusivement la région douloureuse. 2) L'ostéopathe est formé pour la prise en charge de phénomènes aigus afin d'obtenir un soulagement rapide." }
        ]} />
      </div>
    </section>
  </div>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState('/accueil');

  useEffect(() => {
    injectStyles();
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/accueil': return <Home setCurrentPath={setCurrentPath} />;
      case '/le-cabinet': return <Cabinet />;
      case '/osteopathie': return <Osteopathy />;
      case '/kinesitherapie': return <Kinesitherapy />;
      case '/blog': return <Blog />;
      case '/contact': return <Contact />;
      default: return <Home setCurrentPath={setCurrentPath} />;
    }
  };

  return (
    <div className="thibaut-mockup-wrapper min-h-screen flex flex-col relative overflow-x-hidden">
      <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setCurrentPath={setCurrentPath} />
    </div>
  );
}
