//Filter reducer

const filterReducerDefaultState = {
    sortBy: "newDate"
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SORT_BY_DATE":
            return {
                sortBy: action.sortBy
            };
        default:
            return state;
    };
};

export default filterReducer;