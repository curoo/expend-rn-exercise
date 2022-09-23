type Doc = {
  id: string;
};

type Employee = Doc & {
  password: string;
  storeId: string;
};

type Category = Doc & {
  name: string;
};

type Item = Doc & {
  name: string;
  image: string;
  categoryId: string;
};

type Reservation = {
  itemId: string;
  employeeId: string;
};

type Store = Doc & {
  name: string;
  inventory: { [itemId: string]: number };
  reservations: Reservation[];
};
