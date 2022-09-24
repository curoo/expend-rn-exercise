import { View, Text, StyleSheet, Image } from 'react-native';
import Card from './Card';

type Props = {
  name: string;
  store: string;
  image: string;
};

export default function Reservation(props: Props) {
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.row}>
          <Image source={{ uri: props.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.subtitle}>{props.store}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});