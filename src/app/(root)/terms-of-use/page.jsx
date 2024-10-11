import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import TermsOfUse from '@/components/terms-of-use';

export default async function Page() {
    return (
        <>
            <TermsOfUse />
            <AnimationLoaded />
        </>
    )
}