import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import Error from "@/components/Error";

export const metadata = {
  title: "404 - Page Not Found",
  robots: "noindex,nofollow",
};

export default function NotFound() {
  return (
    <>
      <Error />
      <AnimationLoaded />
    </>
  );
}