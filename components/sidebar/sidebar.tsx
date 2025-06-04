const Sidebar = () => {


    return (
        <aside className={`flex w-20 min-w-[5rem] transition-all duration-300 ease-in-out overflow-hidden`}>
            <div className="h-full border-r-2 flex flex-col border-gray-200 bg-white w-full">
                <div className="flex flex-col items-center gap-4 justify-between h-full mb-4">
                    {/* <SidebarRoutes isExpanded={isExpanded} /> */}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;