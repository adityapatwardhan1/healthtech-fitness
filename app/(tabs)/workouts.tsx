import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from "react-native";

const getWeekDates = (baseDate: Date) => {
  const dates = [];
  const start = new Date(baseDate);
  start.setDate(baseDate.getDate() - start.getDay() + 1); // Monday start
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }
  return dates;
};

export default function GluteWorkoutPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);

  const weekDates = getWeekDates(selectedDate);

  const goToToday = () => {
    setSelectedDate(new Date());
    setShowDropdown(false);
  };

  const changeMonth = (offset: number) => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + offset);
    setSelectedDate(d);
    setShowDropdown(false);
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    }).format(date);

  const formatShort = (date: Date) => {
    const day = date.getDate();
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    return `${weekday} ${day}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowDropdown(true)}>
            <Text style={styles.headerText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDropdown(true)}>
            <Text style={styles.dropdownText}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Days of the Week */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.weekScroller}
        >
          {weekDates.map((date, i) => (
            <Pressable
              key={i}
              onPress={() => {
                setSelectedDate(date);
              }}
              style={[
                styles.dayButton,
                selectedDate.toDateString() === date.toDateString() && styles.selectedDay
              ]}
            >
              <Text style={styles.dayText}>{formatShort(date)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Dropdown Modal */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownMenu}>
            <Pressable onPress={goToToday}><Text style={styles.dropdownItem}>Today</Text></Pressable>
            <Pressable onPress={() => changeMonth(-1)}><Text style={styles.dropdownItem}>Previous Month</Text></Pressable>
            <Pressable onPress={() => changeMonth(1)}><Text style={styles.dropdownItem}>Next Month</Text></Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Workout Title */}
      <Text style={styles.titleSmall}>Today's Workout:</Text>
      <Text style={styles.titleBig}>Glute-Focused Legs</Text>

      {/* Exercises */}
      <FlatList
        data={Array.from({ length: 6 })}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <View style={styles.exerciseRow}>
            <Text style={styles.exerciseText}>☑ Exercise</Text>
            <Pressable>
              <Text style={styles.plus}>+</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Bottom Nav */}
      <View style={styles.nav}>
        {['🏠', '🏋️‍♂️', '🛒', '👥'].map((icon, idx) => (
          <Text key={idx} style={styles.navIcon}>{icon}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3', paddingTop: 20, paddingHorizontal: 20 },
  headerWrapper: {
    marginBottom: 10
  },
  header: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  dropdownText: { color: 'white', fontSize: 18, marginLeft: 10 },
  weekScroller: {
    marginTop: 10,
    flexDirection: 'row'
  },
  dayButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 8
  },
  selectedDay: {
    backgroundColor: '#444'
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownMenu: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: 200
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 8
  },
  titleSmall: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginTop: 20
  },
  titleBig: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  exerciseRow: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exerciseText: {
    fontWeight: '600'
  },
  plus: {
    fontSize: 20,
    color: '#666'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ddd',
    marginTop: 'auto',
    borderRadius: 8
  },
  navIcon: {
    fontSize: 22
  }
});


// import { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   SafeAreaView
// } from "react-native";

// const getWeekDates = (baseDate: any) => {
//   const dates = [];
//   const start = new Date(baseDate);
//   start.setDate(baseDate.getDate() - start.getDay() + 1); // Monday start
//   for (let i = 0; i < 7; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// export default function GluteWorkoutPage() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const weekDates = getWeekDates(selectedDate);

//   const goToToday = () => {
//     setSelectedDate(new Date());
//     setShowDropdown(false);
//   };

//   const changeMonth = (offset: any) => {
//     const d = new Date(selectedDate);
//     d.setMonth(d.getMonth() + offset);
//     setSelectedDate(d);
//     setShowDropdown(false);
//   };

//   const formatDate = (date: any) =>
//     new Intl.DateTimeFormat("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric"
//     }).format(date);

//   const formatShort = (date: any) => {
//     const day = date.getDate();
//     const weekday = date.toLocaleString("en-US", { weekday: "short" });
//     return `${weekday} ${day}`;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerWrapper}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
//             <Text style={styles.headerText}>{formatDate(selectedDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowDropdown(true)}>
//             <Text style={styles.dropdownText}>▼</Text>
//           </TouchableOpacity>
//         </View>

//         {showPicker && (
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroller}>
//             {weekDates.map((date, i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   setSelectedDate(date);
//                 }}
//                 style={[
//                   styles.dayButton,
//                   selectedDate.toDateString() === date.toDateString() && styles.selectedDay
//                 ]}>
//                 <Text style={styles.dayText}>{formatShort(date)}</Text>
//               </Pressable>
//             ))}
//           </ScrollView>
//         )}
//       </View>

//       {/* Dropdown Modal */}
//       <Modal visible={showDropdown} transparent animationType="fade">
//         <Pressable style={styles.modalBackdrop} onPress={() => setShowDropdown(false)}>
//           <View style={styles.dropdownMenu}>
//             <Pressable onPress={goToToday}><Text style={styles.dropdownItem}>Today</Text></Pressable>
//             <Pressable onPress={() => changeMonth(-1)}><Text style={styles.dropdownItem}>Previous Month</Text></Pressable>
//             <Pressable onPress={() => changeMonth(1)}><Text style={styles.dropdownItem}>Next Month</Text></Pressable>
//           </View>
//         </Pressable>
//       </Modal>

//       {/* Workout Title */}
//       <Text style={styles.titleSmall}>Today's Workout:</Text>
//       <Text style={styles.titleBig}>Glute-Focused Legs</Text>

//       {/* Exercises */}
//       <FlatList
//         data={Array.from({ length: 6 })}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={() => (
//           <View style={styles.exerciseRow}>
//             <Text style={styles.exerciseText}>☑ Exercise</Text>
//             <Pressable>
//               <Text style={styles.plus}>+</Text>
//             </Pressable>
//           </View>
//         )}
//       />

//       {/* Bottom Nav */}
//       <View style={styles.nav}>
//         {['🏠', '🏋️‍♂️', '🛒', '👥'].map((icon, idx) => (
//           <Text key={idx} style={styles.navIcon}>{icon}</Text>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f3f3', paddingTop: 20, paddingHorizontal: 20 },
//   headerWrapper: {
//     marginBottom: 10
//   },
//   header: {
//     backgroundColor: '#999',
//     padding: 10,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   headerText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
//   dropdownText: { color: 'white', fontSize: 18, marginLeft: 10 },
//   weekScroller: {
//     marginTop: 10,
//     flexDirection: 'row'
//   },
//   dayButton: {
//     padding: 10,
//     backgroundColor: '#ccc',
//     borderRadius: 8,
//     marginRight: 8
//   },
//   selectedDay: {
//     backgroundColor: '#444'
//   },
//   dayText: {
//     color: '#fff',
//     fontWeight: 'bold'
//   },
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   dropdownMenu: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     width: 200
//   },
//   dropdownItem: {
//     fontSize: 16,
//     paddingVertical: 8
//   },
//   titleSmall: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#555',
//     marginTop: 20
//   },
//   titleBig: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20
//   },
//   exerciseRow: {
//     backgroundColor: 'white',
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   exerciseText: {
//     fontWeight: '600'
//   },
//   plus: {
//     fontSize: 20,
//     color: '#666'
//   },
//   nav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 16,
//     backgroundColor: '#ddd',
//     marginTop: 'auto',
//     borderRadius: 8
//   },
//   navIcon: {
//     fontSize: 22
//   }
// });


// import { Text, View, StyleSheet } from 'react-native';
// import Button from '@/components/Button';

// export default function WorkoutsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Workouts</Text>
//       <Text style={styles.text}>My templates</Text>
//       <View style={styles.content}>
      
//       <Button label="My templates"/>
//       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
//         <Button label="+" style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}/>
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

// // Need screen for specific workout


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

// // import { Text, View, StyleSheet } from 'react-native';
// // import Button from '@/components/Button';

// // export default function ShopScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Workouts</Text>
// //       <Text style={styles.text}>My templates</Text>
// //       <View style={styles.content}>
      
// //       <Button label="My templates"/>
// //       <View style={{ flexDirection: 'row', alignItems: 'right', width: '100%' }}>
// //         <Button label="+" style = {{width: '50%'}}/>
// //       </View>
// //       <Button label="Back and Biceps"/>
// //       <Button label="Glute-focused legs"/>
// //       <Button label="Quad-focused legs"/>
// //       <Button label="Push day"/>
// //       <Button label="Pull day"/>
// //       </View>
// //       <View style={styles.footerContainer}>
// //         {/* <Button label="My workouts" /> */}
        
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#25292e',
// //   },
// //   header: {
// //     alignItems: 'center',
// //   },
// //   title: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontSize: 32,
// //     fontWeight: 'bold',
// //     marginTop: 50,
// //   },
// //   content: {
// //     flex: 0.5,
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   footerContainer: {
// //     padding: 2,
// //     alignItems: 'center',
// //   },
// //   text: {
// //     color: '#fff',
// //   },
// // });
