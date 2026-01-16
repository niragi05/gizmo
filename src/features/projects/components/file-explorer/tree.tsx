import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";

import { cn } from "@/lib/utils";

import { useCreateFile, useCreateFolder, useFolderContents, useRenameFile, useDeleteFile } from "@/features/projects/hooks/use-files";
import { LoadingRow } from "./loading-row";
import { getItemPadding } from "@/app/utils";
import { CreateInput } from "./create-input";

import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";

interface TreeProps { 
    item: Doc<"files">;
    level?: number;
    projectId: Id<"projects">;
}

export const Tree = ({
    item, 
    level = 0,
    projectId,
}: TreeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [creating, setCreating] = useState<"file" | "folder" | null>(null);

    const renameFile = useRenameFile();
    const deleteFile = useDeleteFile();
    const createFile = useCreateFile();
    const createFolder = useCreateFolder();

    const folderContens = useFolderContents({
        projectId,
        parentId: item._id,
        enabled: item.type === "folder" && isOpen,
    })

    if (item.type === "file") {
        return (
            <div>
                I am a file!
            </div>
        )
    }

    return (
        <div>
            I am a folder!
        </div>
    )
}