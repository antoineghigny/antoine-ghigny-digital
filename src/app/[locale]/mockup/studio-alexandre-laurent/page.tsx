'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, Image as ImageIcon, Plane, Heart, Building2, Briefcase, Menu, X, ArrowRight, ChevronDown, MapPin, Phone, Mail, Instagram, Linkedin, Star, ArrowUpRight } from 'lucide-react';

const IMG = {
  hero: 'https://static.wixstatic.com/media/c8cc7b_58e351898a174664a88f4d061d19d25c~mv2.jpg',
  portrait: 'https://static.wixstatic.com/media/c8cc7b_4552a6cf54db497a9dda905e36f4a7c3~mv2.png',
  portrait2: 'https://static.wixstatic.com/media/c8cc7b_7e688b38bfea427cac7293a9830a41dd~mv2.jpg',
  logo: 'https://static.wixstatic.com/media/c8cc7b_c5574b0ab68d4ef38250c5709cbde73b~mv2.png',
  aerial: 'https://static.wixstatic.com/media/c8cc7b_1abee460d79f414f95b90b3be729ef26~mv2.jpg',
  pub: 'https://static.wixstatic.com/media/c8cc7b_526c04365c51484ea86646e506885ee1~mv2.jpg',
  corp: 'https://static.wixstatic.com/media/c8cc7b_7dd9b3d0e7504c4abcef61ac9bd423c2~mv2.jpg',
  pack: 'https://static.wixstatic.com/media/c8cc7b_f90007e0e3ec4452b8865188c0676a1d~mv2.jpg',
  portrait_service: 'https://static.wixstatic.com/media/c8cc7b_aa3f53dbe4834efe881d2e7ec5d75a24~mv2.jpg',
  wedding: 'https://static.wixstatic.com/media/c8cc7b_bc8c5e0dc95345728d0bad5e03e3cc81~mv2.jpg',
  industry: 'https://static.wixstatic.com/media/c8cc7b_60939926823c4ee6bf5c81b67e3e6922~mv2.png',
  gal1: 'https://static.wixstatic.com/media/c8cc7b_74ee725a4458499da3df4fc016123363~mv2.jpg',
  gal2: 'https://static.wixstatic.com/media/c8cc7b_da1fda6301b44e1abe9f488f3d02f2f9~mv2.jpg',
  gal3: 'https://static.wixstatic.com/media/c8cc7b_c345aa30d0a94cd7acd2ade675bb64c6~mv2.jpg',
  gal4: 'https://static.wixstatic.com/media/c8cc7b_3f399141a4874e6d879fa8fdd9e919dd~mv2.jpg',
  gal5: 'https://static.wixstatic.com/media/c8cc7b_47668b9f43884e83a33a13a90487bf79~mv2.jpg',
  gal6: 'https://static.wixstatic.com/media/c8cc7b_8385733f8b544dc2a81dfc6a04b7969a~mv2.jpg',
  gal7: 'https://static.wixstatic.com/media/c8cc7b_7dd9b3d0e7504c4abcef61ac9bd423c2~mv2.jpg',
  gal8: 'https://static.wixstatic.com/media/c8cc7b_f90007e0e3ec4452b8865188c0676a1d~mv2.jpg',
  gal9: 'https://static.wixstatic.com/media/c8cc7b_45c8e0364c8648dea27411509b1e5dd6~mv2.jpg',
};

