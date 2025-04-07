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
  TextInput,
  Alert
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

// New function to navigate to next/previous week
const changeWeek = (date: Date, offset: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + (offset * 7));
  return newDate;
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
  completed: boolean; // New property to track completion status
}

interface ExerciseRowProps {
  exercise: Exercise;
  onToggleExpand: (id: string) => void;
  onUpdateSet: (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => void;
  onAddSet: (exerciseId: string) => void;
  onToggleComplete: (id: string) => void; // New prop for toggling completion
  onEditExercise: (id: string) => void; // New prop for editing exercise
  onSkipExercise: (id: string) => void; // New prop for skipping exercise
}

const ExerciseRow = ({ 
  exercise, 
  onToggleExpand, 
  onUpdateSet, 
  onAddSet, 
  onToggleComplete, 
  onEditExercise,
  onSkipExercise 
}: ExerciseRowProps) => {
  // For showing exercise options menu
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={styles.exerciseContainer}>
      {/* Exercise Header Row */}
      <View style={styles.exerciseRow}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            onPress={() => onToggleComplete(exercise.id)}
            style={styles.checkboxTouchable}
          >
            <Text style={styles.checkbox}>{exercise.completed ? "☑" : "☐"}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setShowOptions(true)}
            style={styles.exerciseNameTouchable}
          >
            <Text style={[
              styles.exerciseText,
              exercise.completed && styles.completedExerciseText
            ]}>
              {exercise.name || "Exercise"}
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={() => onToggleExpand(exercise.id)}>
          <Text style={styles.expandButton}>{exercise.expanded ? "-" : "+"}</Text>
        </Pressable>
      </View>

