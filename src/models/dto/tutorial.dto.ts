/**
 * Objeto de transferencia de datos para los tutoriales de
 *
 * @author llira
 * @version 1.0
 */
export class TutorialDTO {
  readonly title: string = '';
  readonly description: string = '';
  readonly isPublished: boolean = false;
  readonly comments: CommentDTO[] = [];
}

class CommentDTO {
  readonly title: string = '';
  readonly likes: number = 0;
  readonly dislikes: number = 0;
}
