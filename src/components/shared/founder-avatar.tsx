import { branding } from "@/config/branding";

type FounderAvatarProps = {
  sizeClass?: string;
};

export function FounderAvatar({
  sizeClass = "w-16 h-16 sm:w-20 sm:h-20",
}: FounderAvatarProps) {
  return (
    <div className={"relative shrink-0 " + sizeClass}>
      <div className="w-full h-full rounded-full border border-primary/20 overflow-hidden bg-primary/5">
        <img
          src={branding.founderImage}
          alt={branding.founderName}
          className="w-full h-full object-cover scale-110"
        />
      </div>
      <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0A0A0A]" />
      </span>
    </div>
  );
}
