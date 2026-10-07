"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { homeFaqs } from "@/content/faq";
import { Highlight } from "@/components/ui/Highlight";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-background border-b border-border py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-foreground leading-[1.15] text-balance"
          >
            Common questions, <Highlight>answered</Highlight>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed text-balance">
            Answers about Lockout, privacy, and native Android blocking.
          </p>
        </div>

        {/* Unified Divider Accordion List */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="divide-y divide-border border-y border-border">
            {homeFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleIndex(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm cursor-pointer"
                  >
                    <span
                      className={`text-[17px] sm:text-lg font-medium transition-colors pr-4 sm:pr-8 text-balance ${isOpen ? "text-primary" : "text-foreground group-hover:text-muted-foreground"
                        }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground group-hover:text-foreground group-hover:bg-secondary"
                        }`}
                    >
                      <Plus
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-45" : ""
                          }`}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="text-muted-foreground text-lg leading-relaxed pr-6 sm:pr-12">
                      <p>{faq.answer}</p>
                      {faq.link && (
                        <div className="mt-3">
                          <Link
                            href={faq.link.href}
                            target={faq.link.isExternal ? "_blank" : undefined}
                            rel={faq.link.isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:opacity-90 transition-opacity group/link"
                          >
                            <span>{faq.link.text}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
