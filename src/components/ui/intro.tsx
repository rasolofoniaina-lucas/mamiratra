import Image from "next/image";

export function Intro() {
  return (
    <>
      <div className="intro" aria-hidden="true">
        <div className="intro-content">
          <Image src="/brand/mamiratra-icon.svg" alt="" width={72} height={72} unoptimized loading="eager" className="intro-symbol" />
          <span className="intro-wordmark-crop"><Image src="/brand/mamiratra-wordmark.svg" alt="" width={260} height={55} unoptimized loading="eager" className="intro-wordmark" /></span>
        </div>
      </div>
    </>
  );
}
