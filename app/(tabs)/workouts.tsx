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
  SafeAreaView,
  TextInput
} from "react-native";

// Date utility function (preserved from original code)
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

// Interface for exercise data
interface Exercise {
  id: string;
  name: string;
  sets: Array<{
    weight: string;
    reps: string;
    previous?: string;
  }>;
  expanded: boolean;
}

interface ExerciseRowProps {
  exercise: Exercise;
  onToggleExpand: (id: string) => void;
  onUpdateSet: (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => void;
  onAddSet: (exerciseId: string) => void;
}

const ExerciseRow = ({ exercise, onToggleExpand, onUpdateSet, onAddSet }: ExerciseRowProps) => {
  return (
    <View style={styles.exerciseContainer}>
      {/* Exercise Header Row */}
      <View style={styles.exerciseRow}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkbox}>☑</Text>
          <Text style={styles.exerciseText}>{exercise.name || "Exercise"}</Text>
        </View>
        <Pressable onPress={() => onToggleExpand(exercise.id)}>
          <Text style={styles.expandButton}>{exercise.expanded ? "-" : "+"}</Text>
        </Pressable>
      </View>

      {/* Expanded Content */}
      {exercise.expanded && (
        <View style={styles.expandedContent}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Set</Text>
            <Text style={styles.headerCell}>Previous</Text>
            <Text style={styles.headerCell}>lbs</Text>
            <Text style={styles.headerCell}>Reps</Text>
          </View>
          
          {/* Rows for sets */}
          {exercise.sets.map((set, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cellText}>{index + 1}</Text>
              <Text style={styles.cellText}>{set.previous || "- -"}</Text>
              <TextInput
                style={styles.inputCell}
                value={set.weight}
                onChangeText={(value) => onUpdateSet(exercise.id, index, 'weight', value)}
                keyboardType="numeric"
                placeholder="--"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.inputCell}
                value={set.reps}
                onChangeText={(value) => onUpdateSet(exercise.id, index, 'reps', value)}
                keyboardType="numeric"
                placeholder="--"
                placeholderTextColor="#999"
              />
            </View>
          ))}
          
          {/* Add Set Button */}
          <TouchableOpacity 
            style={styles.addSetButton}
            onPress={() => onAddSet(exercise.id)}
          >
            <Text style={styles.addSetText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function GluteWorkoutPage() {
  // Date state (preserved from original code)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Exercise state
  const [exercises, setExercises] = useState<Exercise[]>([
    { 
      id: '1', 
      name: 'Exercise', 
      expanded: true,
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ]
    },
    { 
      id: '2', 
      name: 'Exercise', 
      expanded: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ]
    },
    { 
      id: '3', 
      name: 'Exercise', 
      expanded: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ] 
    },
    { 
      id: '4', 
      name: 'Exercise', 
      expanded: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ] 
    },
    { 
      id: '5', 
      name: 'Exercise', 
      expanded: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ] 
    },
    { 
      id: '6', 
      name: 'Exercise', 
      expanded: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ] 
    },
  ]);

  // Date utility functions (preserved from original code)
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

  // Exercise functions
  const toggleExpand = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, expanded: !ex.expanded } : ex
    ));
  };

  const updateSet = (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = [...ex.sets];
        updatedSets[setIndex] = { 
          ...updatedSets[setIndex], 
          [field]: value 
        };
        return { ...ex, sets: updatedSets };
      }
      return ex;
    }));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { weight: '', reps: '', previous: '- -' }]
        };
      }
      return ex;
    }));
  };

  const addExercise = () => {
    const newId = (exercises.length + 1).toString();
    setExercises([
      ...exercises,
      {
        id: newId,
        name: 'Exercise',
        expanded: false,
        sets: [
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' }
        ]
      }
    ]);
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

      <ScrollView style={styles.exerciseList}>
        {exercises.map(exercise => (
          <ExerciseRow 
            key={exercise.id} 
            exercise={exercise} 
            onToggleExpand={toggleExpand}
            onUpdateSet={updateSet}
            onAddSet={addSet}
          />
        ))}

        {/* Add Exercise button */}
        <TouchableOpacity 
          style={styles.addExerciseButton}
          onPress={addExercise}
        >
          <Text style={styles.addExerciseText}>+ Add Exercise</Text>
        </TouchableOpacity>
        
        {/* Finish Workout button */}
        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Finish Workout</Text>
        </TouchableOpacity>
      </ScrollView>

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
  container: { 
    flex: 1, 
    backgroundColor: '#f3f3f3', 
  },
  headerWrapper: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginTop: 10,
  },
  titleBig: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  exerciseContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    fontSize: 16,
  },
  exerciseText: {
    fontWeight: '600',
    fontSize: 16,
  },
  expandButton: {
    fontSize: 20,
    color: '#666',
    width: 24,
    textAlign: 'center',
  },
  expandedContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#444',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  inputCell: {
    flex: 1,
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 4,
    margin: 2,
    textAlign: 'center',
    color: '#444',
  },
  addSetButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 8,
  },
  addSetText: {
    color: '#666',
    fontWeight: '500',
  },
  addExerciseButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  addExerciseText: {
    color: '#666',
    fontWeight: '500',
  },
  finishButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  finishButtonText: {
    fontWeight: '600',
    color: '#444',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
//   Pressable,
//   TouchableOpacity
// } from "react-native";

// // Interface for exercise data
// interface Exercise {
//   id: string;
//   name: string;
//   sets: number;
// }

// interface ExerciseRowProps {
//   exercise: Exercise;
// }

// const ExerciseRow = ({ exercise }: ExerciseRowProps) => {
//   const [expanded, setExpanded] = useState(false);

//   // Toggle expanded state
//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <View style={styles.exerciseContainer}>
//       {/* Exercise Header Row */}
//       <View style={styles.exerciseRow}>
//         <View style={styles.checkboxContainer}>
//           <Text style={styles.checkbox}>☑</Text>
//           <Text style={styles.exerciseText}>{exercise.name || "Exercise"}</Text>
//         </View>
//         <Pressable onPress={toggleExpand}>
//           <Text style={styles.expandButton}>{expanded ? "-" : "+"}</Text>
//         </Pressable>
//       </View>

//       {/* Expanded Content */}
//       {expanded && (
//         <View style={styles.expandedContent}>
//           {/* Header */}
//           <View style={styles.tableHeader}>
//             <Text style={styles.headerCell}>Set</Text>
//             <Text style={styles.headerCell}>Previous</Text>
//             <Text style={styles.headerCell}>lbs</Text>
//             <Text style={styles.headerCell}>Reps</Text>
//           </View>
          
//           {/* Rows for sets */}
//           {Array.from({ length: exercise.sets || 4 }).map((_, index) => (
//             <View key={index} style={styles.tableRow}>
//               <Text style={styles.cellText}>{index + 1}</Text>
//               <Text style={styles.cellText}>- -</Text>
//               <View style={styles.inputCell}></View>
//               <View style={styles.inputCell}></View>
//             </View>
//           ))}
          
//           {/* Add Set Button */}
//           <TouchableOpacity style={styles.addSetButton}>
//             <Text style={styles.addSetText}>Add Set</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// // Main component to display list of exercises
// export default function GluteWorkoutPage() {
//   const exercises: Exercise[] = [
//     { id: '1', name: 'Exercise', sets: 4 },
//     { id: '2', name: 'Exercise', sets: 4 },
//     { id: '3', name: 'Exercise', sets: 4 },
//     { id: '4', name: 'Exercise', sets: 4 },
//     { id: '5', name: 'Exercise', sets: 4 },
//     { id: '6', name: 'Exercise', sets: 4 },
//   ];

//   // Integrate this with your existing code
//   return (
//     <View style={styles.container}>
//       {/* Your existing header code would go here */}
      
//       {/* Exercise List */}
//       <Text style={styles.titleSmall}>Today's Workout:</Text>
//       <Text style={styles.titleBig}>Glute-Focused Legs</Text>
      
//       {exercises.map(exercise => (
//         <ExerciseRow key={exercise.id} exercise={exercise} />
//       ))}
      
//       {/* Add Exercise button */}
//       <TouchableOpacity style={styles.addExerciseButton}>
//         <Text style={styles.addExerciseText}>+ Add Exercise</Text>
//       </TouchableOpacity>
      
//       {/* Finish Workout button */}
//       <TouchableOpacity style={styles.finishButton}>
//         <Text style={styles.finishButtonText}>Finish Workout</Text>
//       </TouchableOpacity>
      
//       {/* Your existing navigation code would go here */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f3f3',
//     paddingHorizontal: 15,
//     paddingTop: 20,
//   },
//   exerciseContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   exerciseRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     marginRight: 8,
//     fontSize: 16,
//   },
//   exerciseText: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   expandButton: {
//     fontSize: 20,
//     color: '#666',
//     width: 24,
//     textAlign: 'center',
//   },
//   expandedContent: {
//     paddingHorizontal: 12,
//     paddingBottom: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     marginBottom: 8,
//   },
//   headerCell: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: '500',
//     fontSize: 14,
//     color: '#444',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   cellText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#666',
//   },
//   inputCell: {
//     flex: 1,
//     height: 30,
//     backgroundColor: '#eee',
//     borderRadius: 4,
//     margin: 2,
//   },
//   addSetButton: {
//     backgroundColor: '#eee',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     alignSelf: 'center',
//     marginTop: 8,
//   },
//   addSetText: {
//     color: '#666',
//     fontWeight: '500',
//   },
//   titleSmall: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#555',
//     marginTop: 10,
//   },
//   titleBig: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   addExerciseButton: {
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   addExerciseText: {
//     color: '#666',
//     fontWeight: '500',
//   },
//   finishButton: {
//     backgroundColor: '#ccc',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 15,
//   },
//   finishButtonText: {
//     fontWeight: '600',
//     color: '#444',
//   },
// });