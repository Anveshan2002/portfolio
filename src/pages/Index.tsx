import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import SelectedWorks from "../components/SelectedWorks";
import Journal from "../components/Journal";
import Explorations from "../components/Explorations";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Footer />
      </motion.main>
    </>
  );
}
