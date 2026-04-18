import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Transformations from "@/components/sections/Transformations";
import WhyDietsFail from "@/components/sections/WhyDietsFail";
import WhoCanApply from "@/components/sections/WhoCanApply";
import ProgramInclusions from "@/components/sections/ProgramInclusions";
import ClientDiaries from "@/components/sections/ClientDiaries";
import OnlineClasses from "@/components/sections/OnlineClasses";
import MeetCoach from "@/components/sections/MeetCoach";
import Testimonials from "@/components/sections/Testimonials";
import ApplicationForm from "@/components/sections/ApplicationForm";
import ResetProgram from "@/components/sections/ResetProgram";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Transformations />
        <WhyDietsFail />
        <WhoCanApply />
        <ProgramInclusions />
        <ClientDiaries />
        <OnlineClasses />
        <MeetCoach />
        <ApplicationForm />
        <Testimonials />
        <ResetProgram />
      </main>
      <Footer />
    </>
  );
}
