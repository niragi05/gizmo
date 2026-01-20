import { useFile } from "@/features/projects/hooks/use-files";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { FileBreadcrumbs } from "./file-breadcrumbs";
import { TopNavigation } from "./top-navigation";
import Image from "next/image";
import { CodeEditor } from "./code-editor";

interface EditorViewProps {
    projectId: Id<"projects">;
}

export const EditorView = ({
    projectId,
}: EditorViewProps) => {
    const { activeTabId } = useEditor(projectId);
    const activeFile = useFile(activeTabId);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center">
                <TopNavigation projectId={projectId} />
            </div>
            {activeTabId && <FileBreadcrumbs projectId={projectId} />}
            <div className="flex-1 min-h-0 bg-background">
                {!activeFile && (
                    <div className="size-full flex items-center justify-center">
                        <Image 
                            src="/logo.svg"
                            alt="Gizmo"
                            width={50}
                            height={50}
                            className="opacity-25"
                        />
                    </div>
                )}
                {activeFile && (
                    <CodeEditor filename={activeFile.name} />
                )}
            </div>
        </div>
    )
}