      {/* Exercise Options Modal */}
      <Modal visible={showOptions} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setShowOptions(false)}>
          <View style={styles.optionsMenu}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                onToggleComplete(exercise.id);
                setShowOptions(false);
              }}
            >
              <Text style={styles.optionText}>
                {exercise.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setShowOptions(false);
                onSkipExercise(exercise.id);
              }}
            >
              <Text style={styles.optionText}>Skip Exercise</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setShowOptions(false);
                onEditExercise(exercise.id);
              }}
            >
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.optionCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
      completed: false,
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
      completed: false, 
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
      completed: false, 
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
      completed: false, 
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
      completed: false, 
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
      completed: false, 
      sets: [
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' },
        { weight: '', reps: '', previous: '- -' }
      ] 
    },
  ]);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editExerciseId, setEditExerciseId] = useState<string | null>(null);
  const [editExerciseName, setEditExerciseName] = useState("");
  const [editExerciseFrequency, setEditExerciseFrequency] = useState("Everyday");
  const [editExerciseNotes, setEditExerciseNotes] = useState("");

  // Date utility functions (preserved from original code)
  const weekDates = getWeekDates(selectedDate);

  // Week navigation functions
  const goToPreviousWeek = () => {
    setSelectedDate(changeWeek(selectedDate, -1));
  };

  const goToNextWeek = () => {
    setSelectedDate(changeWeek(selectedDate, 1));
  };

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

  const toggleComplete = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
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
        completed: false,
        sets: [
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' },
          { weight: '', reps: '', previous: '- -' }
        ]
      }
    ]);
  };

  const editExercise = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (exercise) {
      setEditExerciseId(id);
      setEditExerciseName(exercise.name);
      setEditExerciseFrequency("Everyday"); // Default or could be stored in Exercise
      setEditExerciseNotes(""); // Default or could be stored in Exercise
      setShowEditModal(true);
    }
  };

  const saveEditedExercise = () => {
    if (editExerciseId) {
      setExercises(exercises.map(ex => 
        ex.id === editExerciseId ? { ...ex, name: editExerciseName } : ex
      ));
    }
    setShowEditModal(false);
  };

  const skipExercise = (id: string) => {
    // Option 1: Hide exercise
    // setExercises(exercises.filter(ex => ex.id !== id));
    
    // Option 2: Mark as skipped (could add a 'skipped' property)
    Alert.alert(
      "Skip Exercise",
      "Are you sure you want to skip this exercise?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Skip", 
          onPress: () => {
            setExercises(exercises.map(ex => 
              ex.id === id ? { ...ex, completed: true } : ex
            ));
          }
        }
      ]
    );
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

        {/* Week Navigation */}
        <View style={styles.weekNavigation}>
          <TouchableOpacity 
            style={styles.weekNavigationButton} 
            onPress={goToPreviousWeek}
          >
            <Text style={styles.weekNavigationText}>◀ Previous Week</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.weekNavigationButton}
            onPress={goToNextWeek}
          >
            <Text style={styles.weekNavigationText}>Next Week ▶</Text>
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

      {/* Edit Exercise Modal */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View style={styles.editModalContainer}>
          <View style={styles.editModalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.editModalBackButton}>{'<'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.editExerciseImageContainer}>
            <View style={styles.editExerciseImagePlaceholder}></View>
          </View>
          
          <View style={styles.editFormContainer}>
            <TextInput
              style={styles.editNameInput}
              value={editExerciseName}
              onChangeText={setEditExerciseName}
              placeholder="Name of Exercise..."
            />
            
            <View style={styles.editFrequencyContainer}>
              <Text style={styles.editLabel}>
                <Text style={styles.editIcon}>📅 </Text>
                Repeat
              </Text>
              <View style={styles.editDropdown}>
                <Text>{editExerciseFrequency}</Text>
                <Text style={styles.editDropdownArrow}>{'>'}</Text>
              </View>
            </View>
            
            <View style={styles.editNotesContainer}>
              <Text style={styles.editLabel}>
                <Text style={styles.editIcon}>📝 </Text>
                Notes
              </Text>
              <TextInput
                style={styles.editNotesInput}
                value={editExerciseNotes}
                onChangeText={setEditExerciseNotes}
                placeholder="Type here..."
                multiline
              />
            </View>
            
            <View style={styles.editHistoryContainer}>
              <Text style={styles.editLabel}>
                <Text style={styles.editIcon}>🕒 </Text>
                History
                <Text style={styles.editCollapseIndicator}> -</Text>
              </Text>
              <View style={styles.historyHeaderRow}>
                <Text style={styles.historyHeaderDate}>Date</Text>
                <Text style={styles.historyHeaderStat}>Stat</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyDate}>--/--</Text>
                <Text style={styles.historyStat}>- -</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyDate}>--/--</Text>
                <Text style={styles.historyStat}>- -</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={styles.historyDate}>--/--</Text>
                <Text style={styles.historyStat}>- -</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveEditedExercise}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            onToggleComplete={toggleComplete}
            onEditExercise={editExercise}
            onSkipExercise={skipExercise}
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
    flex: 1,
  },
  checkboxTouchable: {
    padding: 5,
  },
  checkbox: {
    marginRight: 8,
    fontSize: 16,
  },
  exerciseNameTouchable: {
    flex: 1,
  },
  exerciseText: {
    fontWeight: '600',
    fontSize: 16,
  },
  completedExerciseText: {
    textDecorationLine: 'line-through',
    color: '#888',
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
  },
  // Exercise options modal styles
  optionsMenu: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
    padding: 0,
    overflow: 'hidden',
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionCancelText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  // Edit Exercise Modal Styles
  editModalContainer: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  editModalHeader: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  editModalBackButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editExerciseImageContainer: {
    alignItems: 'center',
    padding: 10,
  },
  editExerciseImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  editFormContainer: {
    padding: 15,
  },
  editNameInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  editFrequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  editIcon: {
    marginRight: 5,
  },
  editDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editDropdownArrow: {
    marginLeft: 10,
    color: '#999',
  },
  editNotesContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  editNotesInput: {
    height: 80,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  editHistoryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  editCollapseIndicator: {
    color: '#999',
  },
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyHeaderDate: {
    fontWeight: '500',
  },
  historyHeaderStat: {
    fontWeight: '500',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyDate: {
    color: '#666',
  },
  historyStat: {
    color: '#666',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f3f3f3',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '500',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: '500',
    color: '#666',
  },
  weekNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
      },
      weekNavigationButton: {
        padding: 8,
        backgroundColor: '#777',
        borderRadius: 6,
      },
      weekNavigationText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
      },
});

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#f3f3f3', 
//   },
//   headerWrapper: {
//     marginBottom: 10,
//     paddingHorizontal: 20,
//     paddingTop: 20,
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
//   // Week navigation styles
//   weekNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   weekNavigationButton: {
//     padding: 8,
//     backgroundColor: '#777',
//     borderRadius: 6,
//   },
//   weekNavigationText: {
//     color: 'white',
//     fontWeight: '500',
//     fontSize: 12,
//   },
//   weekScroller: {
//     marginTop: 5,
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
//     marginTop: 10,
//   },
//   titleBig: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   exerciseList: {
//     flex: 1,
//     paddingHorizontal: 15,
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
//     flex: 1,
//   },
//   checkboxTouchable: {
//     padding: 5,
//   },
//   checkbox: {
//     marginRight: 8,
//     fontSize: 16,
//   },
//   exerciseNameTouchable: {
//     flex: 1,
//   },
//   exerciseText: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   completedExerciseText: {
//     textDecorationLine: 'line-through',
//     color: '#888',
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
//     textAlign: 'center',
//     color: '#444',
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
//   nav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 16,
//     backgroundColor: '#ddd',
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
//   navIcon: {
//     fontSize: 22
//   },
//   // Exercise options modal styles
//   optionsMenu: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     width: '80%',
//     padding: 0,
//     overflow: 'hidden',
//   },
//   optionButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   optionCancelText: {
//     fontSize: 16,
//     color: '#999',
//     fontWeight: '500',
//   },
//   // Edit Exercise Modal Styles
//   editModalContainer: {
//     flex: 1,
//     backgroundColor: '#f3f3f3',
//   },
//   editModalHeader: {
//     flexDirection: 'row',
//     padding: 15,
//     backgroundColor: '#f3f3f3',
//   },
//   editModalBackButton: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   editExerciseImageContainer: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   editExerciseImagePlaceholder: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#ddd',
//     borderRadius: 8,
//   },
//   editFormContainer: {
//     padding: 15,
//   },
//   editNameInput: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 15,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   editFrequencyContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   editLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   editIcon: {
//     marginRight: 5,
//   },
//   editDropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   editDropdownArrow: {
//     marginLeft: 10,
//     color: '#999',
//   },
//   editNotesContainer: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   editNotesInput: {
//     height: 80,
//     marginTop: 10,
//     textAlignVertical: 'top',
//   },
//   editHistoryContainer: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 8,
//   },
//   editCollapseIndicator: {
//     color: '#999',
//   },
//   historyHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   historyHeaderDate: {
//     fontWeight: '500',
//   },
//   historyHeaderStat: {
//     fontWeight: '500',
//   },
// }

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
//   SafeAreaView,
//   TextInput,
//   Alert
// } from "react-native";

