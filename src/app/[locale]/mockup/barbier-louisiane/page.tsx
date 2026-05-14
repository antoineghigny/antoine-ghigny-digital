'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, Heart, Menu, X, ChevronDown, MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react';

const IMG = {
  hero: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2025/06/IMG_0820-1-rotated.jpg',
  portrait: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2019/03/louisiane.jpeg',
  cabinet1: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2025/06/IMG_0821-1-rotated.jpg',
  cabinet2: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2025/06/IMG_0822-1-rotated.jpg',
  cabinet3: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2025/06/IMG_0824-1-rotated.jpg',
  slider1: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2020/02/louisianeSLIDER1.jpg',
  slider2: 'https://pedicure-louisiane-barbier.be/wp-content/uploads/2020/02/louisianeSLIDER2.jpg',
};

const injectStyles = () => {
  if (document.getElementById('barbier-mockup-styles')) return;
  const style = document.createElement('style');
  style.id = 'barbier-mockup-styles';
  style.innerHTML = `
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
    .mockup-barbier-wrapper { font-family: 'Outfit', sans-serif; background-color: #FAF9F7; color: #2A342D; -webkit-font-smoothing: antialiased; }
    .mockup-barbier-wrapper * { font-family: inherit; }
    .mockup-barbier-wrapper .font-heading { font-family: 'Satoshi', sans-serif !important; }
    .mockup-barbier-wrapper nav button { background: none; border: none; padding: 0; cursor: pointer; font-family: 'Outfit', sans-serif; }
    .mockup-barbier-wrapper input,
    .mockup-barbier-wrapper select,
    .mockup-barbier-wrapper textarea { font-family: 'Outfit', sans-serif; }
    .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
    .animate-marquee:hover { animation-play-state: paused; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @media (max-width: 767px) { .mockup-barbier-wrapper .nav-desktop { display: none !important; } }
    @media (min-width: 768px) { .mockup-barbier-wrapper .nav-mobile-btn { display: none !important; } }
  `;
  document.head.appendChild(style);
};

type NavigateFn = (page: string) => void;

const SERVICES = [
  {
    id: "pedicure-complete",
    category: "Pédicure médicale",
    title: "Pédicure médicale en Brabant Wallon — Louisiane Barbier",
    icon: Activity,
    text: "Louisiane Barbier vous reçoit pour des soins de pédicure médicale adaptés à vos besoins. Que vous souffriez d'ongles incarnés douloureux, de cors qui vous gênent à la marche ou de callosités tenaces, chaque consultation commence par un bilan complet de l'état de vos pieds. Les soins sont réalisés avec du matériel stérile et des techniques conformes aux normes médicales en vigueur. Louisiane travaille en collaboration avec les podologues et médecins traitants pour les patients nécessitant un suivi spécifique, notamment les personnes diabétiques ou à risque. Le cabinet est accessible aux personnes à mobilité réduite, avec un espace adapté pour les fauteuils roulants.",
    img: IMG.slider2
  },
  {
    id: "ongles-incarnes",
    category: "Ongles incarnés",
    title: "Traitement des ongles incarnés sans douleur",
    icon: Activity,
    text: "Un ongle incarné peut transformer la marche en calvaire. Louisiane Barbier prend en charge les ongles incarnés avec des gestes précis et indolores, en respectant les tissus sains environnants. Le soin comprend le dégagement de l'ongle, le traitement antiseptique local et les conseils pour éviter la récidive. Si nécessaire, une pose d'orthonyxie (ressort correcteur) peut être proposée pour guider la repousse de l'ongle sur le long terme. Pour les cas récurrents, un suivi personnalisé est mis en place toutes les 4 à 6 semaines. Les tarifs sont pris en charge par certaines mutuelles sur prescription médicale.",
    img: IMG.cabinet1
  },
  {
    id: "diabetiques",
    category: "Soins diabétiques",
    title: "Pédicure médicale pour patients diabétiques — prévention et soins",
    icon: Heart,
    text: "Les personnes diabétiques nécessitent une attention particulière pour leurs pieds. Louisiane Barbier est formée aux soins podologiques pour patients diabétiques, avec une approche préventive qui vise à éviter les complications. Le soin comprend un examen minutieux de la peau, des ongles et de la circulation, suivi des gestes adaptés à la fragilité des tissus. Chaque patient reçoit des conseils personnalisés d'hygiène et de chaussage adapté à sa condition. Un compte-rendu est systématiquement transmis au médecin traitant ou au podologue référent pour assurer la continuité des soins. La prise en charge mutuelle est généralement totale sur prescription.",
    img: IMG.cabinet2
  },
  {
    id: "cors-verrues",
    category: "Cors & Verrues",
    title: "Traitement des cors, callosités et verrues plantaires",
    icon: Activity,
    text: "Les cors et callosités ne sont pas une fatalité. Avec des techniques de débridement douces et précises, Louisiane Barbier élimine les zones d'hyperkératose sans agresser la peau saine. Le traitement des verrues plantaires est réalisé par application d'acides adaptés et débridement mécanique, sur plusieurs séances si nécessaire. Chaque soin est précédé d'un diagnostic précis pour différencier un cor d'une verrue ou d'une lésion à surveiller. Des semelles correctrices ou des orthoplasties peuvent être recommandées pour soulager les points de pression à l'origine des cors récidivants.",
    img: IMG.cabinet3
  }
];

