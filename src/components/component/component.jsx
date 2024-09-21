'use client'

import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IntlProvider, FormattedMessage, useIntl } from 'react-intl'

const messages = {
  en: {
    features: "Features",
    about: "About",
    contact: "Contact",
    language: "Language",
    heroTitle: "Identify Crop Diseases with Ease",
    heroDescription: "Our cutting-edge crop disease classifier app helps farmers and agronomists quickly identify and address crop diseases, ensuring healthy, thriving crops.",
    tryApp: "Try the App",
    keyFeatures: "Key Features",
    powerfulTools: "Powerful Tools for Crop Health",
    featuresDescription: "Our crop disease classifier app provides farmers and agronomists with advanced tools to quickly identify and address crop diseases, helping to ensure healthy, thriving crops.",
    accurateIdentification: "Accurate Disease Identification",
    accurateDescription: "Our advanced AI-powered algorithm can accurately identify a wide range of crop diseases, helping you address issues quickly.",
    customizedRecommendations: "Customized Recommendations",
    customizedDescription: "Get tailored recommendations on the best treatment options for your specific crop and disease, based on your location and growing conditions.",
    realTimeMonitoring: "Real-time Monitoring and Alerts",
    realTimeDescription: "Stay on top of your crop health with real-time monitoring and alerts, so you can address issues before they become major problems.",
    aboutTitle: "About Our Crop Disease Classifier",
    aboutDescription: "Our crop disease classifier app is powered by advanced machine learning algorithms that can accurately identify a wide range of crop diseases. We're committed to helping farmers and agronomists maintain healthy, thriving crops.",
    getInTouch: "Get in Touch",
    contactDescription: "Have questions or feedback about our crop disease classifier app? Get in touch with our team.",
    enterEmail: "Enter your email",
    contactUs: "Contact Us",
    contactFooter: "We'll get back to you as soon as possible.",
    copyright: "© 2024 Crop Disease Classifier. All rights reserved.",
    termsOfService: "Terms of Service",
    privacy: "Privacy"
  },
  hi: {
    features: "विशेषताएँ",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    language: "भाषा",
    heroTitle: "फसल रोगों की आसानी से पहचान करें",
    heroDescription: "हमारा अत्याधुनिक फसल रोग वर्गीकरण ऐप किसानों और कृषि वैज्ञानिकों को फसल रोगों की त्वरित पहचान और समाधान में मदद करता है, जिससे स्वस्थ और फलती-फूलती फसलें सुनिश्चित होती हैं।",
    tryApp: "ऐप आज़माएं",
    keyFeatures: "प्रमुख विशेषताएँ",
    powerfulTools: "फसल स्वास्थ्य के लिए शक्तिशाली उपकरण",
    featuresDescription: "हमारा फसल रोग वर्गीकरण ऐप किसानों और कृषि वैज्ञानिकों को फसल रोगों की त्वरित पहचान और समाधान के लिए उन्नत उपकरण प्रदान करता है, जो स्वस्थ और फलती-फूलती फसलों को सुनिश्चित करने में मदद करता है।",
    accurateIdentification: "सटीक रोग पहचान",
    accurateDescription: "हमारा उन्नत AI-संचालित एल्गोरिथम विभिन्न प्रकार के फसल रोगों की सटीक पहचान कर सकता है, जिससे आप मुद्दों का त्वरित समाधान कर सकते हैं।",
    customizedRecommendations: "अनुकूलित सिफारिशें",
    customizedDescription: "अपने स्थान और उगाने की परिस्थितियों के आधार पर अपनी विशिष्ट फसल और रोग के लिए सर्वोत्तम उपचार विकल्पों पर अनुकूलित सिफारिशें प्राप्त करें।",
    realTimeMonitoring: "रीयल-टाइम निगरानी और अलर्ट",
    realTimeDescription: "रीयल-टाइम निगरानी और अलर्ट के साथ अपनी फसल के स्वास्थ्य पर नज़र रखें, ताकि आप समस्याओं को बड़ी समस्या बनने से पहले ही हल कर सकें।",
    aboutTitle: "हमारे फसल रोग वर्गीकरण के बारे में",
    aboutDescription: "हमारा फसल रोग वर्गीकरण ऐप उन्नत मशीन लर्निंग एल्गोरिदम द्वारा संचालित है जो विभिन्न प्रकार के फसल रोगों की सटीक पहचान कर सकता है। हम किसानों और कृषि वैज्ञानिकों को स्वस्थ और फलती-फूलती फसलें बनाए रखने में मदद करने के लिए प्रतिबद्ध हैं।",
    getInTouch: "संपर्क में रहें",
    contactDescription: "हमारे फसल रोग वर्गीकरण ऐप के बारे में कोई प्रश्न या प्रतिक्रिया है? हमारी टीम से संपर्क करें।",
    enterEmail: "अपना ईमेल दर्ज करें",
    contactUs: "हमसे संपर्क करें",
    contactFooter: "हम जल्द से जल्द आपसे संपर्क करेंगे।",
    copyright: "© 2024 फसल रोग वर्गीकरण। सर्वाधिकार सुरक्षित।",
    termsOfService: "सेवा की शर्तें",
    privacy: "गोपनीयता"
  }
}

