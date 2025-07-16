//@ts-ignore
export function SidebarItems({ icon, text }) {
  return (
    <div className="flex justify-center items-center gap-2 pb-4 text-base hover:cursor-pointer hover:bg-slate-400 hover:text-white transition-all duration-300">
      <span className="flex items-center gap-2 translate-y-2">
        {icon}
        {text}
      </span>
    </div>
  );
}
