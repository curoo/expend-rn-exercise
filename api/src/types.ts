type DBObject = {
  id: string;
};

type Employee = DBObject & {
  password: string;
  storeId: string;
};

type Category = DBObject & {
  id: string;
  name: string;
};

type Item = DBObject & {
  name: string;
  image: string;
  categoryId: string;
};

type Reservation = {
  itemId: string;
  employeeId: string;
};

type Store = DBObject & {
  id: string;
  name: string;
  inventory: { [itemId: string]: number };
  reservations: Reservation[];
};
