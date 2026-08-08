import LandingNavbar from "../Components/landing/LandingNavbar";
import Hero from "../Components/landing/Hero";
import Features from "../Components/landing/Features";
import AboutSection from "../Components/Landing/About";
import LandingFooter from "../Components/landing/LandingFooter";


const Landing = () => {
    return (
        <>
            <LandingNavbar />
            <Hero />
            <Features />
            <AboutSection />
            <LandingFooter />
        </>
    );
};

export default Landing;