// // Date utility function (preserved from original code)
// const getWeekDates = (baseDate: Date) => {
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

// // Interface for exercise data
// interface Exercise {
//   id: string;
//   name: string;
//   sets: Array<{
//     weight: string;
//     reps: string;
//     previous?: string;
//   }>;
//   expanded: boolean;
//   completed: boolean; // New property to track completion status
// }

// interface ExerciseRowProps {
//   exercise: Exercise;
//   onToggleExpand: (id: string) => void;
//   onUpdateSet: (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => void;
//   onAddSet: (exerciseId: string) => void;
//   onToggleComplete: (id: string) => void; // New prop for toggling completion
//   onEditExercise: (id: string) => void; // New prop for editing exercise
//   onSkipExercise: (id: string) => void; // New prop for skipping exercise
// }

// const ExerciseRow = ({ 
//   exercise, 
//   onToggleExpand, 
//   onUpdateSet, 
//   onAddSet, 
//   onToggleComplete, 
//   onEditExercise,
//   onSkipExercise 
// }: ExerciseRowProps) => {
//   // For showing exercise options menu
//   const [showOptions, setShowOptions] = useState(false);

//   return (
//     <View style={styles.exerciseContainer}>
//       {/* Exercise Header Row */}
//       <View style={styles.exerciseRow}>
//         <View style={styles.checkboxContainer}>
//           <TouchableOpacity 
//             onPress={() => onToggleComplete(exercise.id)}
//             style={styles.checkboxTouchable}
//           >
//             <Text style={styles.checkbox}>{exercise.completed ? "☑" : "☐"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             onPress={() => setShowOptions(true)}
//             style={styles.exerciseNameTouchable}
//           >
//             <Text style={[
//               styles.exerciseText,
//               exercise.completed && styles.completedExerciseText
//             ]}>
//               {exercise.name || "Exercise"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Pressable onPress={() => onToggleExpand(exercise.id)}>
//           <Text style={styles.expandButton}>{exercise.expanded ? "-" : "+"}</Text>
//         </Pressable>
//       </View>

