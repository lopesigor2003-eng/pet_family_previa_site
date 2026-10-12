/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Stethoscope,
  Pill,
  Scissors,
  Truck,
  Home,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Instagram,
  Facebook,
  ExternalLink,
  Award
} from 'lucide-react';

// Data Types
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: 'clinica' | 'estetica' | 'conveniencia';
  icon: React.ReactNode;
  featured?: boolean;
}

interface Testimonial {
  id: string;
  client: string;
  role: string;
  quote: string;
  rating: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'all' | 'clinica' | 'estetica' | 'conveniencia'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Quick WhatsApp Booking Form State
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Cachorro');
  const [selectedService, setSelectedService] = useState('Atendimento Veterinário');
  const [preferredDate, setPreferredDate] = useState('');
  const [bookingNote, setBookingNote] = useState('');

  // Carousel Images com fotos oficiais da Clínica Pet Family em alta resolução
  const petCarouselImages = [
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RFAbgqaQyHbunxW63Z9Pf5c2MtUPZMTgjD8PxiqYP4a6cqoMEiN4uYRtjUuHUONJwY3bZIUuwcQOw4jU1b_oR-rwpIZGm-pbNn0MdCBGsfy9S2mDKzB0WMueq2Fvgi5ZAt=s1200',
      caption: 'Estrutura moderna e acolhedora da Clínica Veterinária Pet Family em Santa Maria.',
      tag: 'Nossa Estrutura'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T-iRZOkim5O9jy0H2PZezs93E5bjoMK6xERCDmP9v5-ixlcNyd3d6ymbIWULQqEbrHEPyLARIsjpYC6j628hYU8CDNO8ZPnNevBBwSEGpwosZulujYFUs9UV1fY0eVqvLmS2wrLw=s1200',
      caption: 'Cuidado afetuoso e acolhimento clínico personalizado para cada pet.',
      tag: 'Cuidado Clínico'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q1A0EI3m2H9Q9xhLHPOVF_2ycxhG7HFaojF2xgN9INCD28ZcoBmNbSI8Hlc_lz25RKYLONboiYPDFAV4PiUMsloWNoFDObUjQaZkz7sCSZVDnEpVL4Mpr2i3zwG-elYOZJKPc=s1200',
      caption: 'Ambiente seguro e equipe dedicada para a saúde e bem-estar do seu companheiro.',
      tag: 'Bem-Estar Animal'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RoeeM5Ys43TTd80FaceVw1al5QxJJZxy7GVbJgFwomM6efAUJz6_FxP8UNqTj0dExqz0Axh7wWt3ZNSno28isxnPlHKXC-zvF2NXveLZPAony39BamwBFKJ5I8K_jYQjZHknkS8g=s1200',
      caption: 'Estética, banho e tosa com produtos de alto padrão e extremo carinho.',
      tag: 'Estética Premium'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RSqTx8GpnQFzUO6ld9w5lcfqECR7anfFnJN2qO2Wk6q9lZGonP1K8-83jIg3NqVCy2y-2AMTNsKmq19rTLEBNmZGQARtnnhY4E-3y-9hBHde9kpbRT4KPO2hoJAbeTITXRFx-t=s1200',
      caption: 'Consultório preparado para consultas detalhadas e condutas clínicas seguras.',
      tag: 'Atendimento Veterinário'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RzAZQZtIVcvLRhc3WF-pWVZnAajAdCd2TJsgkeJqxvDfyWjed-K-_lUcce4yBFKWxuIW5o4UGwkKjgGAPFnknNV7-Kgkipna7Fn-ZoaFOQ0vcBkbeyQaXaVGMvLPic-yr5-Ke-=s1200',
      caption: 'Momentos felizes e recuperação plena de cães e gatos em Santa Maria.',
      tag: 'Recuperação & Amor'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RCgHfai9fD55choE6QW7ho6qHN_dUCBnkujM__SQDpQJdyDypO99HrI95gwanIvTox3uABvT-bH769JQTAzYG3CRy5FPVRzVAIOtfVNsxkzNwK7MlUrSPlfjV2vIDzOuYrmJ014Q=s1200',
      caption: 'Confiança mútua: profissionais preparados e apaixonados por animais.',
      tag: 'Família Pet'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RUL-ORctGARsSprDqM4vS-Z66ngT6Q49jpflV0I_n4FIT7JE2bQOjLuXRFwQO5O-3UbfKLhDCHmdiQI0GVafXqd0FXLiDSogC0HY-xbonIQEIIwvcnUTn2GH8-gUbLfk_sjSxs6g=s1200',
      caption: 'Atenção carinhosa em cada procedimento preventivo e terapêutico.',
      tag: 'Dedicação Total'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R0eZ7lmKPI53Vw1-U87H0aI9gCoUS1dbfBndEyWa7zLCNRV_UfSNvddLFAqA8EZkO8NFVc2EO6MkUb4Y8VBz4t6FGgiXJYyIM5-12IkuijtD4x7c-60ThUTcKbxMCWWJvHI8LR=s1200',
      caption: 'Espaço climatizado e confortável para o descanso e atendimento do seu pet.',
      tag: 'Conforto & Segurança'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R2TonPkraf66Cc1IUWEJG7fxQx1vTngTwykfL_eF-8FNcR2HRYbwiEs7Ln5yeekwPiQ4AloJ4NKPkSCKtfjB0z7K4s6Pr_0TjuYXD62MYM7_Q1CO6ons9U-oBGEZCE6iC9WsJt=s1200',
      caption: 'Cuidados especiais que garantem a tranquilidade de tutores e pets.',
      tag: 'Qualidade Pet Family'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Ty267VAljY3RBTqfweoZupAs1ER6QH5Bk8joZlabadD_9CpfV5cirdrfQe2HalL4f5s1pvTb88_ORAZx_1Iesrkp9V-P84Xp-PHaTON1DuKawzFdRVKcitbMcT5uCifiZZKi5lZDfELfi-=s1200',
      caption: 'Tecnologia diagnóstica e profissionais altamente capacitados.',
      tag: 'Medicina Preventiva'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TD5VBc4CPxnvfYpmvkiAQF1HeQP4CA0mJHe8xnZGes_MiAfQa2yLZy4TJQvdgN-B3X3z-p6b8e3kfLG7pHlNiaEqP35UETa8xVD9TtmKxz2NfcXlaO0gDDRKIt0O-eNRRzfnVM=s1200',
      caption: 'Equipamentos modernos para exames ágeis e procedimentos cirúrgicos.',
      tag: 'Centro Clínico'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QKIwvlysHFcMY3IG-UeseGb5g9CyMhyUtCMZjniq_Xg1uduexcoCiTpRsr3ifZnbbJSl_nUmMkI_6sowVIaNJya8-eXgDRPoE20nIWgS1xi3kTumvYvcEp1Vh-oi1q5LGnWYqo=s1200',
      caption: 'Aconchego e empatia em cada momento da jornada do seu pet.',
      tag: 'Acolhimento'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QQCbjFb8bLgeapKC-t4vCQQww7pVdgo6qRA2X7F6TVq_CJjFi4EjjTOuEkrRSPUlZvAWrVtbG86jQ0y6AitlDpvLWi0pRN_rHobbfbt1LeCxo7GQ-OPdg9dHjvOn_Rtf-DGtw=s1200',
      caption: 'Amor pelos animais refletido em cada detalhe de nosso atendimento.',
      tag: 'Amor & Cuidado'
    },
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TvyNyZUDPe20UXeYZxM6yQAY12jf6xI5hYustwmcpmfpNeW8ZjA5RX4taLPIWm2T1_-S-pCb2mRHbLex_rlVr2TPYzf_ILtZNewoBEQ5u8tOG36S2b1ltuhnK1t1gcafy3nihw=s1200',
      caption: 'Sua clínica de confiança em Santa Maria - RS: venha nos visitar!',
      tag: 'Pet Family Santa Maria'
    }
  ];

  // Auto-play for Carousel: 5 segundos exatos
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % petCarouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, petCarouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % petCarouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + petCarouselImages.length) % petCarouselImages.length);
  };

  // Services Catalog
  const services: ServiceItem[] = [
    {
      id: 'atendimento-veterinario',
      title: 'Atendimento Veterinário',
      description: 'Consultas preventivas, rotina e emergência com veterinários especialistas dedicados à longevidade do seu amigo.',
      category: 'clinica',
      icon: <Stethoscope className="w-6 h-6 text-[#00becf]" />
    },
    {
      id: 'medicamentos',
      title: 'Medicamentos',
      description: 'Farmácia veterinária completa com remédios de referência, suplementos e itens dermatológicos de procedência garantida.',
      category: 'clinica',
      icon: <Pill className="w-6 h-6 text-[#fc7600]" />
    },
    {
      id: 'cirurgias',
      title: 'Cirurgias',
      description: 'Centro cirúrgico de ponta com anestesia inalatória e monitoramento multiparamétrico com máxima segurança biológica.',
      category: 'clinica',
      icon: <ShieldCheck className="w-6 h-6 text-[#00becf]" />
    },
    {
      id: 'exames',
      title: 'Exames',
      description: 'Diagnósticos laboratoriais e de imagem com rapidez e precisão para condutas clínicas ágeis e eficientes.',
      category: 'clinica',
      icon: <Award className="w-6 h-6 text-[#fc7600]" />
    },
    {
      id: 'acessorios-pets',
      title: 'Acessórios Pets',
      description: 'Coleiras elegantes, peitorais ergonômicos, caminhas confortáveis e brinquedos selecionados para o dia a dia do seu pet.',
      category: 'conveniencia',
      icon: <ShoppingBag className="w-6 h-6 text-[#00becf]" />
    },
    {
      id: 'banho-e-tosa',
      title: 'Banho e Tosa',
      description: 'Estética animal com produtos hipoalergênicos premium, tosa higiênica, hidratação profunda e profissionais acolhedores.',
      category: 'estetica',
      icon: <Scissors className="w-6 h-6 text-[#fc7600]" />
    },
    {
      id: 'pacotes-de-banho',
      title: 'Pacotes de Banho',
      description: 'Planos mensais e quinzenais com condições vantajosas, garantindo seu melhor amigo sempre limpo, cheiroso e saudável.',
      category: 'estetica',
      icon: <Sparkles className="w-6 h-6 text-[#00becf]" />
    },
    {
      id: 'taxi-pet',
      title: 'Taxi Pet',
      description: 'Transporte seguro e climatizado com caixas higienizadas, buscando e levando seu pet com pontualidade e extremo carinho.',
      category: 'conveniencia',
      icon: <Truck className="w-6 h-6 text-[#fc7600]" />
    },
    {
      id: 'hospedagem-e-creche',
      title: 'Hospedagem e Creche',
      description: 'Ambiente aconchegante, enriquecimento ambiental e supervisão constante para seu companheiro brincar e descansar com paz.',
      category: 'conveniencia',
      icon: <Home className="w-6 h-6 text-[#00becf]" />
    }
  ];

  const filteredServices = activeServiceTab === 'all'
    ? services
    : services.filter(s => s.category === activeServiceTab);

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      id: '1',
      client: 'Paula Zampieri',
      role: 'Tutora do Bento',
      quote: 'Atendimento maravilhoso, a Dra. Tainá é muito atenciosa e uma profissional exemplar, meu gatinho se recuperou muito bem.',
      rating: 5
    },
    {
      id: '2',
      client: 'Ana Carolina Zampieri',
      role: 'Tutora da Mel',
      quote: 'Clínica com profissionais muito atenciosos, acolhimento e cuidado com os pets e seus tutores. Indico muito!',
      rating: 5
    },
    {
      id: '3',
      client: 'Gabriela Viana',
      role: 'Tutora do Thor',
      quote: 'Ótimo atendimento, desde a recepção até os veterinários. Super recomendo!',
      rating: 5
    },
    {
      id: '4',
      client: 'Marcos Silva',
      role: 'Cliente Satisfeito',
      quote: 'Profissionais super qualificados e um carinho enorme com os animais. Recomendo de olhos fechados!',
      rating: 5
    },
    {
      id: '5',
      client: 'Juliana Mendes',
      role: 'Cliente Satisfeita',
      quote: 'A melhor clínica de Santa Maria! Meu cachorro adora vir aqui.',
      rating: 5
    }
  ];



  // Helper to open WhatsApp with pre-filled message
  const handleWhatsAppBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let text = `Olá! Gostaria de agendar um atendimento na Pet Family.\n`;
    if (petName) text += `*Pet:* ${petName} (${petType})\n`;
    if (selectedService) text += `*Serviço:* ${selectedService}\n`;
    if (preferredDate) text += `*Previsão de Data:* ${preferredDate}\n`;
    if (bookingNote) text += `*Observação:* ${bookingNote}\n`;
    text += `Poderiam me informar a disponibilidade de horários?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/555532174672?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleServiceClick = (serviceTitle: string) => {
    const text = encodeURIComponent(`Olá! Gostaria de mais informações e agendamento para o serviço de *${serviceTitle}* na Pet Family.`);
    window.open(`https://wa.me/555532174672?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-[#00becf]/30 selection:text-white">

      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 glass-nav border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* Brand Zone */}
            <a
              href="#home"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00becf] rounded-lg p-1"
              aria-label="Clínica Veterinária Pet Family - Ir para Home"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/15 p-0.5 shadow-lg group-hover:border-[#00becf]/50 transition-colors">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://i.postimg.cc/TP6FmvWZ/438224100-349150321489222-6248131964965989282-n.jpg"
                  alt="Clínica Veterinária Pet Family - Logotipo"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to stylized logo badge if external host fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00becf] transition-colors whitespace-nowrap">
                  Pet Family
                </span>
                <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400 whitespace-nowrap">
                  Policlínica Veterinária
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300" aria-label="Navegação Principal">
              <a href="#home" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Home</a>
              <a href="#sobre-nos" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Sobre Nós</a>
              <a href="#servicos" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Serviços</a>
              <a href="#depoimentos" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Depoimentos</a>
              <a href="#horarios" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Horários</a>
              <a href="#localizacao" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Localização</a>
              <a href="#contato" className="hover:text-[#00becf] transition-colors whitespace-nowrap py-1">Contato</a>
            </nav>

            {/* Action CTA Zone */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/555532174672"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-black bg-[#00becf] hover:bg-[#13d4e6] active:scale-95 shadow-[0_0_20px_rgba(0,190,207,0.35)] transition-all whitespace-nowrap font-heading tracking-wide"
                aria-label="Agende seu Pet via WhatsApp no número 55 3217-4672"
              >
                <MessageCircle className="w-4 h-4 fill-black text-transparent" />
                <span>Agende seu Pet</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00becf]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-3 text-base font-medium text-slate-200" aria-label="Menu Mobile">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Home
              </a>
              <a
                href="#sobre-nos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Sobre Nós
              </a>
              <a
                href="#servicos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Serviços
              </a>
              <a
                href="#depoimentos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Depoimentos
              </a>
              <a
                href="#horarios"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Horários
              </a>
              <a
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Localização
              </a>
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#00becf] transition-colors"
              >
                Contato
              </a>
              <div className="pt-2">
                <a
                  href="https://wa.me/555532174672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-black bg-[#00becf] hover:bg-[#13d4e6] transition-all shadow-lg text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-black text-transparent" />
                  <span>Agende seu Pet pelo WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {/* HERO SECTION */}
        <section
          id="home"
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24"
          aria-label="Destaque Principal"
        >
          {/* Subtle Ambient Radial Backdrops (Luxury Dark Aesthetics) */}
          <div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00becf]/15 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#fc7600]/12 blur-[130px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,190,207,0.12),rgba(0,0,0,0.85))]"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Proposition Column */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                
                {/* Clean Unboxed Editorial Eyebrow */}
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00becf]">
                  <span>Policlínica Veterinária</span>
                  <span aria-hidden="true">·</span>
                  <span>Santa Maria - RS</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#fc7600]">Padrão Premium</span>
                </div>

                {/* Primary H1 */}
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] max-w-2xl text-balance">
                  Clínica Veterinária Pet Family: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00becf] via-[#7ae5ef] to-white">Amor e Cuidado</span> para seu Melhor Amigo
                </h1>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                  Aqui, seu pet recebe muito mais do que cuidado… recebe amor de verdade! 🐾💛 Da consulta ao banho, da saúde ao bem-estar, temos tudo o que seu melhor amigo precisa em um só lugar.
                </p>

                {/* CTAs & Trust Signals */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <a
                    href="https://wa.me/555532174672"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-black bg-[#00becf] hover:bg-[#1fe0f3] active:scale-95 shadow-[0_0_30px_rgba(0,190,207,0.45)] transition-all tracking-wide font-heading text-center"
                    aria-label="Agende pelo WhatsApp no número (55) 3217-4672"
                  >
                    <MessageCircle className="w-5 h-5 fill-black text-transparent shrink-0" />
                    <span>Agende pelo WhatsApp</span>
                  </a>

                  <a
                    href="#servicos"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-base text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#00becf]/40 transition-all font-heading text-center"
                  >
                    <span>Conheça Nossos Serviços</span>
                  </a>
                </div>

                {/* Trust Highlights Strip */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
                  <div>
                    <span className="block font-heading font-bold text-xl sm:text-2xl text-white tabular-nums">100%</span>
                    <span className="text-xs text-slate-400">Amor & Dedicação</span>
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-xl sm:text-2xl text-[#00becf] tabular-nums">Completa</span>
                    <span className="text-xs text-slate-400">Policlínica & Pet Shop</span>
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-xl sm:text-2xl text-[#fc7600] tabular-nums">Santa Maria</span>
                    <span className="text-xs text-slate-400">Patronato - RS</span>
                  </div>
                </div>

              </div>

              {/* Visual Anchor Column: Apenas a imagem em destaque limpo e elegante */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl group">
                  <img
                    src="https://i.postimg.cc/TP6FmvWZ/438224100-349150321489222-6248131964965989282-n.jpg"
                    alt="Clínica Veterinária Pet Family"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SEÇÃO "SOBRE NÓS" / MISSÃO & CARROSSEL DE PETS */}
        <section
          id="sobre-nos"
          className="py-20 lg:py-28 relative bg-[#050608] border-t border-b border-white/10"
          aria-label="Sobre Nós e Nossa Missão"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Mission Text */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00becf]">
                  <span>Quem Somos</span>
                  <span aria-hidden="true">·</span>
                  <span>Nossa Filosofia</span>
                </div>

                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Nossa Missão: Cuidado e Carinho em Primeiro Lugar
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Confiança, carinho e profissionais preparados para cuidar de quem faz parte da sua família. Agende um atendimento e venha conhecer nossos serviços!
                </p>

                {/* Key Highlights */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#00becf] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Equipe técnica qualificada e apaixonada pela vida animal.</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#fc7600] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Estrutura completa com centro cirúrgico, farmácia e exames.</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#00becf] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Atendimento acolhedor tanto para o pet quanto para o tutor.</span>
                  </div>
                </div>

                {/* Mission Contact Card */}
                <div className="p-5 rounded-2xl glass-panel space-y-3 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin className="w-4 h-4 text-[#fc7600] shrink-0" />
                    <span><strong>📍 Pet Family – Policlínica Veterinária</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="w-4 h-4 text-[#00becf] shrink-0" />
                    <span><strong>📞 Agende pelo WhatsApp:</strong> (55) 3217-4672</span>
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/555532174672"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#00becf] hover:text-[#41e1ee] transition-colors"
                    >
                      <span>Abrir conversa no WhatsApp agora</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Pets Carousel */}
              <div className="lg:col-span-7">
                <div
                  className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 p-4 sm:p-6"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  aria-roledescription="carousel"
                  aria-label="Galeria de Pets atendidos na Pet Family"
                >
                  
                  {/* Active Slide Viewer no formato original */}
                  <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden bg-black/90 shadow-2xl flex items-center justify-center p-2 sm:p-4">
                    {/* Fundo suave desfocado para preenchimento de ambiente */}
                    <img
                      key={`bg-${currentSlide}`}
                      src={petCarouselImages[currentSlide].url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                    />

                    {/* Imagem em Formato Original Integral (Sem cortes e sem distorções) */}
                    <img
                      key={`img-${currentSlide}`}
                      loading="lazy"
                      decoding="async"
                      src={petCarouselImages[currentSlide].url}
                      alt={`Foto da Clínica Pet Family - ${petCarouselImages[currentSlide].tag}`}
                      className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-opacity duration-500 ease-in-out"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.postimg.cc/TP6FmvWZ/438224100-349150321489222-6248131964965989282-n.jpg";
                      }}
                    />

                    {/* Sombra de leitura inferior */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />

                    {/* Slide Caption Box */}
                    <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 z-30 flex items-end justify-between gap-3">
                      <div className="max-w-md sm:max-w-lg">
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-black bg-[#00becf] px-2.5 py-1 rounded-md mb-1.5 shadow">
                          {petCarouselImages[currentSlide].tag}
                        </span>
                        <p className="text-xs sm:text-sm text-white font-medium drop-shadow-md">
                          {petCarouselImages[currentSlide].caption}
                        </p>
                      </div>

                      {/* Slide Counter */}
                      <div className="shrink-0 text-xs font-mono px-3 py-1 rounded-full bg-black/70 text-white border border-white/15 backdrop-blur-md">
                        {currentSlide + 1} / {petCarouselImages.length}
                      </div>
                    </div>
                  </div>

                  {/* Controls Bar */}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95"
                        aria-label="Foto anterior do carrossel"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95"
                        aria-label="Próxima foto do carrossel"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Indicators Dots */}
                    <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-xs overflow-x-auto py-1 px-1">
                      {petCarouselImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all shrink-0 ${
                            currentSlide === index
                              ? 'w-6 bg-[#00becf]'
                              : 'w-2 bg-white/30 hover:bg-white/60'
                          }`}
                          aria-label={`Ir para foto ${index + 1}`}
                          aria-current={currentSlide === index ? "true" : undefined}
                        />
                      ))}
                    </div>

                    {/* Quick Booking button */}
                    <a
                      href="https://wa.me/555532174672"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-2 rounded-lg bg-[#fc7600] hover:bg-[#ff891e] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Agendar Banho / Consulta</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SEÇÃO "NOSSOS SERVIÇOS" */}
        <section
          id="servicos"
          className="py-20 lg:py-28 relative"
          aria-label="Confira os Nossos Serviços"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00becf]">
                <span>Excelência Médica & Estética</span>
                <span aria-hidden="true">·</span>
                <span>Cuidado Completo</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
                Confira os Nossos Serviços
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Soluções integradas com infraestrutura moderna, carinho e responsabilidade profissional para todas as etapas da vida do seu companheiro.
              </p>

              {/* Functional Interactive Segmented Control Tabs */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveServiceTab('all')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeServiceTab === 'all'
                      ? 'bg-[#00becf] text-black shadow-lg shadow-[#00becf]/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Todos os Serviços
                </button>
                <button
                  type="button"
                  onClick={() => setActiveServiceTab('clinica')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeServiceTab === 'clinica'
                      ? 'bg-[#00becf] text-black shadow-lg shadow-[#00becf]/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Clínica & Cirurgia
                </button>
                <button
                  type="button"
                  onClick={() => setActiveServiceTab('estetica')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeServiceTab === 'estetica'
                      ? 'bg-[#00becf] text-black shadow-lg shadow-[#00becf]/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Banho & Estética
                </button>
                <button
                  type="button"
                  onClick={() => setActiveServiceTab('conveniencia')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeServiceTab === 'conveniencia'
                      ? 'bg-[#00becf] text-black shadow-lg shadow-[#00becf]/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Hotel, Taxi & Boutique
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 border border-white/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#00becf]/30 transition-colors">
                        {service.icon}
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                        {service.category === 'clinica' ? 'Saúde' : service.category === 'estetica' ? 'Estética' : 'Conveniência'}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#00becf] transition-colors mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleServiceClick(service.title)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#00becf] hover:text-white transition-colors"
                      aria-label={`Agendar ${service.title} via WhatsApp`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Agendar no WhatsApp</span>
                    </button>
                    <span className="text-xs text-slate-400">Pet Family</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SPECIAL MARQUEE CARD: "Rações e Produtos" */}
            <div className="mt-12 rounded-3xl glass-card-accent p-6 sm:p-10 border border-[#fc7600]/30 shadow-2xl overflow-hidden relative">
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#fc7600]/15 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#fc7600]">
                    <span>Nutrição & Farmácia</span>
                    <span aria-hidden="true">·</span>
                    <span>Pet Shop Selecionado</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                    Rações Super Premium e Produtos Especiais
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Aqui você encontra as melhores marcas de rações medicamentosas e de manutenção, petiscos saudáveis, suplementos veterinários e brinquedos interativos. Tudo cuidadosamente selecionado por médicos veterinários para nutrir e entreter seu pet.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="https://wa.me/555532174672?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20disponibilidade%20de%20ra%C3%A7%C3%B5es%20e%20produtos%20na%20Pet%20Family."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-[#fc7600] hover:bg-[#ff891e] text-white shadow-lg transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Consultar Rações & Produtos no WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-xl group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TAFQ2hJEnRBJ4VIfNSZy0GHqWzko49EPpBMhM2UJoInhcuT4ta9gTKyd1uXnmnjZT1Rnf6aV0pWgTZa4umV-npd-6LFWDWUuYOXGyEtaTkrK9_B_7UOpoEgRdw0tRw2xyjdJhj=s1200"
                      alt="Rações e Produtos selecionados da Clínica Veterinária Pet Family"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.postimg.cc/TP6FmvWZ/438224100-349150321489222-6248131964965989282-n.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-white">
                      Produtos & Farmácia Pet Family
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO "DEPOIMENTOS" */}
        <section
          id="depoimentos"
          className="py-20 lg:py-28 relative bg-[#050608] border-t border-b border-white/10"
          aria-label="Depoimentos de Clientes"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00becf]">
                <span>Depoimentos Reais</span>
                <span aria-hidden="true">·</span>
                <span>Avaliação 5 Estrelas</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                A alegria dos tutores e a saúde dos pets são a maior prova do nosso compromisso diário com a excelência.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <article
                  key={t.id}
                  className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#00becf]/30 transition-all ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1 border-[#00becf]/20 bg-gradient-to-b from-[#00becf]/5 to-transparent' : ''
                  }`}
                >
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-1" aria-label="Avaliação 5 estrelas">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#fc7600] text-[#fc7600]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-sm text-white">{t.client}</h3>
                      <span className="text-xs text-[#00becf]">{t.role}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Santa Maria - RS</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Social Proof Metric Banner */}
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center sm:text-left">
              <div>
                <h4 className="font-heading font-bold text-lg text-white">Mais de centenas de pets acolhidos com carinho</h4>
                <p className="text-xs text-slate-400">Traga seu melhor amigo para uma avaliação preventiva na Pet Family.</p>
              </div>
              <a
                href="https://wa.me/555532174672"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-black bg-[#00becf] hover:bg-[#1fe0f3] transition-all"
              >
                Agendar Atendimento
              </a>
            </div>

          </div>
        </section>



        {/* SEÇÃO "CONTATO E LOCALIZAÇÃO" & "HORÁRIOS" */}
        <section
          id="contato"
          className="py-20 lg:py-28 relative bg-[#050608] border-t border-white/10"
          aria-label="Fale Conosco e Visite-nos"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#fc7600]">
                <span>Atendimento & Endereço</span>
                <span aria-hidden="true">·</span>
                <span>Fácil Acesso</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
                Fale Conosco e Visite-nos
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Estamos prontos para atender você e seu pet. Venha nos visitar ou mande uma mensagem direta no WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Contact Info & Interactive Scheduler Helper */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact & Hours Card */}
                <div id="horarios" className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/15">
                  <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#00becf]" />
                    <span>Horários de Atendimento</span>
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-slate-300 font-medium">Segunda a Sexta</span>
                      <span className="text-white font-semibold font-mono text-xs sm:text-sm">09:00–12:00, 14:00–18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-slate-300 font-medium">Sábado</span>
                      <span className="text-white font-semibold font-mono text-xs sm:text-sm">09:00–12:00, 13:30–17:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-slate-400">
                      <span>Domingo e Feriados</span>
                      <span className="text-slate-400 text-xs">Plantão sob agendamento</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#fc7600] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Endereço</span>
                        <p className="text-sm text-white font-medium">
                          Av. Pres. Vargas, 498 - Patronato, Santa Maria - RS, 97020-000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#00becf] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">WhatsApp Oficial</span>
                        <a
                          href="https://wa.me/555532174672"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-[#00becf] hover:underline"
                        >
                          (55) 3217-4672
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp Interactive Scheduler */}
                <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/15">
                  <h3 className="font-heading font-bold text-lg text-white mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#fc7600]" />
                    <span>Pré-Agendamento Rápido</span>
                  </h3>
                  <p className="text-xs text-slate-300 mb-5">
                    Preencha os dados abaixo e envie diretamente para o WhatsApp da nossa recepção:
                  </p>

                  <form onSubmit={handleWhatsAppBooking} className="space-y-4">
                    <div>
                      <label htmlFor="pet-name" className="block text-xs font-semibold text-slate-300 mb-1">
                        Nome do seu Pet
                      </label>
                      <input
                        id="pet-name"
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Ex: Theo, Mel, Thor..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00becf]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="pet-type" className="block text-xs font-semibold text-slate-300 mb-1">
                          Espécie
                        </label>
                        <select
                          id="pet-type"
                          value={petType}
                          onChange={(e) => setPetType(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00becf]"
                        >
                          <option value="Cachorro">Cachorro</option>
                          <option value="Gato">Gato</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="pet-service" className="block text-xs font-semibold text-slate-300 mb-1">
                          Serviço
                        </label>
                        <select
                          id="pet-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00becf]"
                        >
                          <option value="Atendimento Veterinário">Consulta Veterinária</option>
                          <option value="Banho e Tosa">Banho e Tosa</option>
                          <option value="Pacotes de Banho">Pacotes de Banho</option>
                          <option value="Cirurgia / Exames">Cirurgias / Exames</option>
                          <option value="Hospedagem e Creche">Hospedagem / Creche</option>
                          <option value="Taxi Pet">Taxi Pet</option>
                          <option value="Outro Serviço">Outro Serviço</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferred-date" className="block text-xs font-semibold text-slate-300 mb-1">
                        Data ou Turno Preferido
                      </label>
                      <input
                        id="preferred-date"
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder="Ex: Amanhã pela manhã / Sábado à tarde"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00becf]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#00becf] to-[#12d2e4] text-black hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-black text-transparent" />
                      <span>Enviar Agendamento no WhatsApp</span>
                    </button>
                  </form>
                </div>

              </div>

              {/* Interactive Map Column */}
              <div id="localizacao" className="lg:col-span-7 space-y-4">
                <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/15">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#fc7600]" />
                      <span>Localização no Mapa Interativo</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Patronato - Santa Maria</span>
                  </div>

                  {/* Google Maps Embed iframe */}
                  <div className="aspect-[16/11] w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-xl">
                    <iframe
                      title="Localização da Clínica Veterinária Pet Family em Santa Maria - RS"
                      src="https://maps.google.com/maps?q=Av.+Pres.+Vargas,+498+-+Patronato,+Santa+Maria+-+RS,+97020-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="filter brightness-90 contrast-110"
                    />
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
                    <p>
                      📍 <strong>Endereço:</strong> Av. Pres. Vargas, 498 - Patronato, Santa Maria - RS
                    </p>
                    <a
                      href="https://maps.google.com/?q=Av.+Pres.+Vargas,+498+-+Patronato,+Santa+Maria+-+RS,+97020-000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#00becf] hover:underline font-semibold"
                    >
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#020203] border-t border-white/10 py-12 lg:py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-white/15 p-0.5">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://i.postimg.cc/TP6FmvWZ/438224100-349150321489222-6248131964965989282-n.jpg"
                    alt="Clínica Veterinária Pet Family - Logotipo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <span className="font-heading font-extrabold text-lg text-white block">Pet Family</span>
                  <span className="text-[11px] text-slate-400">Policlínica Veterinária</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                Compromisso com o amor, cuidado, saúde e dignidade animal. Consultas, cirurgias, banho e tosa, exames e hospedagem em Santa Maria - RS.
              </p>

              {/* Social Placeholders */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#00becf] transition-colors border border-white/10"
                  aria-label="Acessar Instagram da Pet Family"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#00becf] transition-colors border border-white/10"
                  aria-label="Acessar Facebook da Pet Family"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/555532174672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#fc7600] transition-colors border border-white/10"
                  aria-label="Conversar no WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-heading font-semibold text-sm text-white uppercase tracking-wider block">
                Navegação
              </span>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#00becf] transition-colors">Home</a></li>
                <li><a href="#sobre-nos" className="hover:text-[#00becf] transition-colors">Sobre Nós</a></li>
                <li><a href="#servicos" className="hover:text-[#00becf] transition-colors">Serviços</a></li>
                <li><a href="#depoimentos" className="hover:text-[#00becf] transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            {/* Col 3: Practical Info */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-heading font-semibold text-sm text-white uppercase tracking-wider block">
                Atendimento & Local
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="#horarios" className="hover:text-[#00becf] transition-colors">Horários de Atendimento</a></li>
                <li><a href="#localizacao" className="hover:text-[#00becf] transition-colors">Localização no Mapa</a></li>
                <li><a href="#contato" className="hover:text-[#00becf] transition-colors">Fale Conosco</a></li>
                <li className="pt-2 text-slate-400">
                  Av. Pres. Vargas, 498 - Patronato, Santa Maria - RS
                </li>
                <li>
                  <a href="https://wa.me/555532174672" className="text-[#00becf] font-semibold hover:underline">
                    WhatsApp: (55) 3217-4672
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              Copyright © 2026 Clínica Veterinária Pet Family. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span>Santa Maria - RS</span>
              <span aria-hidden="true">·</span>
              <a href="#home" className="hover:text-white transition-colors">Voltar ao topo ↑</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Action Button (Fixed Bottom-Right) */}
      <aside aria-label="Ação Rápida WhatsApp">
        <a
          href="https://wa.me/555532174672"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#00becf] hover:bg-[#1de1f4] active:scale-95 text-black font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(0,190,207,0.5)] transition-all group"
          aria-label="Abrir conversa no WhatsApp da Pet Family"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <MessageCircle className="w-4 h-4 fill-black text-transparent" />
          <span className="hidden sm:inline">Agendar no WhatsApp</span>
        </a>
      </aside>

    </div>
  );
}
