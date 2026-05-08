import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

const Location: React.FC = () => {
  const { settings } = useData();
  const defaultAddress = "R. Alagoas, 10 - Jardim Helena, São Paulo - SP, 08090-555";
  const address = settings?.address || defaultAddress;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-dark relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
              VENHA NOS <span className="text-brand-primary">VISITAR</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Localização</h4>
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary text-sm font-bold flex items-center gap-1 mt-2 hover:underline"
                  >
                    ABRIR NO GOOGLE MAPS <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Horário de Funcionamento</h4>
                  <p className="text-white/60 whitespace-pre-line">
                    {settings?.opening_hours || `Segunda a Sábado: 09h às 22h\nDomingo e Feriados: 09h às 18h`}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Contato</h4>
                  <p className="text-white/60">
                    WhatsApp: {settings?.whatsapp || '(11) 00000-0000'}<br />
                    Instagram: @{settings?.instagram || 'tabacariaelchapola'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
          >
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Tabacaria El Chapola"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[12px] border-brand-dark/20 rounded-[32px]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
