export class InvalidAttachmentTypeError extends Error {
  constructor(fileType: string) {
    super(`file type "${fileType}" is not valid`);
  }
}