const REVIEWS = [
  { text: "Louisiane est à l'écoute, professionnelle et douce. Mes pieds n'ont jamais été aussi bien suivis.", author: "Avis Google, patiente régulière", rating: 5 },
  { text: "Un cabinet très propre et rassurant. Le soin des ongles incarnés a été totalement indolore. Je recommande vivement.", author: "Avis Google, patient", rating: 5 },
  { text: "Excellente prise en charge pour mon suivi diabétique. Très méticuleuse et donne d'excellents conseils.", author: "Avis Google, patiente", rating: 5 },
];

const FAQ_DATA = [
  { q: "Faut-il une prescription médicale ?", a: "Non, vous pouvez consulter sans prescription pour un soin classique. Cependant, certaines mutuelles remboursent les soins spécifiques (comme pour les patients diabétiques) sur prescription d'un médecin traitant." },
  { q: "Les soins sont-ils douloureux ?", a: "Les techniques utilisées sont douces et indolores, privilégiant toujours le confort du patient. Je prends le temps de vous mettre à l'aise et adapte mes gestes à votre sensibilité." },
  { q: "Quelle est la fréquence recommandée pour un suivi ?", a: "En général, une visite toutes les 4 à 6 semaines est idéale pour un suivi régulier et préventif. Je vous conseillerai un rythme adapté selon la nature de vos besoins lors de la première consultation." }
];

