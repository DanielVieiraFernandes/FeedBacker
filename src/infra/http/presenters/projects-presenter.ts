import { ProjectDetails } from '@/domain/feedback/enterprise/value-objects/project-details';

interface AttachmentPresenter {
  id: string;
  title: string;
  url: string;
}

export interface ProjectPresenterProps {
  projectId: string;
  authorId: string;
  author: string;
  title: string;
  description: string;
  repositoryLink: string;
  attachments: AttachmentPresenter[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class ProjectsPresenter {
  static toHttp(project: ProjectDetails): ProjectPresenterProps {
    return {
      projectId: project.projectId.toString(),
      authorId: project.authorId.toString(),
      author: project.author,
      title: project.title,
      description: project.description,
      repositoryLink: project.repositoryLink,
      attachments: project.attachments.map(attachment => ({
        id: attachment.id.toString(),
        title: attachment.title,
        url: attachment.url,
      })),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
