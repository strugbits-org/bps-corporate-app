"use client"
import { closeModals, pageLoadEnd, pageLoadStart } from '@/utils/utilityFunctions';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";

const DelayedLink = ({ to, children, className, target, attributes }) => {
  const router = useRouter();
  const pathname = usePathname();

  const delayedRedirect = (e) => {
    e.preventDefault();
    closeModals();
    if (to === undefined) return;

    if (pathname === to) {
      pageLoadStart();
      setTimeout(() => {
        pageLoadEnd();
      }, 900);
      return;
    }

    if (target === undefined) {
      pageLoadStart();
      setTimeout(() => {
        router.push(to)
      }, 600);
    } else {
      window.open(to, target);
    }
  };

  return (
    <Link href={to || ""} target={target} className={className} onClick={delayedRedirect} {...attributes}>
      {children}
    </Link>
  );
};

export default DelayedLink;