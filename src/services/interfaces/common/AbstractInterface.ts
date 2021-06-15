export interface AbstractInterface<T> {
  getAll(query?: {}): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(model: T): Promise<T>;
  update(updatedModel: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
