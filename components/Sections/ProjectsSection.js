// Absolute imports
import { Plus } from "iconoir-react";

// Component imports
import ProjectCard from "@/components/ProjectCard";

const ProjectSection = ({ projects, slug, theme }) => {
  return (
    <>
      {/* Empty container */}
      {projects?.length < 1 && (
        <div className="flex flex-col items-center justify-center w-full mt-5 space-y-5 bg-gray-900 rounded-lg bg-opacity-5 border-3 h-80">
          <span className="text-sm font-light text-gray-600 font-inter">
            {`The user hasn't uploaded any projects yet...`}
          </span>
        </div>
      )}
      {/* When there is data return the below */}
      {projects?.length > 0 && (
        <div className="grid w-full grid-cols-1 mt-5 lg:grid-cols-2 gap-x-5 gap-y-10">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              theme={theme}
              projectId={project._id}
              images={project.images}
              contentType={project.contentType}
              title={project.title}
              client={project.client}
              industry={project.industry}
              page={project.page}
              slug={slug}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectSection;
