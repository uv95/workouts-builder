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
      console.log('ADD_TO_FAVORITES');
      const favoriteExercise = state.searchResults.find(
        (ex) => ex.name === action.payload.name
      );
      console.log(state.favorites);

      return {
        ...state,
        //prevents from adding one exercise several times (provides array of unique objects)
        favorites: [
          ...new Map(
            [...state.favorites, favoriteExercise].map((ex) => [ex.name, ex])
          ).values(),
        ],
      };
    case 'UNMARK_FAVORITE':
      console.log('UNMARK_FAVORITE');

      return {
        ...state,
        searchResults: state.searchResults.map((ex) => {
          return ex.name === action.payload.name
            ? { ...ex, favorite: false }
            : ex;
        }),
      };
    case 'REMOVE_FROM_FAVORITES':
      console.log('REMOVE_FROM_FAVORITES');

      const index = state.favorites.findIndex(
        (ex) => ex.name === action.payload.name
      );
      state.favorites.splice(index, 1);
      console.log(state.favorites);
      return {
        ...state,
        // helps remove unmarked exercises immediately
        favorites: [
          ...new Map(state.favorites.map((ex) => [ex.name, ex])).values(),
        ],
      };
  }
};

export default exercisesReducer;
