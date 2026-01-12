import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";

interface ProjectsCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (project: Doc<"projects">) => {
    switch (project.importStatus) {
        case "completed":
            return <FaGithub className="size-3.5 text-muted-foreground" />
        case "failed":
            return <AlertCircleIcon className="size-3.5 text-muted-foreground" />
        case "importing":
            return <Loader2Icon className="size-3.5 text-muted-foreground animate-spin" />
        default:
            return <GlobeIcon className="size-3.5 text-muted-foreground" />
    }
}

export const ProjectsCommandDialog = ({ open, onOpenChange }: ProjectsCommandDialogProps) => {
    const router = useRouter();
    const projects = useProjects();

    const handleSelect = (projectId: string) => {
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
    }

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Search Projects"
            description="Search and navigate to your projects"
        >
            <CommandInput placeholder="Search projects..." />
            <CommandList>
                <CommandEmpty>No projects found</CommandEmpty>
                <CommandGroup heading="Projects">
                    {projects?.map((project) => (
                        <CommandItem
                            key={project._id}
                            value={`${project.name}-${project._id}`}
                            onSelect={() => handleSelect(project._id)}
                        >
                            {getProjectIcon(project)}
                            <span>{project.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}