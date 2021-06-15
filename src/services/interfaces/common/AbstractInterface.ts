export interface AbstractInterface<T> {
  getAll(): Promise<T[]>;
  getPaginated(query?: {}): Promise<any>;
  getById(id: string): Promise<T>;
  getByQuery(query: {}): Promise<T[]>;
  create(model: T): Promise<T>;
  update(updatedModel: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
