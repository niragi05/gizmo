"use client";

import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";


const X = () => {
  const createProject = useMutation(api.projects.create)
  const projects = useQuery(api.projects.get)

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button onClick={() => createProject({ name: "Test Project" })}>
        Create Project
      </Button>
      {projects?.map((project) => (
        <div key={project._id}>
          {project.name}
          {project.ownerId}
        </div>
      ))}
    </div>
  )
};

export default X;