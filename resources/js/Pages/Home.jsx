import { HeroBanner } from "@/Components/Sections/HeroBanner";
import { BusinessLegacy } from "@/Components/Sections/BusinessLegacy";
import { Timeline } from "@/Components/Sections/Timeline";
import { UnicasaAbout } from "@/Components/Sections/UnicasaAbout";
import { StoresImages } from "@/Components/Sections/StoresImages";
import { FaqDoubts } from "@/Components/Sections/FaqDoubts";
import { StoreForm } from "@/Components/Sections/StoreForm";
import { Testimonials } from "@/Components/Sections/Testimonials";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useSectionTracking } from "@/Hooks/useSectionTracking";

const Page = () => {
    useSectionTracking();

    return (
        <DefaultLayout>
            <HeroBanner />
            <Timeline />
            <BusinessLegacy />
            <Testimonials/>
            <StoresImages />
            <UnicasaAbout />
            <StoreForm />
            <FaqDoubts />
        </DefaultLayout>
    );
};

export default Page;
