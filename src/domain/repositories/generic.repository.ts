export interface GenericRepository<T> {
  save(instance: T): Promise<void>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[] | []>
}
