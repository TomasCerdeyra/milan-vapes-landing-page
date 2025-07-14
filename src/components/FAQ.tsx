
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const FAQ = () => {
  const { faqs } = useData();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-black/70 to-black/90 mushroom-pattern">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl md:text-6xl tracking-wider font-perandory text-milan-lightGray mb-6">
            PREGUNTAS FRECUENTES
          </h2>
          <div className="w-24 h-1 bg-milan-whatsapp mx-auto"></div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-milan-whatsapp rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-milan-whatsapp/90 transition-colors duration-200"
                >
                  <span className="text-milan-beige font-semibold text-lg">
                    {faq.question}
                  </span>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-milan-beige" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-milan-beige" />
                  )}
                </button>
                
                {expandedIndex === index && (
                  <div className="px-6 py-4 bg-milan-lightGray">
                    <p className="text-milan-darkGray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
