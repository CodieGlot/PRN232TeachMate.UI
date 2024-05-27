import { Header, Footer } from "../../layouts";
// import Dropdown from "../../layouts/Header/ui/dropdown";
import {
  Category,
  FAQs,
  HeroSection,
  Partner,
  Story,
} from "./ui";
// const options = ['Option 1', 'Option 2', 'Option 3'];
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import CTA from "./ui/CTA";
import { ChatBot } from "../ChatBot";


export function Home() {
  const [run, setRun] = useState(false);

  const handleClickStart = () => {
    setRun(true);
  };

  const steps = [
    {
      target: ".header",
      content: "Welcome!! Please spare a minute to learn about our page",
      disableBeacon: true,
    },
    {
      target: ".search",
      content: "Search your favorite class or tutor here",
    },
    {
      target: ".teaching",
      content: "Create new class and start teaching",
    },
    {
      target: ".learning",
      content: "Enroll class and start your learning",
    },
    {
      target: ".forum",
      content: "Join our community of knowledge and discuss now",
    },

    {
      target: ".news",
      content: "Subscribe to our newsletter here",
    },
    {
      target: ".chat",
      content: "Chat with tutor or learner to get the best schedule",
    },
    {
      target: ".more-info",
      content: "For more info about us, click here!",
    },
    {
      target: ".chat-gpt",
      content: "If you have any question you cannot solve, try asking AI assistance",
    },
    {
      target: ".login",
      content: "You can log in here, or sign up if you're new, begin your journey with us now",
    },
  ];
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>

      <Joyride
        disableScrolling={true}
        run={run}
        steps={steps}
        continuous={true}
        styles={{
          options: {
            arrowColor: "#818cf8",
            primaryColor: "#38bdf8",
            textColor: "#000",
          },
        }}
        //  showProgress={true}
        showSkipButton={true}
      />


      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <Header />
        <HeroSection />
        <CTA onStartTour={handleClickStart} />
        <Category />
        <Story />
        <Partner />
        <FAQs />
        <ChatBot />
        <Footer />
      </div>
    </>
  );
}