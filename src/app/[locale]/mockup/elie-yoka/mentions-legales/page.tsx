'use client';

import React, { useEffect } from 'react';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

const injectStyles = () => {
  if (document.getElementById('elie-legal-styles')) return;
  const style = document.createElement('style');
  style.id = 'elie-legal-styles';
  style.innerHTML = `
    @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
    .elie-legal-wrapper {
      --font-display: 'Cabinet Grotesk', sans-serif;
      --font-body: 'Outfit', sans-serif;
      font-family: var(--font-body);
      color: #09090b;
      background-color: #f8f9fa;
      -webkit-font-smoothing: antialiased;
    }
    .elie-legal-wrapper * { font-family: inherit; }
    .elie-legal-wrapper h1, .elie-legal-wrapper h2, .elie-legal-wrapper h3, .elie-legal-wrapper .font-display {
      font-family: var(--font-display) !important;
    }
  `;
  document.head.appendChild(style);
};

export default function MentionsLegales() {
  useEffect(() => { injectStyles(); }, []);

  return (
    <div className="elie-legal-wrapper min-h-[100dvh] bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <a 
          href="/fr/mockup/elie-yoka"
          className="inline-flex items-center gap-2 text-[#1a365d] font-medium hover:text-[#f59e0b] transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour au site
        </a>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#1a365d] text-white flex items-center justify-center shadow-lg">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-4xl text-[#1a365d] tracking-tight">Mentions légales</h1>
            <p className="text-zinc-500 text-sm mt-1">Dernière mise à jour : mai 2026</p>
          </div>
        </div>

        <div className="space-y-10 text-sm md:text-base text-zinc-600 leading-relaxed bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] border border-zinc-100">
          
          <div>
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">1. Identité de l'exploitant</h2>
            <p className="mb-2"><strong>Nom :</strong> Elie Yoka</p>
            <p className="mb-2"><strong>Statut :</strong> Étudiant indépendant (Brabant Wallon)</p>
            <p className="mb-2"><strong>Numéro d'entreprise :</strong> En cours d'immatriculation auprès de la Banque-Carrefour des Entreprises (BCE)</p>
            <p><strong>Adresse :</strong> Nivelles, Brabant Wallon, Belgique</p>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">2. Coordonnées de contact</h2>
            <p className="mb-2"><strong>Téléphone :</strong> <a href="tel:+32466494536" className="text-[#1a365d] font-medium hover:text-[#f59e0b] transition-colors">+32 466 49 45 36</a></p>
            <p><strong>Email :</strong> À définir</p>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">3. Hébergement</h2>
            <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p className="mb-2">340 S Lemon Ave #4133</p>
            <p className="mb-2">Walnut, CA 91789, États-Unis</p>
            <p><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#1a365d] font-medium hover:text-[#f59e0b] transition-colors">vercel.com</a></p>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">4. Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, logo, structure) est la propriété d'Elie Yoka, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.</p>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">5. Protection des données (RGPD)</h2>
            <p className="mb-4">Conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l'égard des traitements de données à caractère personnel :</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                <span>Les données collectées via le formulaire de contact (nom, prénom, email, téléphone) sont utilisées uniquement dans le but de répondre à votre demande.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                <span>Ces données ne sont pas revendues, ni partagées avec des tiers.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                <span>Elles sont conservées le temps nécessaire au traitement de votre demande et supprimées sur simple demande.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                <span>Conformément à la loi, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer, contactez Elie Yoka par téléphone ou via le formulaire de contact.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">6. Cookies</h2>
            <p>Ce site n'utilise pas de cookies de suivi ou de pistage publicitaire. Des cookies strictement fonctionnels peuvent être utilisés par l'hébergeur Vercel à des fins de performance et de sécurité. Aucune donnée personnelle n'est collectée via des cookies.</p>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <h2 className="font-display font-bold text-xl text-[#1a365d] mb-4">7. Droit applicable</h2>
            <p>Le présent site est soumis au droit belge. En cas de litige, les tribunaux de l'arrondissement judiciaire du Brabant Wallon sont seuls compétents.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/fr/mockup/elie-yoka"
            className="inline-flex items-center gap-2 bg-[#1a365d] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#112440] transition-colors shadow-md"
          >
            <ArrowLeft size={20} />
            Retour au site Elie Yoka
          </a>
        </div>
      </div>
    </div>
  );
}
