import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import Link from "next/link";
import { AlertCircleIcon, ArrowRightIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Doc } from "../../../../convex/_generated/dataModel";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface ProjectsListProps {
    onViewAll: () => void;
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

const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">
                Continue Working On
            </span>
            <Button variant="outline" asChild className="h-auto items-start justify-start p-4 bg-background border flex flex-col gap-2 rounded-none">
                <Link href={`/projects/${data._id}`} className="group">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            {getProjectIcon(data)}
                            <span className="truncate">{data.name}</span>
                        </div>
                        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {formatTimestamp(data.updatedAt)}
                    </span>
                </Link>
            </Button>
        </div>
    )
}

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
    return (
        <Link href={`/projects/${data._id}`} className="text-sm text-foreground/60 hover:text-foreground py-1 flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
                {getProjectIcon(data)}
                <span className="truncate">{data.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
                {formatTimestamp(data.updatedAt)}
            </span>
        </Link>
    )
}

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
    const projects = useProjectsPartial(6);

    if (projects === undefined) {
        return <Spinner className="size-4 animate-spin" />
    }

    const [mostRecent, ...rest] = projects;

    return (
        <div className="flex flex-col gap-4">
            {mostRecent ? <ContinueCard data={mostRecent} /> : null}
            {rest.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                            Recent Projects
                        </span>
                        <button className="flex items-center gap-2 text-muted-foreground text-xs transition-colors" onClick={onViewAll}>
                            <span>View All</span>
                            <Kbd className="bg-accent border">⌘K</Kbd>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {rest.map((project) => (
                            <ProjectItem 
                                key={project._id}
                                data={project}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}