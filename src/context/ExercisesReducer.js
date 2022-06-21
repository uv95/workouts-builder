const exercisesReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_EXERCISES':
      return {
        ...state,
        searchResults: action.payload,
      };
    case 'GET_EXERCISE_NAME':
      return {
        ...state,
        exerciseName: action.payload,
      };
    case 'RESTORE_FAVORITES_AFTER_RELOADING':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'RESTORE_WORKOUTS_AFTER_RELOADING':
      return {
        ...state,
        workouts: action.payload,
      };
    case 'RESTORE_SEARCH_RESULTS_AFTER_RELOADING':
      return {
        ...state,
        //used in ExerciseItem page to keep favorite property updated after reloading
        searchResults: action.payload.map((ex) =>
          state.favorites.some((ex1) => ex1.name === ex.name)
            ? { ...ex, favorite: true }
            : { ...ex, favorite: false }
        ),
      };

    case 'MARK_FAVORITE':
      return {
        ...state,
        searchResults: state.searchResults.map((ex) => {
          return ex.name === action.payload.name
            ? { ...ex, favorite: true }
            : ex;
        }),
      };
    case 'ADD_TO_FAVORITES':
      const favoriteExercise = state.searchResults.find(
        (ex) => ex.name === action.payload.name
      );
      return {
        ...state,
        //prevents from adding one exercise several times (provnamees array of unique objects)
        favorites: [
          ...new Map(
            [...state.favorites, favoriteExercise].map((ex) => [ex.name, ex])
          ).values(),
        ],
      };
    case 'UNMARK_FAVORITE':
      return {
        ...state,
        searchResults: state.searchResults.map((ex) => {
          return ex.name === action.payload.name
            ? { ...ex, favorite: false }
            : ex;
        }),
      };
    case 'REMOVE_FROM_FAVORITES':
      const index = state.favorites.findIndex(
        (ex) => ex.name === action.payload.name
      );
      state.favorites.splice(index, 1);
      return {
        ...state,
        // helps remove unmarked exercises immediately
        favorites: [
          ...new Map(state.favorites.map((ex) => [ex.name, ex])).values(),
        ],
      };
    case 'GET_EXERCISE':
      return {
        ...state,
        exercise: action.payload,
      };
    case 'TOGGLE_NEW_WORKOUT':
      return {
        ...state,
        showNewWorkout: !state.showNewWorkout,
      };
    case 'CREATE_NEW_WORKOUT':
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };

    case 'ADD_TO_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          // workout.id does not work. Why?
          return workout.name === action.payload.name
            ? {
                ...workout,
                exercises: [...workout.exercises, ...action.payload.exercises],
              }
            : workout;
        }),
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((workout) => {
          return workout.id !== action.payload.id;
        }),
      };
    case 'UPDATE_WORKOUTS':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          return workout.id === action.payload.id ? action.payload : workout;
        }),
      };
    case 'REMOVE_FROM_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          return workout.id === action.payload.workout.id
            ? {
                ...workout,
                exercises: workout.exercises.filter(
                  (ex) => ex.name !== action.payload.exercise.name
                ),
              }
            : workout;
        }),
      };
    case 'CHANGE_WORKOUT_NAME':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          return workout.id === action.payload.workout.id
            ? {
                ...workout,
                name: action.payload.name,
              }
            : workout;
        }),
      };
  }
};

export default exercisesReducer;
