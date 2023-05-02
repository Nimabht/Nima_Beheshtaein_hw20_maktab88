var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ORM {
    constructor(storageKey) {
        this.storageService = new LocalStorageService(storageKey);
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.storageService.getItems();
            const newId = String(Math.random() * 10 ** 17);
            const newItem = Object.assign(Object.assign({}, item), { id: newId });
            items.push(newItem);
            this.storageService.setItems(items);
            return newItem;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.storageService.getItems();
            const index = items.findIndex((i) => i.id == id);
            if (index < 0) {
                throw new Error(`Item with ID ${id} not found`);
            }
            return items[index];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageService.getItems();
        });
    }
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.storageService.getItems();
            const index = items.findIndex((i) => i.id == item.id);
            if (index < 0) {
                throw new Error(`Item with ID ${item.id} not found`);
            }
            items[index] = item;
            this.storageService.setItems(items);
            return item;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.storageService.getItems();
            const index = items.findIndex((item) => item.id == id);
            if (index < 0) {
                throw new Error(`Item with ID ${id} not found`);
            }
            items.splice(index, 1);
            this.storageService.setItems(items);
        });
    }
}
export class LocalStorageService {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    getItems() {
        const itemsJson = localStorage.getItem(this.storageKey);
        return itemsJson ? JSON.parse(itemsJson) : [];
    }
    setItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
}
