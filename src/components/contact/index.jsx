import ContactIntro from './ContactIntro';
import ContactFooter from './ContactFooter';
import { getContactUsContent } from '@/services/contact';
import { getContactData, getSocialLinks } from '@/services/footer';

export default async function Contact() {
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
}