import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { images } from '../api/src/assets/images';
import Reservation from '../components/Reservation';

export default function Reservations() {
  const [reservations, setReservations] = React.useState([
    {
      id: '1',
      name: 'Boba',
      store: 'Boba Guys',
      image: images.brakePad,
    },
  ]);

  return (
    <View style={styles.container}>
      {reservations.map((reservation) => (
        <Reservation
          key={reservation.id}
          name={reservation.name}
          store={reservation.store}
          image={reservation.image}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