const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline' | 'nav'; className?: string; onClick?: () => void; type?: 'button' | 'submit' }> = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium transition-all duration-300 ease-out tracking-wide rounded-full";
  const variants = {
    primary: "bg-[#7A9E7E] text-white hover:bg-[#67876A] active:scale-[0.98]",
    outline: "border border-[#E5E5DF] text-[#2A342D] hover:border-[#2A342D] active:scale-[0.98]",
    nav: "bg-[#2A342D] text-white hover:bg-[#7A9E7E] active:scale-[0.98]"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const HomeView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full bg-[#FAF9F7]">
    <section className="min-h-[100dvh] pt-32 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
      <div className="w-full lg:w-5/12 space-y-8">
        <div className="inline-block px-4 py-1.5 bg-[#E8EFE9] text-[#67876A] rounded-full text-sm font-medium tracking-wide">Cabinet indépendant</div>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A342D] tracking-tight leading-[1.1]">Pédicure médicale en Brabant Wallon</h1>
        <p className="text-xl md:text-2xl text-[#5C665F] font-light leading-relaxed max-w-lg">Louisiane Barbier vous reçoit pour des soins des pieds professionnels, de la prévention au traitement.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
          <div className="flex items-center gap-3 text-[#2A342D] font-medium"><CheckCircle className="text-[#7A9E7E]" size={20} />Matériel strictement stérile</div>
          <div className="hidden sm:block text-[#BCC5BF]">•</div>
          <div className="flex items-center gap-3 text-[#2A342D] font-medium"><CheckCircle className="text-[#7A9E7E]" size={20} />Suivi diabétique</div>
        </div>
      </div>
      <div className="w-full lg:w-7/12 aspect-[4/3] lg:aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-sm">
        <img src={IMG.hero} alt="Cabinet pédicure médicale Louisiane Barbier" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#7A9E7E]/10 mix-blend-overlay"></div>
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/20">
          <p className="text-[#2A342D] font-medium text-lg leading-none mb-1">Louisiane Barbier</p>
          <p className="text-sm text-[#7A857D] font-light">Pédicure Médicale Certifiée</p>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2A342D] mb-6 tracking-tight">Des pieds qui vous gênent au quotidien ?</h2>
          <p className="text-xl text-[#5C665F] font-light leading-relaxed">La douleur au pied n'est pas normale. Ongle incarné, cor douloureux, callosité gênante — chaque symptôme mérite une prise en charge adaptée. Louisiane Barbier vous reçoit dans son cabinet pour un bilan complet et des soins personnalisés.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Soins médicaux stériles", d: "Protocoles d'hygiène stricts et instruments stérilisés pour chaque patient." },
            { t: "Suivi personnalisé", d: "Un accompagnement humain, adapté à votre pathologie et votre sensibilité." },
            { t: "Prise en charge", d: "Intervention possible de votre mutuelle sur prescription médicale." }
          ].map((item, i) => (
            <div key={i} className="bg-[#FAF9F7] p-8 rounded-2xl border border-[#E5E5DF] h-full">
              <div className="w-12 h-12 bg-[#E8EFE9] rounded-full flex items-center justify-center mb-6 text-[#7A9E7E]"><CheckCircle size={24} /></div>
              <h3 className="font-heading text-xl font-bold text-[#2A342D] mb-3">{item.t}</h3>
              <p className="text-[#5C665F] font-light leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#FAF9F7]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2A342D] tracking-tight">Aperçu des soins</h2>
          <button onClick={() => navigate('soins')} className="hidden md:block text-[#7A9E7E] hover:text-[#2A342D] transition-colors font-medium">Voir tous les soins →</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {SERVICES.slice(0, 2).map((service, i) => (
            <div key={service.id} onClick={() => navigate('soins')} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#E5E5DF]">
                <img src={service.img} alt={service.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#7A9E7E]/10 mix-blend-overlay pointer-events-none"></div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#2A342D] mb-3 group-hover:text-[#7A9E7E] transition-colors">{service.category}</h3>
              <p className="text-[#5C665F] font-light line-clamp-2">{service.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 md:hidden"><Button onClick={() => navigate('soins')} variant="outline" className="w-full">Voir tous les soins</Button></div>
      </div>
    </section>

    <section className="py-24 bg-[#E8EFE9] text-[#2A342D] overflow-hidden rounded-t-[3rem]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">Ce que disent nos patients</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={24} className="fill-[#7A9E7E] text-[#7A9E7E]" />)}</div>
          <span className="text-xl font-light text-[#5C665F]">5.0 / 40 avis Google</span>
        </div>
      </div>
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-6 px-4">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="w-[350px] md:w-[450px] bg-white p-8 rounded-2xl border border-[#E5E5DF] shrink-0 shadow-sm">
              <p className="text-[#5C665F] font-light text-lg mb-6 leading-relaxed">"{review.text}"</p>
              <p className="font-medium text-[#2A342D] text-sm">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const SoinsView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full pt-32 pb-32 bg-[#FAF9F7]">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#2A342D] mb-8 tracking-tight">Soins de pédicure médicale</h1>
      <p className="text-xl text-[#5C665F] font-light max-w-3xl">Une prescription médicale n'est pas obligatoire pour une première consultation. Renseignez-vous auprès de votre mutuelle pour la prise en charge.</p>
    </div>
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-8 space-y-24 md:space-y-32">
      {SERVICES.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section key={service.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className={`lg:col-span-6 aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#E5E5DF] ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
              <img src={service.img} alt={service.category} className="w-full h-full object-cover" />
            </div>
            <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
              <div className="inline-flex items-center gap-2 text-[#7A9E7E] font-medium text-sm bg-[#E8EFE9] px-4 py-1.5 rounded-full"><service.icon size={16} /><span>{service.category}</span></div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2A342D] leading-tight">{service.title}</h2>
              <p className="text-[#5C665F] text-lg font-light leading-relaxed">{service.text}</p>
            </div>
          </section>
        );
      })}
    </div>
  </main>
);

const AboutView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full pt-40 pb-32 bg-white min-h-[100dvh]">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-5 relative aspect-[3/4] w-full lg:sticky lg:top-40 rounded-3xl overflow-hidden bg-[#FAF9F7] shadow-sm">
          <img src={IMG.portrait} alt="Louisiane Barbier, pédicure médicale" className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-7 space-y-16 py-8">
          <div className="space-y-8">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#2A342D] tracking-tight leading-[1.1]">Louisiane Barbier,<br />pédicure médicale</h1>
            <div className="space-y-6 text-xl text-[#5C665F] font-light leading-relaxed">
              <p>Louisiane Barbier exerce la pédicure médicale avec une approche humaine et professionnelle. Formée aux soins podologiques et à la prise en charge des patients diabétiques, elle accueille chaque patient dans son cabinet à Anderlecht ou à domicile sur rendez-vous.</p>
              <p>Son objectif : vous permettre de marcher sans douleur et de prendre soin de vos pieds sur le long terme. Consciente qu'un soin des pieds touche à l'intimité et parfois à la douleur, son cabinet offre un espace rassurant avec du matériel stérile et des techniques douces.</p>
            </div>
          </div>
          <div className="bg-[#E8EFE9] p-8 rounded-2xl border border-[#7A9E7E]/20">
            <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-6">Expertises reconnues</h2>
            <ul className="space-y-4 text-lg text-[#5C665F] font-light">
              <li className="flex items-center gap-3"><CheckCircle className="text-[#7A9E7E]" size={20} /> Formation spécialisée soins diabétiques</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-[#7A9E7E]" size={20} /> Pédicure médicale certifiée</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-[#7A9E7E]" size={20} /> Protocoles d'hygiène stricts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
);

const ContactView = () => (
  <main className="w-full pt-40 pb-32 bg-white min-h-[100dvh]">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="mb-16">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#2A342D] mb-6 tracking-tight">Prenez soin de vos pieds</h1>
        <p className="text-xl text-[#5C665F] font-light max-w-2xl">Contactez Louisiane au 0496 10 96 97 pour prendre rendez-vous, au cabinet ou à domicile.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 space-y-8">
          <a href="tel:+32496109697" className="flex items-start gap-4 p-6 bg-[#FAF9F7] rounded-2xl border border-[#E5E5DF] hover:border-[#7A9E7E] transition-colors group">
            <div className="mt-1 text-[#7A9E7E]"><Phone size={24} /></div>
            <div><p className="text-sm text-[#7A857D] font-medium mb-1">Téléphone</p><p className="text-2xl font-heading text-[#2A342D]">0496 10 96 97</p></div>
          </a>
          <div className="flex items-start gap-4 p-6 bg-[#FAF9F7] rounded-2xl border border-[#E5E5DF]">
            <div className="mt-1 text-[#7A9E7E]"><MapPin size={24} /></div>
            <div><p className="text-sm text-[#7A857D] font-medium mb-1">Cabinet</p><p className="text-xl font-heading text-[#2A342D]">Chaussée de Mons 909</p><p className="text-lg text-[#2A342D]">1070 Anderlecht</p><p className="text-sm text-[#7A9E7E] font-medium mt-1">Parking facile</p></div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-[#FAF9F7] rounded-2xl border border-[#E5E5DF]">
            <div className="mt-1 text-[#7A9E7E]"><MapPin size={24} /></div>
            <div><p className="text-sm text-[#7A857D] font-medium mb-1">Consultations</p><p className="text-lg font-heading text-[#2A342D]">Au cabinet : mercredi 12h-19h</p><p className="text-lg font-heading text-[#2A342D]">À domicile : lundi-vendredi</p><p className="text-sm text-[#5C665F] font-light mt-1">Nivelles, Braine-l'Alleud, Waterloo et environs</p></div>
          </div>
        </div>
        <div className="lg:col-span-7 bg-[#FAF9F7] p-8 md:p-12 rounded-3xl border border-[#E5E5DF]">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Demande envoyée."); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-medium text-[#5C665F]">Nom complet</label><input type="text" required className="w-full p-4 bg-white border border-[#E5E5DF] rounded-xl focus:outline-none focus:border-[#7A9E7E] transition-colors text-[#2A342D]" /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-[#5C665F]">Téléphone</label><input type="tel" required className="w-full p-4 bg-white border border-[#E5E5DF] rounded-xl focus:outline-none focus:border-[#7A9E7E] transition-colors text-[#2A342D]" /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#5C665F]">Motif de consultation</label>
              <select className="w-full p-4 bg-white border border-[#E5E5DF] rounded-xl focus:outline-none focus:border-[#7A9E7E] transition-colors appearance-none text-[#2A342D]">
                <option value="">Sélectionnez un motif...</option>
                {SERVICES.map(s => <option key={s.id}>{s.category}</option>)}
              </select>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#5C665F]">Votre message (optionnel)</label><textarea rows={4} className="w-full p-4 bg-white border border-[#E5E5DF] rounded-xl focus:outline-none focus:border-[#7A9E7E] transition-colors resize-none text-[#2A342D]"></textarea></div>
            <Button type="submit" className="w-full py-4 text-base">Envoyer la demande</Button>
          </form>
        </div>
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto mt-24 px-4 md:px-8">
      <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden rounded-2xl border border-[#E5E5DF] shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.6144165756163!2d4.298715!3d50.841359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c6b7c5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sChauss%C3%A9e+de+Mons+909%2C+1070+Anderlecht!5e0!3m2!1sfr!2sbe!4v1"
          width="100%" height="100%" style={{ border: 0 }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Chaussée de Mons 909, 1070 Anderlecht"
        />
      </div>
    </div>
  </main>
);

const FaqView = () => (
  <main className="w-full pt-40 pb-32 bg-[#FAF9F7] min-h-[100dvh]">
    <div className="max-w-[800px] mx-auto px-4 md:px-8">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#2A342D] mb-16 text-center tracking-tight">Questions fréquentes</h1>
      <div className="space-y-4">
        {FAQ_DATA.map((faq, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-[#E5E5DF] p-6 cursor-pointer marker:content-[''] shadow-sm">
            <summary className="font-heading text-xl font-medium text-[#2A342D] flex justify-between items-center outline-none">{faq.q}<ChevronDown className="transition-transform duration-300 group-open:rotate-180 text-[#9AA59D]" /></summary>
            <div className="pt-4 text-[#5C665F] font-light text-lg leading-relaxed">{faq.a}</div>
          </details>
        ))}
      </div>
    </div>
  </main>
);

const LegalView = ({ navigate }: { navigate: NavigateFn }) => (
  <main className="w-full pt-40 pb-32 bg-white min-h-[100dvh]">
    <div className="max-w-[900px] mx-auto px-4 md:px-8">
      <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#2A342D] mb-16 tracking-tight">Mentions légales</h1>
      <div className="space-y-12 text-[#5C665F] text-lg font-light leading-relaxed">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-4">Identité</h2>
          <p><strong>Nom :</strong> Louisiane Barbier</p>
          <p><strong>Activité :</strong> Pédicure médicale</p>
          <p><strong>Adresse :</strong> Chaussée de Mons 909, 1070 Anderlecht</p>
          <p><strong>Téléphone :</strong> 0496 10 96 97</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-4">Numéro d'entreprise</h2>
          <p>À confirmer — numéro BCE/TVA en cours de vérification.</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-4">Hébergeur</h2>
          <p>Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-4">Protection des données (RGPD)</h2>
          <p>Les informations recueillies via le formulaire de contact sont destinées à Louisiane Barbier dans le but de répondre à votre demande. Elles ne sont pas conservées au-delà du temps nécessaire au traitement de votre demande et ne sont en aucun cas transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez Louisiane Barbier par téléphone au 0496 10 96 97.</p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2A342D] mb-4">Cookies</h2>
          <p>Ce site n'utilise pas de cookies de suivi ou de publicité. Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.</p>
        </div>
      </div>
      <div className="mt-16"><Button onClick={() => navigate('home')} variant="outline">Retour à l'accueil</Button></div>
    </div>
  </main>
);

const Navigation = ({ currentPage, navigate }: { currentPage: string; navigate: NavigateFn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E5DF] py-4 shadow-sm' : 'bg-[#FAF9F7] py-6'}`;
  const linkClass = "text-sm font-medium transition-colors hover:text-[#7A9E7E] text-[#5C665F]";
  const navItems = [{ id: 'home', label: 'Accueil' }, { id: 'soins', label: 'Nos soins' }, { id: 'apropos', label: 'À propos' }, { id: 'faq', label: 'FAQ' }, { id: 'contact', label: 'Contact' }];
  const handleNav = (id: string) => { navigate(id); setMobileMenuOpen(false); };
  return (
    <>
      <nav className={navClass}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <div onClick={() => handleNav('home')} className="font-heading text-2xl font-bold cursor-pointer tracking-tight text-[#2A342D]">Louisiane Barbier</div>
          <div className="nav-desktop flex gap-8 items-center">
            {navItems.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)} className={`${linkClass} ${currentPage === item.id ? 'text-[#2A342D] font-semibold' : ''}`}>{item.label}</button>
            ))}
            <Button onClick={() => handleNav('contact')} variant="nav">Prendre rendez-vous</Button>
          </div>
          <button className="nav-mobile-btn text-[#2A342D]" onClick={() => setMobileMenuOpen(true)}><Menu size={28} /></button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-[80%] max-w-sm bg-white h-full p-8 flex flex-col shadow-2xl border-l border-[#E5E5DF]">
            <button className="self-end text-[#7A857D] mb-12 hover:text-[#2A342D] transition-colors" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            <div className="flex flex-col gap-6">
              {navItems.map(item => (
                <button key={item.id} onClick={() => handleNav(item.id)} className={`text-left text-2xl font-heading font-medium text-[#2A342D] hover:text-[#7A9E7E] transition-colors ${currentPage === item.id ? 'text-[#7A9E7E]' : ''}`}>{item.label}</button>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-[#E5E5DF]"><Button onClick={() => handleNav('contact')} className="w-full">Prendre rendez-vous</Button></div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ navigate }: { navigate: NavigateFn }) => (
  <footer className="bg-white border-t border-[#E5E5DF] pt-24 pb-12 px-4 md:px-8">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
      <div className="md:col-span-5">
        <h3 className="font-heading text-2xl font-bold mb-4 text-[#2A342D]">Louisiane Barbier</h3>
        <p className="text-[#5C665F] font-light text-lg mb-6 max-w-sm leading-relaxed">Pédicure médicale indépendante — soins préventifs et curatifs. Cabinet à Anderlecht et consultations à domicile.</p>
      </div>
      <div className="md:col-span-3 lg:col-start-8">
        <h4 className="font-medium mb-6 text-[#2A342D]">Navigation</h4>
        <div className="flex flex-col gap-3 font-light text-[#5C665F]">
          {[['Accueil', 'home'], ['Nos soins', 'soins'], ['À propos', 'apropos'], ['FAQ', 'faq'], ['Contact', 'contact']].map(([label, id]) => (
            <button key={id} onClick={() => navigate(id)} className="text-left hover:text-[#7A9E7E] transition-colors w-fit">{label}</button>
          ))}
        </div>
      </div>
      <div className="md:col-span-4 lg:col-span-2">
        <h4 className="font-medium mb-6 text-[#2A342D]">Contact</h4>
        <div className="space-y-3 font-light text-[#5C665F]">
          <p>0496 10 96 97</p>
          <p>Chaussée de Mons 909, 1070 Anderlecht</p>
        </div>
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto pt-8 border-t border-[#E5E5DF] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#7A857D] font-light">
      <p>&copy; {new Date().getFullYear()} Barbier Louisiane, Pédicure Médicale.</p>
      <button onClick={() => navigate('legal')} className="hover:text-[#2A342D] transition-colors">Mentions légales</button>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => { injectStyles(); window.scrollTo(0, 0); }, []);
  const navigate = useCallback((page: string) => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setCurrentPage(page), 50); }, []);
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView navigate={navigate} />;
      case 'soins': return <SoinsView navigate={navigate} />;
      case 'apropos': return <AboutView navigate={navigate} />;
      case 'faq': return <FaqView />;
      case 'legal': return <LegalView navigate={navigate} />;
      case 'contact': return <ContactView />;
      default: return <HomeView navigate={navigate} />;
    }
  };
  return (
    <div className="mockup-barbier-wrapper min-h-screen flex flex-col selection:bg-[#E8EFE9] selection:text-[#67876A]">
      <Navigation currentPage={currentPage} navigate={navigate} />
      <div className="flex-grow">{renderPage()}</div>
      <Footer navigate={navigate} />
    </div>
  );
}
