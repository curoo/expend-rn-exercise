# Expend React Native Exercise

This is a skeleton application to get you up and running quickly.
We are _not_ testing if you get this done or not, but how you work and how you communicate.

Feel free to use all the tools you are used to, including Google, CoPilot, Github, etc.

### Getting Started

Make sure you are can start the emulator

```bash
cd ~/src/expend-rn-exercise
npm install
npm run ios # android
```

Bring up the backend

```bash
docker compose up
```

### Challenge

The application we are building allows a franchisee to manage their inventory between their stores.

The local `./api` folder contains a mock api that you can use to get started. If it restarts, you will lose all data.

The wiremock is available on [Miro](https://miro.com/app/board/uXjVPTkJHVA=/?share_link_id=719872735173)

### Requirements

- [ ] User can login with employee id and password
- [ ] User can view a list of items, and the quantity of each item in each store
- [ ] User can add an item, with an image, name, and category
- [ ] User can set the quantity of an item in their store
- [ ] User can reserve an item from another store
- [ ] User can manage their reservations, confirming or cancelling them

There are two tabbed screens in the application, the `Inventory` screen and the `Reservations` screen.

### Inventory Screen

- The inventory screen shows a list of items, by category.
- At the top of the screen there is a side scrolling category list, and a list of items below.
- The items are grouped by category, with a section title, and the category list is updated to match the category being viewed.
- Each item has a name, image, and total quantity in all stores.
- If you click on an item it will open a [bottom sheet modal](https://gorhom.github.io/react-native-bottom-sheet/modal/).
    - The shows a list of stores, and the quantity of the item in each store.
    - The users store is always first in the list.
    - The user can edit the quantity of the item in their store.
    - A button to reserve the item from another store.
- There is a floating action button in the bottom right corner.
    - Clicking this button opens a popup modal from the bottom.
    - The modal has a form to add a new item.
    - The form has a name, category, and image.
    - The image can be selected from the photo library.

### Reservations Screen

- The reservations screen shows a list of reservations.
- Each reservation has an image, name and the store it is reserved from.
- The user can swipe right to confirm, or left to cancel the reservation.
    
