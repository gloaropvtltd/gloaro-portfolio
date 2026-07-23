import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_10px_30px_-10px_rgba(26,44,122,0.35)] ring-1 ring-navy-700/10">
        <Image
          src="/brand/logo-mark.png"
          alt="Loading"
          width={48}
          height={48}
          className="animate-spin object-contain [animation-duration:1.8s]"
          priority
        />
      </div>
    </div>
  );
}