//       {/* Exercise Options Modal */}
//       <Modal visible={showOptions} transparent animationType="fade">
//         <Pressable style={styles.modalBackdrop} onPress={() => setShowOptions(false)}>
//           <View style={styles.optionsMenu}>
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => {
//                 onToggleComplete(exercise.id);
//                 setShowOptions(false);
//               }}
//             >
//               <Text style={styles.optionText}>
//                 {exercise.completed ? "Mark as Incomplete" : "Mark as Complete"}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => {
//                 setShowOptions(false);
//                 onSkipExercise(exercise.id);
//               }}
//             >
//               <Text style={styles.optionText}>Skip Exercise</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => {
//                 setShowOptions(false);
//                 onEditExercise(exercise.id);
//               }}
//             >
//               <Text style={styles.optionText}>Edit</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.optionButton}
//               onPress={() => setShowOptions(false)}
//             >
//               <Text style={styles.optionCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </Pressable>
//       </Modal>

//       {/* Expanded Content */}
//       {exercise.expanded && (
//         <View style={styles.expandedContent}>
//           {/* Header */}
//           <View style={styles.tableHeader}>
//             <Text style={styles.headerCell}>Set</Text>
//             <Text style={styles.headerCell}>Previous</Text>
//             <Text style={styles.headerCell}>lbs</Text>
//             <Text style={styles.headerCell}>Reps</Text>
//           </View>
          
//           {/* Rows for sets */}
//           {exercise.sets.map((set, index) => (
//             <View key={index} style={styles.tableRow}>
//               <Text style={styles.cellText}>{index + 1}</Text>
//               <Text style={styles.cellText}>{set.previous || "- -"}</Text>
//               <TextInput
//                 style={styles.inputCell}
//                 value={set.weight}
//                 onChangeText={(value) => onUpdateSet(exercise.id, index, 'weight', value)}
//                 keyboardType="numeric"
//                 placeholder="--"
//                 placeholderTextColor="#999"
//               />
//               <TextInput
//                 style={styles.inputCell}
//                 value={set.reps}
//                 onChangeText={(value) => onUpdateSet(exercise.id, index, 'reps', value)}
//                 keyboardType="numeric"
//                 placeholder="--"
//                 placeholderTextColor="#999"
//               />
//             </View>
//           ))}
          
//           {/* Add Set Button */}
//           <TouchableOpacity 
//             style={styles.addSetButton}
//             onPress={() => onAddSet(exercise.id)}
//           >
//             <Text style={styles.addSetText}>Add Set</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default function GluteWorkoutPage() {
//   // Date state (preserved from original code)
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // Exercise state
//   const [exercises, setExercises] = useState<Exercise[]>([
//     { 
//       id: '1', 
//       name: 'Exercise', 
//       expanded: true,
//       completed: false,
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ]
//     },
//     { 
//       id: '2', 
//       name: 'Exercise', 
//       expanded: false,
//       completed: false, 
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ]
//     },
//     { 
//       id: '3', 
//       name: 'Exercise', 
//       expanded: false,
//       completed: false, 
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ] 
//     },
//     { 
//       id: '4', 
//       name: 'Exercise', 
//       expanded: false,
//       completed: false, 
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ] 
//     },
//     { 
//       id: '5', 
//       name: 'Exercise', 
//       expanded: false,
//       completed: false, 
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ] 
//     },
//     { 
//       id: '6', 
//       name: 'Exercise', 
//       expanded: false,
//       completed: false, 
//       sets: [
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' },
//         { weight: '', reps: '', previous: '- -' }
//       ] 
//     },
//   ]);

//   // Edit modal state
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editExerciseId, setEditExerciseId] = useState<string | null>(null);
//   const [editExerciseName, setEditExerciseName] = useState("");
//   const [editExerciseFrequency, setEditExerciseFrequency] = useState("Everyday");
//   const [editExerciseNotes, setEditExerciseNotes] = useState("");

