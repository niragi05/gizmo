import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuItem, ContextMenuContent, ContextMenuTrigger, ContextMenuShortcut, ContextMenuSeparator } from "@/components/ui/context-menu";

import { getItemPadding } from "@/app/utils";
import { Doc } from "../../../../../convex/_generated/dataModel";

interface TreeItemWrapperProps {
    item: Doc<"files">;
    children: React.ReactNode;
    level: number;
    isActive?: boolean;
    onClick?: () => void;
    onDoubleClick?: () => void;
    onRename?: () => void;
    onDelete?: () => void;
    onCreateFile?: () => void;
    onCreateFolder?: () => void;
}

export const TreeItemWrapper = ({
    item,
    children,
    level,
    isActive,
    onClick,
    onDoubleClick,
    onRename,
    onDelete,
    onCreateFile,
    onCreateFolder,
}: TreeItemWrapperProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onRename?.();
        }
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <button
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "group flex items-center gap-1 w-full h-5.5 hover:bg-accent/30 outline-none focus:ring-1 focus:ring-inset focus:ring-ring",
                        isActive && "bg-accent/30",
                    )}
                    style={{ paddingLeft: getItemPadding(level, item.type === "file") }}
                >
                    {children}
                </button>
            </ContextMenuTrigger>
            <ContextMenuContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="w-48"
            >
                {item.type === "folder" && (
                    <>
                        <ContextMenuItem
                            onClick={onCreateFile}
                            className="text-xs"
                        >
                            New File...
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={onCreateFolder}
                            className="text-xs"
                        >
                            New Folder...
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                    </>
                )}
                <ContextMenuItem
                    onClick={onRename}
                    className="text-xs"
                >
                    Rename...
                    <ContextMenuShortcut>Enter</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem
                    onClick={onDelete}
                    className="text-xs"
                >
                    Delete...
                    <ContextMenuShortcut>⌘Backspace</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}