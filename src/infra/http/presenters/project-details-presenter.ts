import { ProjectDetails } from '@/domain/feedback/enterprise/value-objects/project-details';
import { ProjectAttachmentPresenter } from './project-attachment-presenter';

export class ProjectDetailsPresenter {
  static toHttp(projectDetails: ProjectDetails) {
    return {
      projectId: projectDetails.projectId.toString(),
      authorName: projectDetails.author,
      title: projectDetails.title,
      description: projectDetails.description,
      repositoryLink: projectDetails.repositoryLink,
      attachments: projectDetails.attachments.map(attachment => {
        return ProjectAttachmentPresenter.toHttp(attachment);
      }),
      createdAt: projectDetails.createdAt,
      updatedAt: projectDetails.updatedAt,
    };
  }
}
