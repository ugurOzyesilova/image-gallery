// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case "SAVE__IMAGE":
            return {
                ...state,
                savedImages: [action.payload, ...state.savedImages],
            };

        case "UNSAVE__IMAGE":
            return {
                ...state,
                savedImages: state.savedImages.filter((image) => image.id !== action.payload),
            };


        default:
            return state;
    }
};