//   // Date utility functions (preserved from original code)
//   const weekDates = getWeekDates(selectedDate);

//   const goToToday = () => {
//     setSelectedDate(new Date());
//     setShowDropdown(false);
//   };

//   const changeMonth = (offset: number) => {
//     const d = new Date(selectedDate);
//     d.setMonth(d.getMonth() + offset);
//     setSelectedDate(d);
//     setShowDropdown(false);
//   };

//   const formatDate = (date: Date) =>
//     new Intl.DateTimeFormat("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric"
//     }).format(date);

//   const formatShort = (date: Date) => {
//     const day = date.getDate();
//     const weekday = date.toLocaleString("en-US", { weekday: "short" });
//     return `${weekday} ${day}`;
//   };

//   // Exercise functions
//   const toggleExpand = (id: string) => {
//     setExercises(exercises.map(ex => 
//       ex.id === id ? { ...ex, expanded: !ex.expanded } : ex
//     ));
//   };

//   const toggleComplete = (id: string) => {
//     setExercises(exercises.map(ex => 
//       ex.id === id ? { ...ex, completed: !ex.completed } : ex
//     ));
//   };

//   const updateSet = (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => {
//     setExercises(exercises.map(ex => {
//       if (ex.id === exerciseId) {
//         const updatedSets = [...ex.sets];
//         updatedSets[setIndex] = { 
//           ...updatedSets[setIndex], 
//           [field]: value 
//         };
//         return { ...ex, sets: updatedSets };
//       }
//       return ex;
//     }));
//   };

//   const addSet = (exerciseId: string) => {
//     setExercises(exercises.map(ex => {
//       if (ex.id === exerciseId) {
//         return {
//           ...ex,
//           sets: [...ex.sets, { weight: '', reps: '', previous: '- -' }]
//         };
//       }
//       return ex;
//     }));
//   };

//   const addExercise = () => {
//     const newId = (exercises.length + 1).toString();
//     setExercises([
//       ...exercises,
//       {
//         id: newId,
//         name: 'Exercise',
//         expanded: false,
//         completed: false,
//         sets: [
//           { weight: '', reps: '', previous: '- -' },
//           { weight: '', reps: '', previous: '- -' },
//           { weight: '', reps: '', previous: '- -' },
//           { weight: '', reps: '', previous: '- -' }
//         ]
//       }
//     ]);
//   };

//   const editExercise = (id: string) => {
//     const exercise = exercises.find(ex => ex.id === id);
//     if (exercise) {
//       setEditExerciseId(id);
//       setEditExerciseName(exercise.name);
//       setEditExerciseFrequency("Everyday"); // Default or could be stored in Exercise
//       setEditExerciseNotes(""); // Default or could be stored in Exercise
//       setShowEditModal(true);
//     }
//   };

//   const saveEditedExercise = () => {
//     if (editExerciseId) {
//       setExercises(exercises.map(ex => 
//         ex.id === editExerciseId ? { ...ex, name: editExerciseName } : ex
//       ));
//     }
//     setShowEditModal(false);
//   };

//   const skipExercise = (id: string) => {
//     // Option 1: Hide exercise
//     // setExercises(exercises.filter(ex => ex.id !== id));
    
//     // Option 2: Mark as skipped (could add a 'skipped' property)
//     Alert.alert(
//       "Skip Exercise",
//       "Are you sure you want to skip this exercise?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         { 
//           text: "Skip", 
//           onPress: () => {
//             setExercises(exercises.map(ex => 
//               ex.id === id ? { ...ex, completed: true } : ex
//             ));
//           }
//         }
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerWrapper}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => setShowDropdown(true)}>
//             <Text style={styles.headerText}>{formatDate(selectedDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowDropdown(true)}>
//             <Text style={styles.dropdownText}>▼</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Scrollable Days of the Week */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.weekScroller}
//         >
//           {weekDates.map((date, i) => (
//             <Pressable
//               key={i}
//               onPress={() => {
//                 setSelectedDate(date);
//               }}
//               style={[
//                 styles.dayButton,
//                 selectedDate.toDateString() === date.toDateString() && styles.selectedDay
//               ]}
//             >
//               <Text style={styles.dayText}>{formatShort(date)}</Text>
//             </Pressable>
//           ))}
//         </ScrollView>
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

