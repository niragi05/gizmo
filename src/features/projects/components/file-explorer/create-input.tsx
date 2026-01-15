import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { useState } from "react";
import { toast } from "sonner";

interface CreateInputProps {
    type: "file" | "folder";
    level: number;
    onSubmit: (name: string) => void;
    onCancel: () => void;
}

export const CreateInput = ({ type, level, onSubmit, onCancel }: CreateInputProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            onSubmit(trimmedValue);
        } else {
            onCancel();
            toast.error("Name is required");
        }
    }
    
    return (
        <div className="w-full flex items-center gap-1 h-5.5 bg-accent/30">
            <div className="flex items-center gap-0.5">
                {type === "folder" && (
                    <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                )}
                {type === "file" && (
                    <FileIcon className="size-4" fileName={value} autoAssign />
                )}
                {type === "folder" && (
                    <FolderIcon className="size-4" folderName={value} />
                )}
            </div>
        </div>
    )
} 