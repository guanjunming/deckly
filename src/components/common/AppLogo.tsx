import Image from "next/image";

const AppLogo = ({ size }: { size: number }) => {
  return <Image src="/logo.svg" alt="Deckly logo" width={size} height={size} />;
};

export default AppLogo;
