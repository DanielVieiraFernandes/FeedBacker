import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected _props: Props;

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this._props = props;
    this._id = id ?? new UniqueEntityID(id);
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
