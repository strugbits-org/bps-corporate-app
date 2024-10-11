import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import PrivacyPolicy from '@/components/privacy-policy';

export default async function Page() {
    return (
        <>
            <PrivacyPolicy />
            <AnimationLoaded />
        </>
    )
}