//       {/* Edit Exercise Modal */}
//       <Modal visible={showEditModal} transparent animationType="slide">
//         <View style={styles.editModalContainer}>
//           <View style={styles.editModalHeader}>
//             <TouchableOpacity onPress={() => setShowEditModal(false)}>
//               <Text style={styles.editModalBackButton}>{'<'}</Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.editExerciseImageContainer}>
//             <View style={styles.editExerciseImagePlaceholder}></View>
//           </View>
          
//           <View style={styles.editFormContainer}>
//             <TextInput
//               style={styles.editNameInput}
//               value={editExerciseName}
//               onChangeText={setEditExerciseName}
//               placeholder="Name of Exercise..."
//             />
            
//             <View style={styles.editFrequencyContainer}>
//               <Text style={styles.editLabel}>
//                 <Text style={styles.editIcon}>📅 </Text>
//                 Repeat
//               </Text>
//               <View style={styles.editDropdown}>
//                 <Text>{editExerciseFrequency}</Text>
//                 <Text style={styles.editDropdownArrow}>{'>'}</Text>
//               </View>
//             </View>
            
//             <View style={styles.editNotesContainer}>
//               <Text style={styles.editLabel}>
//                 <Text style={styles.editIcon}>📝 </Text>
//                 Notes
//               </Text>
//               <TextInput
//                 style={styles.editNotesInput}
//                 value={editExerciseNotes}
//                 onChangeText={setEditExerciseNotes}
//                 placeholder="Type here..."
//                 multiline
//               />
//             </View>
            
//             <View style={styles.editHistoryContainer}>
//               <Text style={styles.editLabel}>
//                 <Text style={styles.editIcon}>🕒 </Text>
//                 History
//                 <Text style={styles.editCollapseIndicator}> -</Text>
//               </Text>
//               <View style={styles.historyHeaderRow}>
//                 <Text style={styles.historyHeaderDate}>Date</Text>
//                 <Text style={styles.historyHeaderStat}>Stat</Text>
//               </View>
//               <View style={styles.historyRow}>
//                 <Text style={styles.historyDate}>--/--</Text>
//                 <Text style={styles.historyStat}>- -</Text>
//               </View>
//               <View style={styles.historyRow}>
//                 <Text style={styles.historyDate}>--/--</Text>
//                 <Text style={styles.historyStat}>- -</Text>
//               </View>
//               <View style={styles.historyRow}>
//                 <Text style={styles.historyDate}>--/--</Text>
//                 <Text style={styles.historyStat}>- -</Text>
//               </View>
//             </View>
//           </View>
          
//           <View style={styles.editButtonsContainer}>
//             <TouchableOpacity 
//               style={styles.cancelButton}
//               onPress={() => setShowEditModal(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.saveButton}
//               onPress={saveEditedExercise}
//             >
//               <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Workout Title */}
//       <Text style={styles.titleSmall}>Today's Workout:</Text>
//       <Text style={styles.titleBig}>Glute-Focused Legs</Text>

//       <ScrollView style={styles.exerciseList}>
//         {exercises.map(exercise => (
//           <ExerciseRow 
//             key={exercise.id} 
//             exercise={exercise} 
//             onToggleExpand={toggleExpand}
//             onUpdateSet={updateSet}
//             onAddSet={addSet}
//             onToggleComplete={toggleComplete}
//             onEditExercise={editExercise}
//             onSkipExercise={skipExercise}
//           />
//         ))}

//         {/* Add Exercise button */}
//         <TouchableOpacity 
//           style={styles.addExerciseButton}
//           onPress={addExercise}
//         >
//           <Text style={styles.addExerciseText}>+ Add Exercise</Text>
//         </TouchableOpacity>
        
//         {/* Finish Workout button */}
//         <TouchableOpacity style={styles.finishButton}>
//           <Text style={styles.finishButtonText}>Finish Workout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Bottom Nav */}
//       <View style={styles.nav}>
//         {['🏠', '🏋️‍♂️', '🛒', '👥'].map((icon, idx) => (
//           <Text key={idx} style={styles.navIcon}>{icon}</Text>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// }
