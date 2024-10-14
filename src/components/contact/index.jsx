import ContactIntro from './ContactIntro';
import ContactFooter from './ContactFooter';
import { getContactUsContent } from '@/services/contact';
import { getContactData, getSocialLinks } from '@/services/footer';

export default async function Contact() {
    try {
        const [data, contactData, socialLinks] = await Promise.all([
            getContactUsContent(),
            getContactData(),
            getSocialLinks(),
        ]);
    
        return (
            <>
                <ContactIntro data={data} />
                <ContactFooter data={data} contactData={contactData} socialLinks={socialLinks} />
            </>
        )
    } catch (error) {
        logError("Error fetching Contact page data:", error);
    }
}