const state = {
    ROOM_TYPES: {
        PLANNING_POKER: 1,
        RETROSPECTIVE: 2,
    },
    COLLECTION_NAME: "rooms",
    room: null,
};

const getters = {
    getRoomTypes: (state) => state.ROOM_TYPES,
    getRoom: (state) => state.room,
};

const actions = {
    retrieveRooms({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).get()
            .then((results) => {
                results.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log(error);
            })
        });
    },

    retrieveRoom({ state, rootState, commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log("retrieve room", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).get()
            .then((results) => {
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    createRoom({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            console.log("create room", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.userId).set({
                roomType: payload.roomType,
                connectedUser: [{user: payload.userId, isAdmin: true}],
                usersSubmittedPoints: [],
            })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    addUserToRoom({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("add user", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                connectedUser: rootState.firebase.firestore.FieldValue.arrayUnion({user: payload.userId, isAdmin: false})
            })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    submitPoints({ state, rootState}, payload) {
        return new Promise((resolve, reject) => {
            console.log("add points", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                usersSubmittedPoints: rootState.firebase.firestore.FieldValue.arrayUnion({
                    userId: payload.userId,
                    points: payload.points
                })
            })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    }
};

const mutations = {
    RETRIEVE_ROOM(state, room) {
        state.room = room;
    },

    EMPTY_ROOM(state) {
        state.room = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