const LanguageSelector = ({ setLocale }) => {
  const intl = useIntl()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-emerald-50 hover:text-white transition-colors">
        <GlobeIcon className="h-4 w-4" />
        <span>{intl.formatMessage({ id: 'language' })}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('hi')}>हिन्दी (Hindi)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Header = ({ setLocale }) => (
  <header className="px-4 lg:px-6 h-16 flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white sticky top-0 z-50">
    <Link href="/" className="flex items-center justify-center">
      <LeafIcon className="h-8 w-8 mr-2" />
      <span className="font-bold text-lg">Crop Disease Classifier</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link href="#features" className="text-sm font-medium hover:text-emerald-200 transition-colors">
        <FormattedMessage id="features" />
      </Link>
      <Link href="#about" className="text-sm font-medium hover:text-emerald-200 transition-colors">
        <FormattedMessage id="about" />
      </Link>
      <Link href="#contact" className="text-sm font-medium hover:text-emerald-200 transition-colors">
        <FormattedMessage id="contact" />
      </Link>
      <LanguageSelector setLocale={setLocale} />
    </nav>
  </header>
)

const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white">
    <div className="container px-4 md:px-6 mx-auto">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <motion.div 
          className="flex flex-col justify-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-emerald-700">
            <FormattedMessage id="heroTitle" />
          </h1>
          <p className="max-w-[600px] text-emerald-800 md:text-xl dark:text-emerald-200">
            <FormattedMessage id="heroDescription" />
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="/prediction"
              className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700"
            >
              <FormattedMessage id="tryApp" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/Farmer1.png"
            alt="Crop Disease Classifier"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  </section>
)

const FeatureCard = ({ title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-bold text-emerald-700 mb-2">{title}</h3>
    <p className="text-emerald-600">{description}</p>
  </motion.div>
)

const FeaturesSection = () => (
  <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
    <div className="container px-4 md:px-6 mx-auto">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-700">
            <FormattedMessage id="powerfulTools" />
          </h2>
          <p className="max-w-[900px] text-emerald-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <FormattedMessage id="featuresDescription" />
          </p>
        </div>
      </motion.div>
      <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard 
          title={<FormattedMessage id="accurateIdentification" />}
          description={<FormattedMessage id="accurateDescription" />}
        />
        <FeatureCard 
          title={<FormattedMessage id="customizedRecommendations" />}
          description={<FormattedMessage id="customizedDescription" />}
        />
        <FeatureCard 
          title={<FormattedMessage id="realTimeMonitoring" />}
          description={<FormattedMessage id="realTimeDescription" />}
        />
      </div>
    </div>
  </section>
)

const AboutSection = () => (
  <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
    <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10 mx-auto">
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emerald-700">
          <FormattedMessage id="aboutTitle" />
        </h2>
        <p className="max-w-[600px] text-emerald-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          <FormattedMessage id="aboutDescription" />
        </p>
      </motion.div>
      <motion.div 
        className="flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src="/image.png"
          alt="About Crop Disease Classifier"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  </section>
)

const ContactSection = () => {
  const intl = useIntl()
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 mx-auto">
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emerald-700">
            <FormattedMessage id="getInTouch" />
          </h2>
          <p className="mx-auto max-w-[600px] text-emerald-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <FormattedMessage id="contactDescription" />
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto w-full max-w-sm space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form className="flex flex-col gap-2">
            <Input type="email" placeholder={intl.formatMessage({ id: 'enterEmail' })} className="w-full" />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <FormattedMessage id="contactUs" />
            </Button>
          </form>
          <p className="text-xs text-emerald-600">
            <FormattedMessage id="contactFooter" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-emerald-800 text-white">
    <p className="text-xs">
      <FormattedMessage id="copyright" />
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link href="/terms" className="text-xs hover:underline underline-offset-4">
        <FormattedMessage id="termsOfService" />
      </Link>
      <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
        <FormattedMessage id="privacy" />
      </Link>
    </nav>
  </footer>
)

export default function Home() {
  const [locale, setLocale] = useState('en')

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      <div className="flex flex-col min-h-screen bg-white">
        <Header setLocale={setLocale} />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </IntlProvider>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}