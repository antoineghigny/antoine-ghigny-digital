'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Truck,
  Sparkles,
  PackageCheck,
  Heart
} from 'lucide-react';

const injectStyles = () => {
  if (document.getElementById('elie-mockup-styles')) return;
  const style = document.createElement('style');
  style.id = 'elie-mockup-styles';
  style.innerHTML = `
    @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

    .elie-mockup-wrapper {
      --font-display: 'Cabinet Grotesk', sans-serif;
      --font-body: 'Outfit', sans-serif;
      font-family: var(--font-body);
      color: #09090b;
      background-color: #f8f9fa;
      -webkit-font-smoothing: antialiased;
    }
    .elie-mockup-wrapper * { font-family: inherit; }
    .elie-mockup-wrapper h1, .elie-mockup-wrapper h2, .elie-mockup-wrapper h3, .elie-mockup-wrapper h4, .elie-mockup-wrapper .font-display {
      font-family: var(--font-display) !important;
    }
    .elie-mockup-wrapper html { scroll-behavior: smooth; }
    .elie-mockup-wrapper input,
    .elie-mockup-wrapper select,
    .elie-mockup-wrapper textarea { font-family: var(--font-body); }
    .elie-mockup-wrapper nav button { background: none; border: none; padding: 0; cursor: pointer; font-family: var(--font-body); }
    .elie-mockup-wrapper nav button:focus-visible { outline: 2px solid #f59e0b; outline-offset: 2px; }
    @media (max-width: 767px) {
      .elie-mockup-wrapper .nav-desktop { display: none !important; }
    }
    @media (min-width: 768px) {
      .elie-mockup-wrapper .nav-mobile-btn { display: none !important; }
    }
  `;
  document.head.appendChild(style);
};

const SERVICES_DATA = [
  {
    id: 'nettoyage-complet',
    category: 'Nettoyage',
    title: 'Nettoyage intérieur et extérieur',
    shortDesc: 'Sols, murs, sanitaires, façades et terrasses. Un nettoyage en profondeur de la cave au grenier.',
    description: "J'assure un nettoyage complet de vos espaces intérieurs et extérieurs. À l'intérieur : sols, murs, poussières, surfaces, sanitaires — chaque recoin est passé en revue avec soin. À l'extérieur : allées, terrasses, façades, mobilier de jardin. Le matériel de nettoyage adapté est apporté sur place. Résultat garanti : un espace propre, sain et agréable à vivre.",
    cta: 'Je veux un devis nettoyage',
    icon: Home
  },
  {
    id: 'nettoyage-terrasse',
    category: 'Nettoyage',
    title: 'Nettoyage terrasse et allée',
    shortDesc: 'Haute pression, traitement anti-mousse. Retrouvez la couleur d\'origine de vos extérieurs.',
    description: "Les terrasses et allées prennent une patine grise avec le temps, la mousse s'installe. J'interviens avec du matériel adapté (nettoyeur haute pression, brosses spécifiques) pour retrouver la couleur originelle de vos pierres, bois ou carrelages. Le traitement anti-mousse est inclus.",
    cta: 'Raviver ma terrasse',
    icon: Sparkles
  },
  {
    id: 'nettoyage-demenagement',
    category: 'Nettoyage',
    title: 'Nettoyage après déménagement',
    shortDesc: 'Remise à neuf après départ ou avant emménagement pour une transition sereine.',
    description: "Un déménagement laisse toujours des traces. Je prends en charge le nettoyage complet de votre ancien ou nouveau logement après le départ des cartons. Tout est passé au crible : cuisine, sanitaires, sols, vitres. Le logement est rendu dans un état irréprochable.",
    cta: 'Programmer un nettoyage',
    icon: Sparkles
  },
  {
    id: 'nettoyage-vitres',
    category: 'Nettoyage',
    title: 'Nettoyage de vitres',
    shortDesc: 'Vitres intérieures et extérieures sans traces, cadres et rebords dépoussiérés.',
    description: "Des vitres propres changent la luminosité d'une pièce. Je nettoie vos vitres intérieures et extérieures (rez-de-chaussée), sans traces ni coulures. Les cadres et rebords sont également dépoussiérés et essuyés. Le matériel professionnel garantit un résultat net.",
    cta: 'Des vitres impeccables',
    icon: Sparkles
  },
  {
    id: 'aide-demenagement',
    category: 'Manutention',
    title: 'Aide au déménagement',
    shortDesc: 'Renfort musculaire pour porter, charger et décharger vos meubles le jour J.',
    description: "Déménager seul est épuisant et risqué. Je vous aide le jour J : port des cartons et meubles, chargement du camion, déchargement à destination. J'apporte le renfort musculaire et logistique dont vous avez besoin. Les objets fragiles sont manipulés avec précaution.",
    cta: 'J\'ai besoin d\'aide',
    icon: PackageCheck
  },
  {
    id: 'transport',
    category: 'Transport',
    title: "Transport d'objets et meubles",
    shortDesc: 'Déplacement de biens encombrants en toute sécurité dans le Brabant Wallon.',
    description: "Vous avez un meuble à récupérer, un objet encombrant à déplacer ? J'assure le transport de vos biens avec mon véhicule adapté. Les objets sont calés, sanglés et protégés pour éviter les chocs. Livraison à domicile ou dépôt en magasin, facturé au trajet.",
    cta: 'Transporter mes biens',
    icon: Truck
  }
];

interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  description: string;
  cta: string;
  icon: React.ElementType;
}

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;

  const toggleCard = () => setIsOpen(!isOpen);

  const toggleChevron = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
      <div 
        className="p-6 md:p-8 cursor-pointer flex flex-col"
        onClick={toggleCard}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="p-3.5 bg-zinc-50/80 rounded-2xl text-[#1a365d] border border-zinc-100">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <button 
            onClick={toggleChevron}
            className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-[#1a365d] hover:bg-zinc-100 transition-colors"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </div>
        
        <h3 className="font-display font-bold text-xl md:text-2xl text-[#1a365d] mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="text-base text-zinc-600 leading-relaxed">
          {service.shortDesc}
        </p>

        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="pt-5 mt-4 border-t border-zinc-100">
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">
                {service.description}
              </p>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-[#f59e0b] font-bold text-sm hover:text-[#d97706] transition-colors group"
              >
                {service.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    injectStyles();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1000);
  };

  const nettoyage = SERVICES_DATA.filter(s => s.category === 'Nettoyage');
  const manutention = SERVICES_DATA.filter(s => s.category === 'Manutention');
  const transport = SERVICES_DATA.filter(s => s.category === 'Transport');

  return (
    <div className="elie-mockup-wrapper min-h-[100dvh] flex flex-col relative selection:bg-[#f59e0b]/30 selection:text-[#1a365d]">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[90rem] mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => scrollTo('hero')}
            className="font-display font-extrabold text-2xl text-[#1a365d] tracking-tight"
          >
            Elie Yoka.
          </button>

          <nav className="nav-desktop flex items-center gap-8 bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-zinc-200/50 shadow-sm">
            <button onClick={() => scrollTo('pourquoi-moi')} className="text-sm font-medium text-zinc-600 hover:text-[#1a365d] transition-colors">Pourquoi moi</button>
            <button onClick={() => scrollTo('services')} className="text-sm font-medium text-zinc-600 hover:text-[#1a365d] transition-colors">Mes services</button>
            <button onClick={() => scrollTo('contact')} className="text-sm font-medium text-zinc-600 hover:text-[#1a365d] transition-colors">Contact</button>
          </nav>
          
          <div className="nav-desktop flex items-center gap-6">
            <a href="tel:+32466494536" className="text-[#1a365d] font-bold flex items-center gap-2 hover:text-[#f59e0b] transition-colors">
              <Phone size={18} />
              +32 466 49 45 36
            </a>
            <button 
              onClick={() => scrollTo('contact')}
              className="bg-[#1a365d] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#112440] transition-colors shadow-sm"
            >
              Devis rapide
            </button>
          </div>

          <button 
            className="nav-mobile-btn md:hidden text-zinc-900 p-2 bg-white/80 backdrop-blur-md rounded-full border border-zinc-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-28 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-2xl">
              <button onClick={() => scrollTo('pourquoi-moi')} className="text-left font-display font-bold text-[#1a365d]">Pourquoi moi</button>
              <button onClick={() => scrollTo('services')} className="text-left font-display font-bold text-[#1a365d]">Mes services</button>
              <button onClick={() => scrollTo('contact')} className="text-left font-display font-bold text-[#1a365d]">Contact</button>
              
              <div className="pt-8 mt-4 border-t border-zinc-100 flex flex-col gap-4">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="bg-[#1a365d] text-white py-4 rounded-2xl font-medium text-center text-lg"
                >
                  Demander un devis
                </button>
                <a 
                  href="tel:+32466494536" 
                  className="bg-zinc-50 text-[#1a365d] py-4 rounded-2xl font-medium text-center border border-zinc-200 text-lg flex items-center justify-center gap-3"
                >
                  <Phone size={20} />
                  +32 466 49 45 36
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        
        {/* HERO */}
        <section id="hero" className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 max-w-[90rem] mx-auto w-full flex flex-col justify-center overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="z-10 relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-medium text-zinc-600 mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Disponible • Brabant Wallon
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5rem] text-[#1a365d] leading-[1.05] tracking-tight mb-6">
                Je nettoie, je porte,<br />
                <span className="text-[#f59e0b]">je transporte.</span>
              </h1>
              <h2 className="text-zinc-400 font-medium text-4xl sm:text-5xl lg:text-6xl -mt-2 mb-6 block leading-tight">
                Vous, vous respirez.
              </h2>

              <p className="text-zinc-600 text-lg sm:text-xl leading-relaxed max-w-lg mb-10">
                Un coup de main pour votre maison, votre bureau ou votre déménagement. Pas de plateforme, pas d'agence : un étudiant du coin, motivé, assuré, et disponible ce week-end.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_8px_30px_-4px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  Obtenir mon devis gratuit
                  <ArrowRight size={20} />
                </button>
                
                <div className="flex flex-col gap-1 text-sm text-zinc-500">
                  <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className="text-[#1a365d]" /> Réponse sous 24h — max</span>
                  <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className="text-[#1a365d]" /> Je me déplace chez vous</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-zinc-200 animate-pulse"></div>
                <img 
                  src="https://picsum.photos/id/210/1000/1200" 
                  alt="Espace de vie propre et accueillant" 
                  className="w-full h-full object-cover relative z-10"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white">
                  Photo du résultat à ajouter
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-auto sm:-bottom-10 sm:-left-12 z-30 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/40 w-auto max-w-[320px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a365d] flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#1a365d] text-lg leading-tight">Un seul contact.</p>
                    <p className="text-zinc-500 text-sm font-medium">Zéro tracas pour vous.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md">Nettoyage</span>
                  <span className="text-xs font-bold px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md">Manutention</span>
                  <span className="text-xs font-bold px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md">Transport</span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* BANDEAU CONFIANCE */}
        <section className="bg-[#1a365d] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex items-center gap-5 md:justify-center pt-4 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#f59e0b] flex items-center justify-center shrink-0">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg">Matériel inclus</h4>
                  <p className="text-zinc-400 text-sm leading-snug mt-1">Je viens avec tout le nécessaire. Vous n'avez rien à prévoir.</p>
                </div>
              </div>
              <div className="flex items-center gap-5 md:justify-center pt-4 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#f59e0b] flex items-center justify-center shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg">Assurance RC</h4>
                  <p className="text-zinc-400 text-sm leading-snug mt-1">Vos biens sont couverts pendant mon intervention.</p>
                </div>
              </div>
              <div className="flex items-center gap-5 md:justify-center pt-4 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#f59e0b] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-lg">Paiement après</h4>
                  <p className="text-zinc-400 text-sm leading-snug mt-1">Vous réglez quand le travail est fait, pas avant.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POURQUOI MOI */}
        <section id="pourquoi-moi" className="py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-[#1a365d] mb-6 tracking-tight leading-[1.1]">
                  Vous perdez vos <br />
                  <span className="text-[#f59e0b]">week-ends à ranger ?</span>
                </h2>
                <p className="text-lg md:text-xl text-zinc-600 mb-10 leading-relaxed">
                  Le temps est votre ressource la plus précieuse. Pourquoi le passer à frotter une terrasse, trier des cartons ou louer un camion ? En tant qu'étudiant indépendant, j'offre une solution locale, humaine et redoutablement efficace.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#1a365d] text-xl mb-1">Flexibilité totale (soirs & WE)</h4>
                      <p className="text-zinc-600">Je m'adapte à votre vie, pas l'inverse. Les sociétés classiques ferment à 17h, moi j'interviens quand ça vous arrange.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#1a365d] text-xl mb-1">Tarifs justes et transparents</h4>
                      <p className="text-zinc-600">Pas de frais de dossier, pas d'agence au milieu. Vous payez directement pour le temps et l'énergie investis.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#1a365d] text-xl mb-1">Sur-mesure, pas de contrat</h4>
                      <p className="text-zinc-600">Un besoin particulier ? On en discute et je m'adapte. Pas de package imposé, pas d'abonnement, pas d'engagement.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] overflow-hidden relative shadow-xl">
                  <img src="https://picsum.photos/id/211/800/1000" alt="Intérieur propre et rangé" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white">
                    Photo de prestation à ajouter
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                    <p className="font-display font-bold text-[#1a365d] text-lg mb-2 flex items-center gap-2">
                      <Heart size={20} className="text-[#f59e0b]" fill="currentColor" /> 
                      Ma méthode
                    </p>
                    <p className="text-sm text-zinc-600 font-medium">
                      "La confiance ne s'achète pas, elle se gagne sur le terrain. Mon objectif est simple : que vous m'appeliez à nouveau la prochaine fois."
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#1a365d] mb-6 tracking-tight">Ce que je peux faire <br/>pour vous.</h2>
              <p className="text-zinc-600 text-xl leading-relaxed">
                Trois domaines d'expertise pour couvrir tous vos besoins domestiques. Cliquez sur un service pour voir le détail complet.
              </p>
            </div>

            <div className="space-y-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#f59e0b] text-white flex items-center justify-center shadow-lg shadow-[#f59e0b]/20">
                    <Sparkles size={28} />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[#1a365d]">Nettoyage expert</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nettoyage.map(service => <ServiceCard key={service.id} service={service} />)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a365d] text-white flex items-center justify-center shadow-lg shadow-[#1a365d]/20">
                    <PackageCheck size={28} />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[#1a365d]">Force & Manutention</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {manutention.map(service => <ServiceCard key={service.id} service={service} />)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 text-white flex items-center justify-center shadow-lg shadow-zinc-800/20">
                    <Truck size={28} />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[#1a365d]">Transport adapté</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {transport.map(service => <ServiceCard key={service.id} service={service} />)}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 bg-[#f8f9fa] border-t border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              
              <div className="lg:col-span-2 lg:pt-8">
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#1a365d] mb-6 tracking-tight">On en parle ?</h2>
                <p className="text-zinc-600 text-xl mb-10 leading-relaxed">
                  Pas besoin de formulaire compliqué. Un appel ou un message rapide suffit pour évaluer votre besoin. <strong className="text-[#1a365d]">Réponse garantie sous 24h.</strong>
                </p>

                <div className="space-y-6">
                  <a href="tel:+32466494536" className="flex items-center gap-6 p-6 md:p-8 rounded-[2rem] bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#f59e0b] transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-[#1a365d] shadow-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Phone size={28} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-500 mb-1">Ligne directe (Nivelles & Brabant Wallon)</p>
                      <p className="font-display font-bold text-3xl md:text-4xl text-[#1a365d] tracking-tight group-hover:text-[#f59e0b] transition-colors truncate">+32 466 49 45 36</p>
                    </div>
                  </a>
                  
                  <div className="p-8 rounded-[2rem] bg-white border border-zinc-100">
                    <h4 className="font-display font-bold text-xl text-[#1a365d] mb-4">Informations pratiques</h4>
                    <ul className="space-y-4 text-zinc-600">
                      <li className="flex items-start gap-3">
                        <Home size={20} className="text-[#f59e0b] shrink-0 mt-0.5" />
                        <span><strong>Zone couverte :</strong> Brabant Wallon (Nivelles et environs). Déplacements possibles au-delà sur devis.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock size={20} className="text-[#f59e0b] shrink-0 mt-0.5" />
                        <span><strong>Disponibilité :</strong> Semaine & Week-end. Flexibilité totale selon vos horaires.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-zinc-100">
                {formStatus === 'sent' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#1a365d]">Demande bien reçue !</h3>
                    <p className="text-zinc-600 text-lg">Merci de votre confiance. Je vous recontacte sous 24h avec une proposition.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-8 px-6 py-3 bg-zinc-50 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h3 className="font-display font-bold text-2xl text-[#1a365d] mb-6">Demander un devis écrit</h3>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Prénom</label>
                        <input required type="text" className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Nom</label>
                        <input required type="text" className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-zinc-700">Email</label>
                      <input required type="email" className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-zinc-700">De quoi avez-vous besoin ?</label>
                      <select className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] transition-all appearance-none">
                        <option>Nettoyage</option>
                        <option>Manutention / Déménagement</option>
                        <option>Transport</option>
                        <option>Mixte / Autre demande</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-zinc-700">Précisez votre demande</label>
                      <textarea required rows={4} placeholder="Décrivez la surface, le type de meuble, ou la fréquence souhaitée..." className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] transition-all resize-none"></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="w-full bg-[#1a365d] hover:bg-[#112440] text-white py-5 rounded-2xl font-bold text-xl transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-2 shadow-md hover:shadow-lg"
                    >
                      {formStatus === 'sending' ? 'Envoi en cours...' : 'Recevoir mon devis'}
                    </button>
                    <p className="text-xs text-center text-zinc-500 mt-4">Vos données restent confidentielles. Aucun spam.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#1a365d] py-12 pb-32 md:pb-12 text-white/80">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 pr-12">
              <h2 className="font-display font-extrabold text-2xl text-white mb-4">Elie Yoka.</h2>
              <p className="max-w-sm mb-6 leading-relaxed">
                Votre partenaire de confiance pour l'entretien et la logistique de votre domicile. Nettoyage, manutention, transport.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Accès rapide</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollTo('pourquoi-moi')} className="hover:text-[#f59e0b] transition-colors">Pourquoi me choisir</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#f59e0b] transition-colors">Mes services</button></li>
                <li><a href="/fr/mockup/elie-yoka/mentions-legales" className="hover:text-[#f59e0b] transition-colors">Mentions légales</a>
                  <p className="text-zinc-500 text-xs mt-1 leading-snug">Identité, hébergement, RGPD, cookies, droit applicable</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Contact direct</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="tel:+32466494536" className="hover:text-[#f59e0b] transition-colors font-bold text-white">+32 466 49 45 36</a></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-[#f59e0b] transition-colors">Devis gratuit</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© {new Date().getFullYear()} Elie Yoka. Tous droits réservés.</p>
            <p className="flex items-center gap-1.5">
              Site web par{' '}
              <a 
                href="https://antoineghigny.be" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-medium hover:text-[#f59e0b] transition-colors underline decoration-white/30 underline-offset-4"
              >
                Antoine Ghigny
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* CTA STICKY MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-zinc-200 z-40">
        <button 
          onClick={() => scrollTo('contact')}
          className="w-full bg-[#f59e0b] text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center gap-2 text-lg"
        >
          Demander un devis
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
