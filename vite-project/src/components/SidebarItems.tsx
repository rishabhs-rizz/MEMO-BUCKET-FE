
//@ts-ignore
export function SidebarItems ({icon, text}){

    return <div className="flex pl-6 gap-3 text-base m-2 pt-4 hover:cursor-pointer hover:bg-slate-400 hover:p-2">
        <div>
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}