import { images } from './assets/images';

type Database = {
  employee: Employee[];
  category: Category[];
  item: Item[];
  store: Store[];
};

export const db: Database = {
  employee: [
    { id: 'EP0001', password: 's3cr3t', storeId: '1' },
    { id: 'EP0002', password: 's3cr3t', storeId: '2' },
    { id: 'EP0003', password: 's3cr3t', storeId: '2' },
    { id: 'EP0004', password: 's3cr3t', storeId: '2' },
    { id: 'EP0005', password: 's3cr3t', storeId: '2' },
    { id: 'EP0006', password: 's3cr3t', storeId: '2' },
  ],
  category: [
    { id: '1', name: 'Consumables' },
    { id: '2', name: 'Spares' },
    { id: '3', name: 'Tools' },
    { id: '3', name: 'Oils' },
  ],
  item: [
    {
      id: '1',
      categoryId: '2',
      name: 'Break Pads',
      image: images.brakePad,
    },
    {
      id: '2',
      categoryId: '2',
      name: 'Suspension Arm Repair Kit 3 PCS',
      image: images.suspensionRepairKit,
    },
    {
      id: '2',
      categoryId: '3',
      name: 'Electric Cable Cutter',
      image: images.cableCutter,
    },
  ],
  store: [
    {
      id: '1',
      name: 'Tully Branch',
      inventory: {
        '1': 40,
      },
      reservations: [
        { itemId: '1', employeeId: 'EP0002' },
        { itemId: '1', employeeId: 'EP0003' },
        { itemId: '1', employeeId: 'EP0004' },
        { itemId: '1', employeeId: 'EP0005' },
      ],
    },
  ],
};

const get = <T extends keyof Database>(
  table: T,
  id: string,
): Database[T][0] => {
  const value = (db[table] as any).find((v: any) => v.id === id);
  if (!value) throw new Error(`No ${table} with id ${id}`);
  return value;
};

export const login = (
  id: string,
  password: string,
): Omit<Employee, 'password'> | null => {
  const employee = db.employee.find((e) => e.id === id);

  if (!employee) return null;

  const { password: credential, ...user } = employee || {};
  if (credential !== password) return null;

  return user;
};

export const updateInventory = (storeId: string, itemId: string, quantity: number): void => {
  const store = get('store', storeId);
  get('item', itemId); // assert the item exists
  store.inventory[itemId] = quantity;
}

export const getTotalInventory = (itemId: string): number => {
  return db.store.reduce((total, store) => {
    return total + (store.inventory[itemId] || 0);
  }, 0);
};

export const getInventory = (): {
  category: Category;
  items: {
    item: Item;
    quantity: number;
    reservations: number;
  }[];
}[] => {
  const categories = db.category.map((category) => {
    const items = db.item
      .filter((item) => item.categoryId === category.id)
      .map((item) => {
        const quantity = getTotalInventory(item.id);
        const reservations = db.store.reduce((total, store) => {
          return (
            total +
            store.reservations.filter((r) => r.itemId === item.id).length
          );
        }, 0);
        return { item, quantity, reservations };
      });
    return { category, items };
  });
  return categories;
};

export const createItem = (
  categoryId: string,
  name: string,
  image: string,
): Item => {
  const item = {
    id: String(db.item.length + 1),
    categoryId,
    name,
    image,
  };
  db.item.push(item);
  return item;
};

export const createCategory = (name: string): Category => {
  const category = {
    id: String(db.category.length + 1),
    name,
  };
  db.category.push(category);
  return category;
};

export const createReservation = (
  itemId: string,
  employeeId: string,
  storeId: string,
): Reservation => {
  const reservation = {
    itemId,
    employeeId,
  };
  const store = get('store', storeId);
  store.reservations.push(reservation);
  return reservation;
};

export const getReservations = (employeeId: string): Reservation[] => {
  return db.store.reduce((reservations, store) => {
    return reservations.concat(
      store.reservations.filter((r) => r.employeeId === employeeId),
    );
  }, [] as Reservation[]);
};

export const deleteReservation = (
  itemId: string,
  employeeId: string,
  storeId: string,
): void => {
  const store = get('store', storeId);
  store.reservations = store.reservations.filter(
    (r) => r.itemId !== itemId && r.employeeId !== employeeId,
  );
};

export const confirmReservation = (
  itemId: string,
  employeeId: string,
  storeId: string,
): void => {
  const item = get('item', itemId);
  const store = get('store', storeId);
  deleteReservation(itemId, employeeId, storeId);
  updateInventory(storeId, itemId, store.inventory[itemId] - 1);
};
