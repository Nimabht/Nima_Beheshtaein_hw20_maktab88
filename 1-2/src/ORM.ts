export class ORM<T extends {}> {
  private readonly storageService: LocalStorageService;
  constructor(storageKey: string) {
    this.storageService = new LocalStorageService(storageKey);
  }

  async create(item: T): Promise<T> {
    const items = this.storageService.getItems();
    const newId = String(Math.random() * 10 ** 17);
    const newItem = { ...item, id: newId };
    items.push(newItem);
    this.storageService.setItems(items);
    return newItem;
  }

  async findById(id: string): Promise<T | undefined> {
    const items = this.storageService.getItems();
    const index = items.findIndex((i) => i.id == id);
    if (index < 0) {
      throw new Error(`Item with ID ${id} not found`);
    }
    return items[index];
  }

  async findAll(): Promise<T[]> {
    return this.storageService.getItems();
  }

  async update(item: { id: string } & T): Promise<T> {
    const items = this.storageService.getItems();
    const index = items.findIndex((i) => i.id == item.id);
    if (index < 0) {
      throw new Error(`Item with ID ${item.id} not found`);
    }
    items[index] = item;
    this.storageService.setItems(items);
    return item;
  }

  async delete(id: string): Promise<void> {
    const items = this.storageService.getItems();
    const index = items.findIndex((item) => item.id == id);
    if (index < 0) {
      throw new Error(`Item with ID ${id} not found`);
    }
    items.splice(index, 1);
    this.storageService.setItems(items);
  }
}

export class LocalStorageService {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getItems(): any[] {
    const itemsJson = localStorage.getItem(this.storageKey);
    return itemsJson ? JSON.parse(itemsJson) : [];
  }

  setItems(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
