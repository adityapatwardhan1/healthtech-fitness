import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <Text style={styles.text}>My templates</Text>
      <View style={styles.content}>
      
      <Button label="My templates"/>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        <Button label="+" style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}/>
      </View>
      <Button label="Back and Biceps"/>
      <Button label="Glute-focused legs"/>
      <Button label="Quad-focused legs"/>
      <Button label="Push day"/>
      <Button label="Pull day"/>
      </View>
      <View style={styles.footerContainer}>
        {/* <Button label="My workouts" /> */}
        
      </View>
    </View>
  );
}

// Need screen for specific workout


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
  },
  content: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    padding: 2,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

// import { Text, View, StyleSheet } from 'react-native';
// import Button from '@/components/Button';

// export default function ShopScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Workouts</Text>
//       <Text style={styles.text}>My templates</Text>
//       <View style={styles.content}>
      
//       <Button label="My templates"/>
//       <View style={{ flexDirection: 'row', alignItems: 'right', width: '100%' }}>
//         <Button label="+" style = {{width: '50%'}}/>
//       </View>
//       <Button label="Back and Biceps"/>
//       <Button label="Glute-focused legs"/>
//       <Button label="Quad-focused legs"/>
//       <Button label="Push day"/>
//       <Button label="Pull day"/>
//       </View>
//       <View style={styles.footerContainer}>
//         {/* <Button label="My workouts" /> */}
        
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//   },
//   header: {
//     alignItems: 'center',
//   },
//   title: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 50,
//   },
//   content: {
//     flex: 0.5,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   footerContainer: {
//     padding: 2,
//     alignItems: 'center',
//   },
//   text: {
//     color: '#fff',
//   },
// });
