import LandingNavbar from "../Components/Landing/LandingNavbar";
import Hero from "../Components/Landing/Hero";
import Features from "../Components/Landing/Features";
import AboutSection from "../Components/Landing/About";
import LandingFooter from "../Components/Landing/LandingFooter";


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