const injectStyles = () => {
  if (document.getElementById('alexandre-mockup-styles')) return;
  const style = document.createElement('style');
  style.id = 'alexandre-mockup-styles';
  style.innerHTML = `
    @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400,300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
    :root { --bg-zinc-50: #fafafa; --bg-zinc-950: #09090b; --accent-emerald: #059669; }
    body { font-family: 'Geist', sans-serif; background-color: var(--bg-zinc-50); color: var(--bg-zinc-950); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    .font-heading { font-family: 'Cabinet Grotesk', sans-serif; }
    .masonry-grid { column-count: 1; column-gap: 1.5rem; }
    @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
    @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
    .masonry-item { break-inside: avoid; margin-bottom: 1.5rem; }
    .reveal-blur { animation: revealBlur 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; filter: blur(12px); transform: scale(1.03); }
    @keyframes revealBlur { to { opacity: 1; filter: blur(0); transform: scale(1); } }
    .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
    .animate-marquee:hover { animation-play-state: paused; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
};

const SERVICES_DATA = [
  { id: 'aerien', category: 'Aérien', title: 'Photographie aérienne — la Belgique vue du ciel', icon: Plane, text: "Fort de plus de 40 ans d'expérience en photographie aérienne, je vous propose une vision unique de la Belgique et de ses paysages. Je pilote moi-même et préfère l'avion à l'hélicoptère pour sa liberté en altitude, ce qui exige une maîtrise technique pour saisir l'instant en plein vol. Mon travail aérien couvre aussi bien les missions commerciales (photographie de biens immobiliers, infrastructures, zones agricoles) que les projets artistiques (collections Belgium By Night, 40 Years Belgium). Chaque vol est préparé avec soin en fonction de la lumière, de la météo et du sujet à capturer. Les images aériennes offrent un point de vue incomparable qui transforme votre perception du territoire.", cta: "Demander un devis photo aérienne", img: IMG.aerial },
  { id: 'publicite', category: 'Publicité', title: 'Photographie publicitaire — donnez vie à vos produits', icon: ImageIcon, text: "Chaque produit mérite une image qui raconte son histoire. Je travaille avec des lumières étudiées, des décors pensés et un regard artistique pour révéler le potentiel de vos créations. Du simple packshot e-commerce à la campagne branding complète, je m'adapte à votre secteur et à votre budget. Les séries publicitaires sont réalisées en studio ou sur site, avec une équipe réduite pour préserver l'authenticité du résultat. Chaque campagne est préparée en amont avec vous, du moodboard au rendu final, pour garantir une image qui correspond à votre identité de marque.", cta: "Demander un devis photo publicitaire", img: IMG.pub },
  { id: 'corporate', category: 'Corporate', title: "Corporate — l'image de votre entreprise", icon: Briefcase, text: "Vos locaux, vos équipes, votre activité méritent d'être mis en valeur par des photos professionnelles. Je réalise des reportages corporate qui capturent l'ambiance de travail, les interactions humaines et les outils qui font votre différence. Que ce soit pour votre site web, vos réseaux sociaux ou votre rapport annuel, chaque photo est choisie pour renforcer votre crédibilité. Je me déplace dans toute la Belgique pour couvrir vos événements d'entreprise, séminaires et portraits de collaborateurs. Les délais de livraison sont rapides, avec une sélection des meilleurs clichés retouchés et livrés en haute définition.", cta: "Réserver un shooting corporate", img: IMG.corp },
  { id: 'packshot', category: 'Packshot', title: 'Packshot — vos produits sous leur meilleur jour', icon: Camera, text: "Un packshot professionnel fait la différence entre un produit qui se vend et un produit qui passe inaperçu. Je dispose d'un équipement studio complet avec fonds infinis, éclairage modulaire et optiques haut de gamme pour des clichés nets et précis. Chaque produit est photographié avec une attention particulière aux reflets, aux textures et aux détails qui comptent pour vos clients. Je traite aussi bien les petits objets (bijoux, cosmétiques) que les volumes plus imposants (mobilier, équipement). Les fichiers sont livrés prêts à l'emploi pour votre site e-commerce, catalogue imprimé ou réseaux sociaux.", cta: "Demander un devis packshot", img: IMG.pack },
  { id: 'portrait', category: 'Portrait', title: 'Portrait — révélez votre personnalité', icon: Camera, text: "Un portrait réussi capture bien plus qu'un visage — il raconte une histoire, exprime une émotion, révèle une personnalité. Je travaille avec la lumière naturelle en priorité pour donner à vos portraits une atmosphère authentique et chaleureuse. Que ce soit pour un portrait professionnel (LinkedIn, site d'entreprise) ou personnel (book de comédien, séance famille), chaque séance est préparée pour vous mettre à l'aise. Je vous guide dans les postures et les expressions pour un résultat naturel, jamais figé. La séance dure entre 1h et 2h selon vos besoins, avec une livraison des photos retouchées sous 72h.", cta: "Prendre rendez-vous pour un portrait", img: IMG.portrait_service },
  { id: 'mariage', category: 'Mariage', title: 'Mariage et événements — des souvenirs immortels', icon: Heart, text: "Votre mariage est l'un des plus beaux jours de votre vie, et chaque instant mérite d'être figé avec sensibilité et discrétion. Je couvre votre événement de la préparation des mariés jusqu'à la soirée, avec un regard à la fois documentaire et artistique. Je sais me faire oublier tout en étant présent aux moments clés — l'émotion des préparatifs, le stress heureux de la cérémonie, la joie du vin d'honneur, l'ambiance de la fête. Les photos sont livrées dans une galerie privée en ligne, que vous pouvez partager avec vos proches. Pour les événements d'entreprise (séminaires, soirées de gala, lancements), je propose une formule adaptée avec couverture complète et livraison express.", cta: "Réserver pour mon événement", img: IMG.wedding },
  { id: 'industrie', category: 'Industrie', title: 'Reportage industriel — votre savoir-faire en images', icon: Building2, text: "L'industrie a besoin d'images qui montrent la précision, la puissance et l'humain derrière les machines. Je réalise des reportages dans vos ateliers, usines et chantiers avec un équipement adapté aux conditions difficiles (faible luminosité, espaces confinés, mouvements rapides). Chaque reportage met en valeur vos équipes, vos processus et la qualité de votre production. Ces photos sont idéales pour votre site web, vos plaquettes commerciales et vos dossiers de candidature. Je maîtrise les contraintes de sécurité et les horaires décalés pour m'adapter à votre rythme de production. Les images sont livrées avec une charte de retouche cohérente pour une utilisation multicanal.", cta: "Demander un devis reportage industriel", img: IMG.industry },
];

const REVIEWS = [
  { text: "Un œil exceptionnel. Les photos aériennes de nos installations ont donné une nouvelle dimension à notre communication.", author: "Directeur Industriel", rating: 5 },
  { text: "Alexandre a su capter l'essence de notre mariage avec une discrétion absolue. Les portraits sont magnifiques.", author: "Sophie & Thomas", rating: 5 },
  { text: "Shooting packshot très pro. Le rendu des textures sur nos produits est parfait. Livraison rapide.", author: "Gérant E-commerce", rating: 5 },
  { text: "40 ans d'expérience, ça se sent tout de suite. Une maîtrise technique impressionnante, surtout en vol.", author: "Architecte", rating: 5 },
];

const GALLERY_IMAGES = [
  { id: 1, category: 'Aérien', src: IMG.gal1, aspect: 'aspect-[4/3]' },
  { id: 2, category: 'Publicité', src: IMG.gal2, aspect: 'aspect-[3/4]' },
  { id: 3, category: 'Mariage', src: IMG.gal3, aspect: 'aspect-square' },
  { id: 4, category: 'Aérien', src: IMG.gal4, aspect: 'aspect-[16/9]' },
  { id: 5, category: 'Portrait', src: IMG.gal5, aspect: 'aspect-[3/4]' },
  { id: 6, category: 'Mariage', src: IMG.gal6, aspect: 'aspect-square' },
  { id: 7, category: 'Corporate', src: IMG.gal7, aspect: 'aspect-[4/3]' },
  { id: 8, category: 'Packshot', src: IMG.gal8, aspect: 'aspect-[3/4]' },
  { id: 9, category: 'Aérien', src: IMG.gal9, aspect: 'aspect-[4/5]' },
];

const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline' | 'ghost'; className?: string; onClick?: () => void; type?: 'button' | 'submit' }> = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-300 ease-out tracking-wide uppercase";
  const variants = {
    primary: "bg-zinc-950 text-white hover:bg-emerald-600 active:scale-[0.98]",
    outline: "border border-zinc-200 text-zinc-900 hover:border-zinc-900 active:scale-[0.98]",
    ghost: "text-zinc-600 hover:text-zinc-950",
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

type NavigateFn = (page: string) => void;

const HomeView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full">
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end pb-24 px-4 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <img src={IMG.hero} alt="Belgique vue du ciel" className="w-full h-full object-cover reveal-blur" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-zinc-950/10"></div>
      </div>
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start reveal-blur" style={{ animationDelay: '0.3s' }}>
        <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] text-white font-bold tracking-tighter mb-4 leading-none">Alexandre<br />Laurent</h1>
        <p className="text-zinc-200 text-lg md:text-2xl font-light mb-12 max-w-2xl tracking-wide">Photographie publicitaire, corporate et aérienne</p>
        <Button onClick={() => navigate('galerie')} className="!bg-white !text-zinc-950 hover:!bg-emerald-600 hover:!text-white rounded-none border-none">Découvrir mon travail</Button>
      </div>
    </section>

    <section className="py-32 px-4 max-w-[1400px] mx-auto">
      <FadeInSection>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-zinc-950 mb-16 tracking-tight">Ce que je photographie</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          <div onClick={() => navigate('services')} className="group relative md:col-span-2 md:row-span-2 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[0].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Aérien" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-emerald-400 font-medium tracking-widest text-xs mb-3 uppercase">Signature</span>
              <h3 className="font-heading text-4xl text-white mb-2">Aérien</h3>
              <p className="text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">Voir l'expertise <ArrowRight size={16} /></p>
            </div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-1 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[1].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Publicité" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end"><h3 className="font-heading text-2xl text-white mb-2">Publicité</h3></div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-1 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[2].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Corporate" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end"><h3 className="font-heading text-2xl text-white mb-2">Corporate</h3></div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-2 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[3].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Packshot" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end"><h3 className="font-heading text-3xl text-white mb-2">Packshot</h3></div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-2 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[4].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 object-top" alt="Portrait" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end"><h3 className="font-heading text-4xl text-white mb-2">Portrait</h3></div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-1 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[5].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Mariage" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end"><h3 className="font-heading text-2xl text-white mb-2">Mariage</h3></div>
          </div>
          <div onClick={() => navigate('services')} className="group relative md:col-span-1 md:row-span-1 overflow-hidden bg-zinc-200 cursor-pointer">
            <img src={SERVICES_DATA[6].img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Industrie" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end"><h3 className="font-heading text-2xl text-white mb-2">Industrie</h3></div>
          </div>
        </div>
      </FadeInSection>
    </section>

    <section className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4">
        <FadeInSection>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="w-full md:w-5/12 md:sticky md:top-32 shrink-0">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-sm bg-zinc-100">
                <img src={IMG.portrait} alt="Alexandre Laurent Photographe" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-7/12 py-8">
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-zinc-950 mb-8 tracking-tight">Né dans un bain de révélateur</h2>
              <div className="space-y-6 text-xl text-zinc-600 font-light leading-relaxed max-w-2xl">
                <p>Fils de photographe, j'ai grandi dans l'odeur du labo noir et blanc. Aujourd'hui, je capture la Belgique du ciel, les produits sous leur meilleur jour, et les émotions des plus beaux jours de votre vie.</p>
                <p>Le Studio Alexandre Laurent vous apporte son savoir-faire en matière de photographie publicitaire, reportage industriel, portrait (privé ou corporate) et dans l'événementiel. Son département aérien profite d'une expérience de plus de 40 ans.</p>
                <p>Chaque prise de vue est réalisée avec un équipement professionnel haut de gamme, sélectionné pour sa fiabilité et la richesse de ses rendus.</p>
              </div>
              <div className="mt-12"><Button onClick={() => navigate('apropos')} variant="outline">Mon histoire</Button></div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>

    <section className="py-32 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto px-4 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <h2 className="font-heading text-5xl font-bold tracking-tight">Ce que mes clients disent</h2>
        <div className="flex items-center gap-3 text-zinc-300 bg-zinc-900/50 px-6 py-3 border border-zinc-800">
          <div className="flex"><Star size={18} className="fill-emerald-500 text-emerald-500" /><Star size={18} className="fill-emerald-500 text-emerald-500" /><Star size={18} className="fill-emerald-500 text-emerald-500" /><Star size={18} className="fill-emerald-500 text-emerald-500" /><Star size={18} className="fill-emerald-500 text-emerald-500" /></div>
          <span className="text-lg font-medium tracking-wide">5.0 — 38 avis Google</span>
        </div>
      </div>
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-8 px-4">
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="w-[400px] md:w-[500px] bg-zinc-900/50 p-10 border border-zinc-800 shrink-0">
              <div className="flex mb-6">{[...Array(review.rating)].map((_, j) => <Star key={j} size={16} className="fill-emerald-500 text-emerald-500 mr-1" />)}</div>
              <p className="text-zinc-300 font-light text-xl mb-8 leading-relaxed">"{review.text}"</p>
              <p className="font-medium text-white text-sm tracking-widest uppercase">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-40 bg-zinc-50 text-center px-4 border-t border-zinc-200">
      <FadeInSection>
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-zinc-950 mb-8 tracking-tight">Vous avez un projet en tête ?</h2>
        <p className="text-2xl text-zinc-600 mb-12 font-light">Parlons-en autour d'un café ou d'un vol de repérage.</p>
        <Button onClick={() => navigate('contact')}>Me contacter</Button>
      </FadeInSection>
    </section>
  </main>
);

const ServicesView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full pt-32 pb-32">
    <div className="max-w-[1400px] mx-auto px-4 py-16">
      <h1 className="font-heading text-6xl md:text-8xl font-bold text-zinc-950 mb-8 tracking-tighter reveal-blur">Mes services</h1>
      <p className="text-2xl text-zinc-600 font-light max-w-3xl reveal-blur" style={{ animationDelay: '0.2s' }}>Un photographe, six expertises, quarante ans d'expérience — du packshot à la vue aérienne.</p>
    </div>
    <div className="max-w-[1400px] mx-auto px-4 mt-16 space-y-32 md:space-y-48">
      {SERVICES_DATA.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <FadeInSection key={service.id}>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className={`lg:col-span-7 h-[500px] md:h-[700px] w-full ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <img src={service.img} alt={service.category} className="w-full h-full object-cover" />
              </div>
              <div className={`lg:col-span-5 space-y-8 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <div className="inline-flex items-center gap-3 text-emerald-600 font-medium tracking-widest uppercase text-sm mb-4"><service.icon size={18} /><span>{service.category}</span></div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-zinc-950 leading-tight">{service.title}</h2>
                <p className="text-zinc-600 text-lg font-light leading-relaxed">{service.text}</p>
                <div className="pt-4"><Button onClick={() => navigate('contact')} variant="outline" className="w-full sm:w-auto">{service.cta}</Button></div>
              </div>
            </section>
          </FadeInSection>
        );
      })}
    </div>
  </main>
);

const GalleryView = () => {
  const [filter, setFilter] = useState('Tout');
  const categories = ['Tout', ...Array.from(new Set(SERVICES_DATA.map(s => s.category)))];
  const filteredImages = filter === 'Tout' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);
  return (
    <main className="w-full pt-40 pb-32 px-4 min-h-[100dvh] bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-zinc-950 mb-16 tracking-tighter reveal-blur">Galerie</h1>
        <div className="flex flex-wrap gap-4 mb-16 reveal-blur" style={{ animationDelay: '0.2s' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 text-sm uppercase tracking-widest transition-all duration-300 ${filter === cat ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200'}`}>{cat}</button>
          ))}
        </div>
        <div className="masonry-grid">
          {filteredImages.map((img, i) => (
            <div key={`${img.id}-${filter}`} className="masonry-item group relative overflow-hidden bg-zinc-100 reveal-blur" style={{ animationDelay: `${i * 0.05}s` }}>
              <img src={img.src} alt={img.category} loading="lazy" className={`w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 ${img.aspect}`} />
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><span className="bg-white px-4 py-2 text-xs uppercase tracking-widest font-medium">{img.category}</span></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const AboutView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full pt-40 pb-32 bg-white min-h-[100dvh]">
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5 relative aspect-[3/4] w-full lg:sticky lg:top-40 reveal-blur">
          <img src={IMG.portrait} alt="Alexandre Laurent au travail" className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-7 space-y-24 py-8 reveal-blur" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-10">
            <h1 className="font-heading text-6xl md:text-8xl font-bold text-zinc-950 tracking-tighter leading-[0.9]">Né dans un bain<br />de révélateur</h1>
            <div className="space-y-6 text-xl text-zinc-600 font-light leading-relaxed">
              <p>Mon père quitte la France et débarque à Bruxelles lors de l'exposition universelle de 1958, avec dans ses bagages une solide expérience de photographe. Un temps journaliste photographe chez Associated Press, il découvrira un peu plus tard sa passion pour la photographie aérienne.</p>
              <p>Le petit Alexandre connaît alors les grandes heures de la photographie de presse et s'envolera à maintes reprises avec son père dans le ciel belge. Aujourd'hui, c'est à mon tour de porter cette passion, avec 40 ans d'expérience et un regard qui n'a cessé de s'aiguiser.</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-zinc-950">Ma philosophie</h2>
            <p className="text-xl text-zinc-600 font-light leading-relaxed">À travers mes clichés, je cherche à raconter des histoires, à capturer l'essence des personnes, des lieux et des événements. J'apprécie particulièrement travailler avec la lumière naturelle pour donner à mes photos une atmosphère authentique et chaleureuse. Le talent s'épanouit pleinement dans la photographie aérienne. Je lie sans conteste un sens artistique au défi que représente la complexité de ce travail.</p>
          </div>
          <div className="bg-zinc-50 p-12 border-l-4 border-emerald-600">
            <h2 className="font-heading text-3xl font-bold text-zinc-950 mb-6">40 Years Belgium</h2>
            <p className="text-xl text-zinc-600 font-light leading-relaxed">"40 ans dans le ciel de Belgique apporte une vision saisissante sur l'évolution de notre Région, ville par ville." Une archive historique unique construite vol après vol, témoignant des transformations de notre territoire.</p>
          </div>
          <div className="pt-8 border-t border-zinc-200"><Button onClick={() => navigate('contact')}>Travaillons ensemble</Button></div>
        </div>
      </div>
    </div>
  </main>
);

const ContactView = () => (
  <main className="w-full pt-40 pb-32 bg-zinc-50 min-h-[100dvh]">
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="mb-24 reveal-blur">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-zinc-950 mb-8 tracking-tighter">Contact</h1>
        <p className="text-2xl text-zinc-600 font-light max-w-2xl">Une question, un projet, une envie de voler ? Parlons-en.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-5 space-y-16 reveal-blur" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-10">
            <a href="tel:+32475264679" className="flex items-start gap-6 group">
              <div className="mt-1 text-zinc-400 group-hover:text-emerald-600 transition-colors"><Phone size={28} strokeWidth={1.5} /></div>
              <div><p className="text-sm text-zinc-500 uppercase tracking-widest mb-2 font-medium">Téléphone</p><p className="text-3xl font-heading text-zinc-950 group-hover:text-emerald-600 transition-colors">+32 475 26 46 79</p></div>
            </a>
            <a href="mailto:alexandrelaurent@me.com" className="flex items-start gap-6 group">
              <div className="mt-1 text-zinc-400 group-hover:text-emerald-600 transition-colors"><Mail size={28} strokeWidth={1.5} /></div>
              <div><p className="text-sm text-zinc-500 uppercase tracking-widest mb-2 font-medium">Email</p><p className="text-2xl font-heading text-zinc-950 group-hover:text-emerald-600 transition-colors break-all">alexandrelaurent@me.com</p></div>
            </a>
            <div className="flex items-start gap-6">
              <div className="mt-1 text-zinc-400"><MapPin size={28} strokeWidth={1.5} /></div>
              <div><p className="text-sm text-zinc-500 uppercase tracking-widest mb-2 font-medium">Localisation</p><p className="text-2xl font-heading text-zinc-950">Brabant Wallon, Belgique</p><p className="text-lg text-zinc-500 font-light mt-2">Interventions dans tout le pays</p></div>
            </div>
          </div>
          <div className="p-10 bg-zinc-950 text-white">
            <h3 className="font-heading text-3xl mb-4">Urgence ou actualité ?</h3>
            <p className="text-zinc-400 font-light text-lg mb-8 leading-relaxed">Pour les demandes urgentes ou les reportages liés à l'actualité, privilégiez le contact téléphonique direct.</p>
            <a href="tel:+32475264679" className="inline-flex items-center gap-3 text-emerald-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium">Appelez-moi directement <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <div className="lg:col-span-7 bg-white p-10 md:p-16 border border-zinc-200 reveal-blur" style={{ animationDelay: '0.4s' }}>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3"><label className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Nom complet</label><input type="text" required className="w-full p-4 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-950 transition-colors text-lg" /></div>
              <div className="space-y-3"><label className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Téléphone</label><input type="tel" className="w-full p-4 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-950 transition-colors text-lg" /></div>
            </div>
            <div className="space-y-3"><label className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Email</label><input type="email" required className="w-full p-4 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-950 transition-colors text-lg" /></div>
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Service concerné</label>
              <select className="w-full p-4 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-950 transition-colors appearance-none rounded-none text-lg">
                <option value="">Sélectionnez un service...</option>
                {SERVICES_DATA.map(s => <option key={s.id}>{s.category}</option>)}
              </select>
            </div>
            <div className="space-y-3"><label className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Votre message</label><textarea rows={6} required className="w-full p-4 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-950 transition-colors resize-none text-lg"></textarea></div>
            <Button type="submit" className="w-full py-5 text-base">Envoyer la demande</Button>
          </form>
        </div>
      </div>
    </div>
  </main>
);

const FaqView = () => {
  const faqs = [
    { q: "Combien de temps dure un shooting ?", a: "Cela dépend du type de prestation. Un portrait dure 1 à 2 heures, un reportage industriel une demi-journée, un mariage la journée complète. Je vous donne une estimation précise lors de notre échange." },
    { q: "Livrez-vous les photos retouchées ?", a: "Oui, toutes les photos sélectionnées sont retouchées et livrées en haute définition dans une galerie en ligne privée." },
    { q: "Intervenez-vous dans toute la Belgique ?", a: "Oui, je me déplace partout en Belgique. Pour la photo aérienne, je choisis l'aéroport le plus proche de votre projet." },
    { q: "Quel est le délai de livraison ?", a: "Comptez 48 à 72h pour les portraits et packshots, une semaine pour les reportages et mariages, et 10 jours pour les projets aériens (selon météo)." },
    { q: "Puis-je commander des tirages ?", a: "Oui, je propose des tirages ChromaluxPro haute qualité. Le format 50x70cm est à 450€. Contactez-moi pour les autres formats." },
  ];
  return (
    <main className="w-full pt-40 pb-32 bg-white min-h-[100dvh]">
      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-zinc-950 mb-16 text-center reveal-blur tracking-tight">Questions fréquentes</h1>
        <div className="space-y-6 reveal-blur" style={{ animationDelay: '0.2s' }}>
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-zinc-200 pb-6 cursor-pointer marker:content-['']">
              <summary className="font-heading text-2xl font-medium text-zinc-950 flex justify-between items-center outline-none hover:text-emerald-600 transition-colors">{faq.q}<ChevronDown className="transition-transform duration-300 group-open:rotate-180 text-zinc-400" /></summary>
              <div className="pt-6 text-zinc-600 font-light text-lg leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
};

const Navigation = ({ currentPage, navigate }: { currentPage: string; navigate: NavigateFn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  const isHome = currentPage === 'home';
  const navClass = `fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white border-b border-zinc-200 py-4 shadow-sm' : (isHome ? 'bg-transparent py-8' : 'bg-white py-8 border-b border-zinc-100')}`;
  const linkClass = `text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-emerald-500 ${scrolled || !isHome ? 'text-zinc-950' : 'text-white'}`;
  const navItems = [{ id: 'home', label: 'Accueil' }, { id: 'services', label: 'Services' }, { id: 'galerie', label: 'Galerie' }, { id: 'apropos', label: 'À propos' }, { id: 'faq', label: 'FAQ' }, { id: 'contact', label: 'Contact' }];
  const handleNav = (id: string) => { navigate(id); setMobileMenuOpen(false); };
  return (
    <>
      <nav className={navClass}>
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <div onClick={() => handleNav('home')} className={`font-heading text-3xl font-bold cursor-pointer tracking-tighter ${scrolled || !isHome ? 'text-zinc-950' : 'text-white'}`}>A. LAURENT</div>
          <div className="hidden md:flex gap-10 items-center">{navItems.map(item => (<button key={item.id} onClick={() => handleNav(item.id)} className={`${linkClass} ${currentPage === item.id ? 'opacity-50 pointer-events-none' : ''}`}>{item.label}</button>))}</div>
          <button className={`md:hidden ${scrolled || !isHome ? 'text-zinc-950' : 'text-white'}`} onClick={() => setMobileMenuOpen(true)}><Menu size={28} strokeWidth={1.5} /></button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-[85%] max-w-md bg-zinc-950 h-full p-8 md:p-12 flex flex-col border-l border-zinc-800">
            <button className="self-end text-white mb-16 hover:text-emerald-400 transition-colors" onClick={() => setMobileMenuOpen(false)}><X size={32} strokeWidth={1.5} /></button>
            <div className="flex flex-col gap-8">{navItems.map(item => (<button key={item.id} onClick={() => handleNav(item.id)} className={`text-left text-4xl font-heading tracking-tight text-white hover:text-emerald-400 transition-colors ${currentPage === item.id ? 'text-emerald-500' : ''}`}>{item.label}</button>))}</div>
            <div className="mt-auto space-y-4 text-zinc-500 text-sm tracking-widest uppercase"><p>Studio Alexandre Laurent</p><p className="text-white">+32 475 26 46 79</p></div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ navigate }: { navigate: NavigateFn }) => (
  <footer className="bg-zinc-950 text-white pt-32 pb-12 px-4">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
      <div className="md:col-span-5">
        <h3 className="font-heading text-4xl font-bold mb-6 tracking-tighter">A. LAURENT</h3>
        <p className="text-zinc-400 font-light text-lg mb-8 max-w-sm leading-relaxed">Photographie — Brabant Wallon — Depuis 40 ans. Du packshot à la vue aérienne.</p>
        <div className="flex gap-6"><a href="#" className="text-zinc-400 hover:text-white transition-colors"><Instagram size={24} strokeWidth={1.5} /></a><a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={24} strokeWidth={1.5} /></a></div>
      </div>
      <div className="md:col-span-3 lg:col-start-8">
        <h4 className="font-heading text-sm font-bold mb-8 uppercase tracking-[0.2em] text-zinc-600">Navigation</h4>
        <div className="flex flex-col gap-4 font-light text-lg">{[['Accueil', 'home'], ['Services', 'services'], ['Galerie', 'galerie'], ['À propos', 'apropos'], ['FAQ', 'faq'], ['Contact', 'contact']].map(([label, id]) => (<button key={id} onClick={() => navigate(id)} className="text-left text-zinc-400 hover:text-white transition-colors w-fit">{label}</button>))}</div>
      </div>
      <div className="md:col-span-4 lg:col-span-2">
        <h4 className="font-heading text-sm font-bold mb-8 uppercase tracking-[0.2em] text-zinc-600">Contact</h4>
        <div className="space-y-4 font-light text-lg text-zinc-400"><p className="hover:text-white transition-colors cursor-pointer">+32 475 26 46 79</p><p className="hover:text-white transition-colors cursor-pointer break-all">alexandrelaurent@me.com</p><p>Brabant Wallon, Belgique</p></div>
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-600 font-medium uppercase tracking-widest">
      <p>&copy; {new Date().getFullYear()} Studio Alexandre Laurent.</p>
      <div className="flex gap-8"><button className="hover:text-zinc-300 transition-colors">Mentions légales</button><button className="hover:text-zinc-300 transition-colors">Politique de confidentialité</button></div>
    </div>
  </footer>
);

export default function StudioAlexandreLaurentMockup() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => { injectStyles(); window.scrollTo(0, 0); }, []);
  const navigate = useCallback((page: string) => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setCurrentPage(page), 50); }, []);
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView navigate={navigate} />;
      case 'services': return <ServicesView navigate={navigate} />;
      case 'galerie': return <GalleryView />;
      case 'apropos': return <AboutView navigate={navigate} />;
      case 'contact': return <ContactView />;
      case 'faq': return <FaqView />;
      default: return <HomeView navigate={navigate} />;
    }
  };
  return (
    <div className="pt-12 min-h-screen flex flex-col bg-zinc-50 selection:bg-emerald-500/30 selection:text-emerald-900">
      <Navigation currentPage={currentPage} navigate={navigate} />
      <div className="flex-grow">{renderPage()}</div>
      <Footer navigate={navigate} />
    </div>
  );
}
